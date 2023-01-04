const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function BugDetails() {
    const [bug, setBug] = useState(null)
    const { bugId } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        loadBug()
    },[bugId])

    function loadBug() {
        bugService.get(bugId)
            .then((bug) => setBug(bug))
            .catch((err) => {
                console.log('Had issues in bug details', err)
                showErrorMsg('Cannot load bug')
                navigate('/bug')
            })
    }


    if (!bug) return <h1>loadings....</h1>
    return bug && <div className='bug-details'>
        <h3>Bug Details 🐛</h3>
        <h4>Title: {bug.title}</h4>
        <p>Description: {bug.description}</p>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Labels: </p><ul>{bug.labels.map((label,idx) => <li key={idx}>{label}</li>)}</ul>
        <p>CreatedAt: {new Date(bug.createdAt).toDateString()}</p>
        <Link to="/bug">Back to List</Link>
    </div>
}

