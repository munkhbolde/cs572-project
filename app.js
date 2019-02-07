const express = require('express')
const parser = require('body-parser')
const mongo = require('mongodb').MongoClient
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const config = require('./dotenv')
const admin = require('./admin')
const middleware = require('./middlewares')

//:1 helper
let db
const client = mongo(config.dbConnection, { useNewUrlParser: true })
app = express()
client.connect()
setTimeout(() => { db = client.db('mbs_cs572') }, 1000)

hashme = function (password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

compare = function (plain, hash) {
  return bcrypt.compareSync(plain, hash)
}

//:1 middlewares
app.set('view engine', 'jade')

app.use(parser.json())
app.use(cors())
app.use(express.static(__dirname + "/templates/static/css/"))

app.use((req, res, next) => {
  req.db = db
  next()
})

//:1 login
app.post('/login/', async (req, res) => {
  let user = undefined
  await req.db.collection('user')
    .find({ name: req.body.uname }).forEach(data => {
      if (compare(req.body.password, data.password)) user = data
    })
  if (user) {
    const token = jwt.sign({
      name: user.name,
      type: user.type
    }, 'secret', { expiresIn: '1h' })
    res.header('Authorizatin', `Bearer ${token}`)
    res.json({ success: true, token: token })
    return
  }
  res.json({ success: false })
})

//:1 retrieving students information
app.get('/students', middleware.authenticatestaff, async (req, res) => {
  let result = []
  const pointer = await req.db.collection('exam').find().forEach(
    data => {
      if (data.students) {
        result.push(data.students)
      }
    })
  res.json(result)
});

// sending an invitation through email
app.post('/invitation', authenticatestaff, function (req, res) {

  const token = jwt.sign({
    email: req.body.email
  }, 'secret', { expiresIn: '24h' });
  res.header('Authorizatin', `Bearer ${token}`)

  // will take email from req.email
  var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'selina.tesfabrhan1@gmail.com',
      pass: 'freweyni11'
    },
    tls: { rejectUnauthorized: false }
  });
  // setup e-mail data with unicode symbols

  var mailOptions = {
    from: "maharishi universty ✔ <selina.tesfabrhan1@gmail.com>",
    to: req.body.email,
    subject: "take exam",
    text: "maharishi ",
    html: `<b>click button to take exam</b><br><a href="http://localhost:4200/start/?tok=${token}"><button>Take Exam</button></a>`
  }
  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, async function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: ");
      req.db.collection('exam').findOneAndUpdate({ 'students.email': req.body.email }, { $set: { 'students.$.status': "sent" } }, function (err, result) {
        req.db.collection('exam').findOne({ 'students.email': req.body.email }, function (err, result) {
          console.log(result)
          res.json({ success: true, pass: result.students })

        })

      })

      // res.json({ success: true, pass: "message sent" })
    }
  });
});

sendemailtostudent = function (email, message) {
  var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'selina.tesfabrhan1@gmail.com',
      pass: 'freweyni11'
    },
    tls: { rejectUnauthorized: false }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "maharishi university ✔ <selina.tesfabrhan1@gmail.com>",
    to: email, // taking email from request
    subject: "take exam",
    text: "maharishi universty of managment " + message,
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end()
    } else {
      console.log("Message sent: ");
      res.end()
    }
  });
}

// send email
app.post('/sendemail', authenticatestaff, function (req, res) {
  const passmessage = "congratulations you passed the exam"
  const failmessage = "sorry you failed in the exam "
  const emailadd = req.body.email
  const studstatus = req.body.status
  if (studstatus === "pass") {
    sendemailtostudent(emailadd, passmessage)
  }
  if (studstatus === "fail") {
    sendemailtostudent(emailadd, failmessage)
  } else {
    res.json({ message: "cannot send message no result of exam available" })
  }
});

//:1 checkStudent
app.get('/checkStudent', (req, res) => {
  let token = req.query.tok;
  let result = [];

  const newToken = jwt.sign({
    email: req.body.email
  }, 'secret', { expiresIn: '2h' });
  res.header('Authorizatin', `Bearer ${newToken}`)

  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      console.log(err);
      return;
    }
    req.db.collection('exam').aggregate([
      { $match: { "students.email": decoded.email } },
      { $project: { _id: 0, "students.email": 1 } }
    ])
      .forEach((data) => {
        result = data;
        console.log("178:", result.students.length);
        if (result.students.length > 0)
          res.json({ success: true, email: decoded.email, token: newToken });
        else
          res.json({ success: false });
      });

  });
});


//get questions for exam
app.get('/start', student_token, async (req, res) => {

  let result = [];
  const pointer = await req.db.collection('exam').aggregate([
    { $match: { "questions.status": "enabled" } },
    { $project: { _id: 0, "questions.question": 1 } },
    { $sample: { size: 3 } }
  ])
    .forEach((data) => {
      console.log("198:", data);
      result = data
    })

  res.json({ success: true, data: result.questions })
})

//submit answers
app.post("/submit", function (req, res) {
  const _examData = req.body.exam;
  req.db.collection('exam').updateOne(
    { "students.email": req.body.email },
    { $set: { "students.$.answer": _examData, "students.$.status": "submitted" } },
    { upsert: true })
  res.json({ success: true })
});

//:1 error
app.use(function (error, req, res, next) {
  res.json({ message: error.message })
})
// endfold

app.use('/admin', admin)
app.listen(8080, () => console.log('listening on 8080'))
