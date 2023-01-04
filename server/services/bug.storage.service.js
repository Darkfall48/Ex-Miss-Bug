// const { rejects } = require('assert')
const fs = require('fs')
var bugs = require('../data/bugsDB.json')

module.exports = {
  query,
  get,
  remove,
  save,
}

//? Query - List/Filtering
function query() {
  return Promise.resolve(bugs)
}

//? Save - Save/Edit
function save(bug) {
  if (bug._id) {
    const bugToUpdate = bugs.find((currBug) => currBug._id === bug._id)
    bugToUpdate.title = bug.title
    bugToUpdate.description = bug.description
    bugToUpdate.severity = bug.severity
  } else {
    bug._id = _makeId()
    bugs.push(bug)
  }
  return _writeBugsToFile().then(() => bug)
}

//? Get - Read
function get(bugId) {
  const bug = bugs.find((bug) => bug._id === bugId)
  if (!bug) return Promise.reject('Car not found')
  return Promise.resolve(bug)
}

//? Remove - Delete
function remove(bugId) {
  bugs = bugs.filter((bug) => bug._id !== bugId)
  return _writeBugsToFile()
}

function _makeId(length = 5) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function _writeBugsToFile() {
  return new Promise((res, rej) => {
    const data = JSON.stringify(bugs, null, 2)
    fs.writeFile('data/bugsDB.json', data, (err) => {
      if (err) return rej(err)
      console.log('File written successfully\n')
      res()
    })
  })
}
