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
  const queryParams = `?title=${filterBy.title}&minSeverity=${filterBy.minSeverity}&labels=${filterBy.labels}`
  return axios.get(BASE_URL + queryParams).then((res) => res.data)
}

function get(bugId) {
  return axios.get(BASE_URL + bugId).then((res) => res.data)
}

function remove(bugId) {
  return axios.delete(BASE_URL + bugId).then((res) => res.data)
}

function save(bug) {
  const url = bug._id ? BASE_URL + `${bug._id}` : BASE_URL
  const method = bug._id ? 'put' : 'post'
  return axios[method](url, bug).then((res) => res.data)
}

function getEmptyBug() {
  return {
    title: '',
    description: '',
    severity: null,
    createdAt: Date.now(),
    labels: [],
  }
}

function getDefaultFilter() {
  return { title: '', description: '', severity: '', labels: [] }
}
