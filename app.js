//:1 imports
const express = require('express')
const parser = require('body-parser')
const mongo = require('mongodb').MongoClient
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile);

//:1 helper
const bcrypt = require('bcrypt');
hashme = function(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

compare = function(plain, hash) {
  return bcrypt.compareSync(plain, hash)
}
// endfold
let db
app = express()

async function dbConnection (){
  let config = await readFile('dotenv.json')
  config = JSON.parse(config)
  const client = mongo('mongodb://admin:q1;w2;e3;@ds121105.mlab.com:21105/mbs_cs572', {useNewUrlParser: true})
  client.connect()
  setTimeout(() => { db = client.db('mbs_cs572')}, 1000)
}
dbConnection()


//:1 middle wares
app.use(parser.json())
app.use(cors())
app.use(express.static(__dirname + '/templates/static/css/'))
app.use((req, res, next) => {
  req.db = db
  next()
  db.collection('user').updateOne({}, {$set: {'name': 'asaad', password: hashme('saad'), type: 'admin'}})
})
// endfold

app.post('/login/', async (req, res) => {
  let user = undefined
  await req.db.collection('user')
  .find({name: req.body.uname}).forEach(data => {
    if (compare(req.body.password, data.password)) user = data
  })
  if (user) {
  const token = jwt.sign({
      name: user.name,
      type: user.type
    }, 'secret', { expiresIn: '1h' })
    res.header('Authorizatin', `Bearer ${token}`)
    res.json({success: true, token: token})
    return
  }
  res.json({success: false})
})
app.listen(8080, () => console.log('listening on 8080'))
