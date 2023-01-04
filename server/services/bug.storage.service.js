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
function query(filterBy, sortBy) {
  let filteredBugs = bugs
  // Filtering
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, 'i')
    filteredBugs = filteredBugs.filter((bug) => regex.test(bug.title))
  }
  if (filterBy.labels) {
    const labels = filterBy.labels.split(',')
    filteredBugs = filteredBugs.filter((bug) =>
      labels.every((i) => bug.labels.includes(i))
    )
  }
  if (filterBy.minSeverity) {
    filteredBugs = filteredBugs.filter(
      (bug) => bug.severity >= +filterBy.minSeverity
    )
  }

  // Sorting
  if (sortBy) {
    if (sortBy.sortByCat === 'createdAt' || sortBy.sortByCat === 'severity') {
      filteredBugs.sort(
        (b1, b2) => (b1[sortBy.sortByCat] - b2[sortBy.sortByCat]) * sortBy.desc
      )
    }
    if (filterBy.sortBy === 'title') {
      filteredBugs.sort(
        (b1, b2) => b1.title.localeCompare(b2.title) * sortBy.desc
      )
    }
  }

  // Paging
  const totalPages = Math.ceil(filteredBugs.length / +filterBy.pageSize)
  if (filterBy.pageIdx !== undefined) {
    const startIdx = filterBy.pageIdx * +filterBy.pageSize
    filteredBugs = filteredBugs.slice(startIdx, +filterBy.pageSize + startIdx)
  }

  return Promise.resolve({ totalPages, bugs: filteredBugs })
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
