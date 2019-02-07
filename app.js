//:1 imports
const express = require('express')
const parser = require('body-parser')
const mongo = require('mongodb').MongoClient
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const config = require('./dotenv')
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

check_token = function (req, res, next) {
  if (!req.headers.authorization) {
    res.status(401)
    res.json({ status: 401, url: req.url })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err || decoded.type !== 'admin') {
      res.status(401)
      res.json({ status: 401, url: req.url })
      return
    }
  })
  next()
}

student_token = function (req, res, next) {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(401);
    res.json({ status: 401, url: req.url });
    return;
  }
  next();
}

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

// check token
authenticatestaff = function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }

}
//:1 retrieving students information
app.get('/students', authenticatestaff, async (req, res) => {
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
<<<<<<< HEAD
  const token = req.headers.authorization.split(' ')[1]
  console.log(req.body.email);
=======

  const token = jwt.sign({
    email: req.body.email
  }, 'secret', { expiresIn: '24h' });
  res.header('Authorizatin', `Bearer ${token}`)

>>>>>>> 0c798fdfe2e0bfe5be8b33deb556b9b04e5d030c
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
      const pointer = await req.db.collection('exam').updateOne({ 'students.email': req.body.email }, { $set: { 'students.$.status': "sent" } })

      // res.json({ success: true, pass: "message sent" })
    }
  });
  res.json({ success: true, pass: "pass" })
});
//
sendemailtostudent = function (email, message) {
  var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'selina.tesfabrhan1@gmail.com',
      pass: 'freweyni11'
    },
    tls: { rejectUnauthorized: false }
  });  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "maharishi university ✔ <selina.tesfabrhan1@gmail.com>",
    to: email, // taking email from request
    subject: "take exam",
    text: "maharishi universty of managment " + message,
  }  // send mail with defined transport object
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
//:1 create question
app.post('/admin/create/question', check_token, async (req, res) => {
  const q = { question: req.body.question, status: 'active' }

  req.db.collection('exam').updateOne({}, { $addToSet: { questions: q } })
  res.json({ success: true })
})
//:1 question list
app.get('/admin/questions/', check_token, async (req, res) => {
  let result = []
  const pointer = await req.db.collection('exam')
    .find().forEach((data) => result = data)
  res.json({ success: true, data: result.questions })
})
//:1 edit question status
app.post('/admin/questions/', check_token, async (req, res) => {
  const question = req.body.question
  const status = req.body.status
  const pointer = await req.db.collection('exam')
    .updateOne(
      { 'questions': { '$elemMatch': { 'question': { '$eq': question } } } },
      { '$set': { 'questions.$.status': status } }
    )
  res.json({ success: true })
})
//:1 create staff
app.post('/admin/create/staff', check_token, async (req, res) => {
  const name = req.body.name
  const password = hashme(req.body.password)
  if (name === '')
    res.json({ success: false })

  req.db.collection('user').insertOne({ name: name, password: password, type: 'staff' })
  res.json({ success: true })
})

//:1 staff list
app.get('/admin/staffs/', check_token, async (req, res) => {
  let result = []
  const pointer = await req.db.collection('user')
    .find({ type: { $ne: 'admin' } }).project({ password: 0 })
    .forEach((data) => result.push(data))

  res.json({ success: true, data: result })
})

//:1 staff edit
app.patch('/admin/staffs/', check_token, async (req, res) => {
  const name = req.body.name
  const type = req.body.type
  console.log(req.body)
  await req.db.collection('user').updateOne(
    { name: name },
    { $set: { type: type } }
  )

  res.json({ success: true })
})

//:1 staff delete
app.delete('/admin/staffs/', check_token, async (req, res) => {
  console.log(req.body)
  await req.db.collection('user').remove({ name: req.body.name })
  res.json({ success: true })
})

//get questions for exam
app.get('/start', student_token, async (req, res) => {
  let result = [];
  const pointer = await req.db.collection('exam')
    .find({
      "questions.status": "enabled"
    }, {
        "_id": 0, "questions.question": 1
      }).forEach((data) => result = data)
<<<<<<< HEAD
  res.json({ success: true, data: result.questions })
=======
  res.json({ success: true, data: result.questions });
>>>>>>> 0c798fdfe2e0bfe5be8b33deb556b9b04e5d030c
})

app.get('/checkStudent', async (req, res) => {
  let token = req.query.tok;
  let result = [];
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      console.log(err);
      return;
    }
    req.db.collection('exam').find(
      { "students.email": { $eq: decoded.email } },
      { "_id": 0, "students.email": 1 })
      .forEach((data) => {
        console.log(data);
        result = data;
      });
    console.log(result, decoded.email);
    if (result.length > 0)
      res.json({ success: true });
    else
      res.json({ success: false });
  });
});

//:1 error
app.use(function (error, req, res, next) {
  res.json({ message: error.message })
})
// endfold

app.listen(8080, () => console.log('listening on 8080'))
