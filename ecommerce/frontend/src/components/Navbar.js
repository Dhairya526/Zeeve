import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
                        aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/about'>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/signup'>Signup</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar