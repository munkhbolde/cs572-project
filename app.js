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
app.use(parser.json())
app.use(cors())
app.use(express.static(__dirname + "/templates/static/css/"))
app.use((req, res, next) => {
  req.db = db
  next()
})

check_token = function (req, res, next) {
  if (!req.headers.authorization) {
    res.render('403', { status: 403, url: req.url })
  }

  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, 'secret', function (err, decoded) {
    if (decoded.type !== 'admin')
      res.render('403', { status: 403, url: req.url })
  })
  next()
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

//:1 retrieving students information
app.get('/students', (req, res) => {
  //
  const result = req.db.collection('exam').find({});
  result.forEach(
    data => {
      console.log(data.students.email);
      res.json(data.students)
    })
})
// sending an invitation through email
app.post('/invitation', function (req, res) {

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
    from: "Fred Foo ✔ <selina.tesfabrhan1@gmail.com>",
    to: "selina.tesfabrhan@gmail.com",
    subject: "take exam",
    text: "maharishi ",
    html: "<b>click button to take exam</b><button>Take Exam</button>"
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }

  });
});

//:1 create question
app.post('/admin/create/question', check_token, async (req, res) => {
  const q = {question: req.body.question, status: 'active'}

  req.db.collection('exam').updateOne({}, {$addToSet: {questions: q}})
  res.json({success: true})
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
    {'questions': {'$elemMatch': {'question': {'$eq': question}}}},
    {'$set': {'questions.$.status': status}}
  )

  res.json({ success: true})
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
    .find({type: {$ne: 'admin'}}).project({password: 0})
    .forEach((data) => result.push(data))

  res.json({ success: true, data: result})
})

//:1 error
app.use(function (error, req, res, next) {
  res.json({ message: error.message })
})
// endfold

app.listen(8080, () => console.log('listening on 8080'))
