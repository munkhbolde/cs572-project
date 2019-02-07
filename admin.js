const express = require('express')
const middleware = require('./middlewares')
const router = express.Router()


//:1 create question
router.post('/create/question', check_token, async (req, res) => {
  const q = { question: req.body.question, status: 'enabled' }

  req.db.collection('exam').updateOne({}, { $addToSet: { questions: q } })
  res.json({ success: true })
})
//:1 question list
router.get('/questions/', check_token, async (req, res) => {
  let result = []
  const pointer = await req.db.collection('exam')
    .find().forEach((data) => result = data)
  res.json({ success: true, data: result.questions })
})
//:1 edit question status
router.post('/questions/', check_token, async (req, res) => {
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
router.post('/create/staff', check_token, async (req, res) => {
  const name = req.body.name
  const password = hashme(req.body.password)
  if (name === '')
    res.json({ success: false })

  req.db.collection('user').insertOne({ name: name, password: password, type: 'staff' })
  res.json({ success: true })
})

//:1 staff list
router.get('/staffs/', check_token, async (req, res) => {
  let result = []
  const pointer = await req.db.collection('user')
    .find({ type: { $ne: 'router' } }).project({ password: 0 })
    .forEach((data) => result.push(data))

  res.json({ success: true, data: result })
})

//:1 staff edit
router.patch('/staffs/', check_token, async (req, res) => {
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
router.delete('/staffs/', check_token, async (req, res) => {
  await req.db.collection('user').remove({ name: req.body.name })
  res.json({ success: true })
})

// endfold

module.exports = router
