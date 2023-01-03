const { NavLink } = ReactRouterDOM
const {  useEffect } = React

import { UserMsg } from './user-msg.jsx'

export function AppHeader() {


    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return (
        <header>
            <UserMsg />
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/bug">Bugs</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>
            <h1>Bugs are Forever</h1>
        </header>
    )
}
