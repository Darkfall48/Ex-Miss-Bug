import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
  query,
  getById,
  save,
  remove,
}

function query() {
  return storageService.query(STORAGE_KEY)
}
function getById(bugId) {
  return storageService.get(STORAGE_KEY, bugId)
}
function remove(bugId) {
  return storageService.remove(STORAGE_KEY, bugId)
}
function save(bug) {
  if (bug._id) {
    return storageService.put(STORAGE_KEY, bug)
  } else {
    return storageService.post(STORAGE_KEY, bug)
  }
}
