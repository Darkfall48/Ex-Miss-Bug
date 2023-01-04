const BASE_URL = '/api/bug/'

export const bugService = {
  query,
  get,
  save,
  remove,
  getEmptyBug,
  getDefaultFilter,
  getDefaultSort,
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
  const queryParams = `?title=${filterBy.title}&minSeverity=${filterBy.minSeverity}&labels=${filterBy.labels}&pageIdx=${filterBy.pageIdx}&sortBy=${sortBy.sortByCat}&desc=${sortBy.desc}&pageSize=${filterBy.pageSize}`
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

function getEmptyBug(
  title = '',
  description = '',
  severity = '',
  createdAt = Date.now(),
  labels = []
) {
  return { title, description, severity, createdAt, labels }
}

function getDefaultFilter() {
  return { title: '', minSeverity: '', pageIdx: 0, pageSize: 4, labels: [] }
}
function getDefaultSort() {
  return { sortByCat: '', desc: 1 }
}
