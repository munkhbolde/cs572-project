//:1 imports
const express = require('express')
const parser = require('body-parser')
const mongo = require('mongodb').MongoClient
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const config = require('./dotenv')
// endfold

let db
const client = mongo(config.dbConnection, { useNewUrlParser: true })
app = express()
client.connect()
setTimeout(() => { db = client.db('mbs_cs572') }, 1000)

//:1 helper
const bcrypt = require("bcrypt")
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

//:1 create staff
app.post('/admin/create/staff', check_token, async (req, res) => {
  const name = req.body.name
  const password = hashme(req.body.password)
  if (name === '')
    res.json({ success: false })
  req.db.collection('user').insertOne({ name: name, password: password, type: 'staff' })
  res.json({ success: true })
})

//:1 create question
app.post('/admin/create/question', check_token, async (req, res) => {
  const q = req.body.question
  req.db.collection('exam').update({}, {$addToSet: {questions: q}})
  res.json({success: true})
})

//:1 question list
app.get('/admin/questions/', check_token, async (req, res) => {
    let result = []
    const pointer = await req.db.collection('exam')
    .find({}, {'questions': 1, '_id': 0})
    .forEach((data) => result = data)

    res.json({success:true, data: result.questions})
})

//:1 error
app.use(function (error, req, res, next) {
  res.json({ message: error.message })
})
// endfold

app.listen(8080, () => console.log('listening on 8080'))
