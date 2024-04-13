import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className="errorpage">
            <h1>Error 404</h1>
            <h4>Sorry, but the page you were trying to view does not exist.
               <Link to='/' id='errorlink'> <span >  click Here </span></Link>  to redirected to the home page
            </h4>
        </div>
    )
}
