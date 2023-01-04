const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BugFilter } from '../cmps/bug-filter.jsx'
import { BugList } from '../cmps/bug-list.jsx'

export function BugIndex() {
  const [isLoading, setIsLoading] = useState(false)
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const [sortBy, setSortBy] = useState(bugService.getDefaultSort())
  const [bugs, setBugs] = useState([])
  const [maxPages, setMaxPages] = useState(0)

  useEffect(() => {
    loadBugs()
  }, [filterBy, sortBy])

  function loadBugs() {
    setIsLoading(true)
    bugService.query(filterBy, sortBy).then((bugsData) => {
      //   console.log(bugsData)
      setBugs(bugsData.bugs)
      setMaxPages(bugsData.totalPages)
      setIsLoading(false)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }
  function onSetSort(sortBy) {
    setSortBy(sortBy)
  }

  function onRemoveBug(bugId) {
    bugService
      .remove(bugId)
      .then(() => {
        const bugsToUpdate = bugs.filter((bug) => bug._id !== bugId)
        setBugs(bugsToUpdate)
        showSuccessMsg('Bug removed')
      })
      .catch((err) => {
        console.log('Error from onRemoveBug ->', err)
        showErrorMsg('Cannot remove bug')
      })
  }

  return (
    <section className='bug-index full main-layout'>
      <div className='full main-layout'>
        <BugFilter maxPages={maxPages} onSetFilter={onSetFilter} onSetSort={onSetSort} />

        <Link to='/bug/edit'>Add Bug</Link>

        {!isLoading && <BugList bugs={bugs} onRemoveBug={onRemoveBug} />}
        {isLoading && <div>Loading..</div>}
        {!bugs.length && <div>No bugs to show..</div>}
      </div>
    </section>
  )
}
