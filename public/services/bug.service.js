const BASE_URL = '/api/bug/'

export const bugService = {
  query,
  get,
  remove,
  save,
  getEmptyBug,
  getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
  return axios
    .get(BASE_URL)
    .then((res) => res.data)
    .then((bugs) => {
      if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        bugs = bugs.filter((bug) => regex.test(bug.title))
      }
      if (filterBy.description) {
        const regex = new RegExp(filterBy.description, 'i')
        bugs = bugs.filter((bug) => regex.test(bug.description))
      }
      if (filterBy.severity) {
        bugs = bugs.filter((bug) => bug.speed >= filterBy.severity)
      }
      return bugs
    })
}

function get(bugId) {
  return axios.get(BASE_URL + bugId).then((res) => res.data)
}

function remove(bugId) {
  return axios.get(BASE_URL + bugId + '/remove')
}

function save(bug) {
  let queryParams = `?title=${bug.title}&description=${bug.description}&severity=${bug.severity}`
  if (bug._id) queryParams += `&_id=${bug._id}`
  return axios.get(BASE_URL + 'save' + queryParams).then((res) => res.data)
}

function getEmptyBug() {
  return { title: '', description: '', severity: 0 }
}

function getDefaultFilter() {
  return { title: '', description: '', severity: '' }
}
