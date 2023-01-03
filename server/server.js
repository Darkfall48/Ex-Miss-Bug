const express = require('express')
const cookieParser = require('cookie-parser')

const bugStorageService = require('./services/bug.storage.service.js')
const SERVER_PORT = 3030
const app = express()
let visitedBugs = []

//* App configuration
app.use(express.static('../public'))
app.use(cookieParser())

//* Real routing express
//? If index.html is not found, create a simple html page.
app.get('/', (req, res) => res.send('You are not supposed to see me:('))

//? Query - List/Filtering
app.get('/api', (req, res) => res.redirect('/api/bug'))
app.get('/api/bug', (req, res) => {
  bugStorageService.query().then((bugs) => res.send(bugs))
})

//? Save - Save/Edit
app.get('/api/bug/save', (req, res) => {
  const { _id, title, description, severity } = req.query
  const bug = {
    _id,
    title,
    description,
    severity: +severity,
  }
  bugStorageService.save(bug).then((savedBug) => {
    res.send(savedBug)
  })
})

//? Get - Read
app.get('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params
  bugStorageService.get(bugId).then((bug) => {
    if (bugId === bug._id) {
      //? It's Cookie Time!
      visitedBugs ? visitedBugs.push(bugId) : (visitedBugs = [bugId])
      res.cookie('visitedBugs', visitedBugs, { maxAge: 1000 * 7 })
      console.log('User visited at the following bugs:', visitedBugs)
    }
    if (visitedBugs.length > 2) {
      visitedBugs = []
      return res.status(401).send('Wait for a bit')
    }
    res.send(bug)
  })
})

//? Remove - Delete
app.get('/api/bug/:bugId/remove', (req, res) => {
  const { bugId } = req.params
  bugStorageService.remove(bugId).then(() => {
    res.send({ msg: 'bug removed successfully', bugId })
  })
})

//* Start the server on port: SERVER_PORT (3030)
app.listen(SERVER_PORT, () =>
  console.log(`Server ready at port ${SERVER_PORT}!`)
)
