const express = require('express')
const parser = require('body-parser')
const path = require('path')
const app = express()

//:1 middlewares
app.use(parser.json())
app.use(express.static(__dirname + '/templates/static/css/'))
// endfold

app.get('/design/', (req, res) => {
  let template = '/templates/index.html'
  template = path.join(__dirname + template)
  res.sendFile(template)
})
app.listen(8080, () => console.log('listening on 8080'))
