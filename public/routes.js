import {HomePage} from './views/home-page.jsx'
import {AboutUs} from './views/about-us.jsx'
import {BugIndex} from './views/bug-index.jsx'
import {BugDetails} from './views/bug-details.jsx'


export default [
    {
        path:'/',
        component: HomePage,
    },
    {
        path:'/bug',
        component: BugIndex,
    },
    {
        path:'/bug/:bugId',
        component: BugDetails,
    },
    {
        path:'/about',
        component: AboutUs,
    }
]