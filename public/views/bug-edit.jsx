const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bugService } from "../services/bug.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"

export function BugEdit({ }) {
    const [bugToEdit, setBugToEdit] = useState(bugService.getEmptyBug())
    const navigate = useNavigate()
    const { bugId } = useParams()

    useEffect(() => {
        if (!bugId) return
        loadBug()
    }, [])

    function loadBug() {
        bugService.get(bugId)
            .then((bug) => setBugToEdit(bug))
            .catch((err) => {
                console.log('Had issues in bug details', err)
                navigate('/bug')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = (type === 'number') ? +value : value
        setBugToEdit(prevBug => ({ ...prevBug, [field]: value }))
    }

    function onSaveBug(ev) {
        ev.preventDefault()
        bugService.save(bugToEdit).then((bug) => {
            console.log('bug saved', bug);
            showSuccessMsg('Bug saved!')
            navigate('/bug')
        })
    }


    return <div className={'bug-edit'}>
       <h2>{bugToEdit._id ? 'Edit this bug' : 'Add a new bug'}</h2>

        <form onSubmit={onSaveBug}>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter title..."
                value={bugToEdit.title}
                onChange={handleChange} />

            <input type="text"
                name="description"
                id="description"
                placeholder="Enter description..."
                value={bugToEdit.description}
                onChange={handleChange} />

            <input type="number"
                name="severity"
                id="severity"
                placeholder="Enter severity 0-10"
                value={bugToEdit.severity}
                onChange={handleChange}
                min={0}
                max={10}
            />

            <button>{bugToEdit._id ? 'Save' : 'Add'}</button>
            <Link to="/bug">Cancel</Link>


        </form>
    </div>
}