import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../provider/Store'
import LogoutButton from './LogoutButton'
import Notifications from './Notifications';

function Navbar() {
    const { newNotificationAlert, setNewNotificationAlert } = useContext(Store);
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/dashboard'>My Ecommerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
                        aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            <li className="nav-item">
                                <Link className="nav-link" to='/dashboard'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/profile'>Profile</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right mb-sm-0 align-items-center">
                            <li className="nav-item dropdown">
                                <button onClick={() => setNewNotificationAlert(false)} className="btn py-0 position-relative" type="button" id="navbarDarkDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-bell-fill text-light fs-2 position-relative"></i>
                                    {newNotificationAlert && <span className="position-absolute top-30 start-70 translate-middle-x badge border-danger rounded-circle bg-danger p-2" ><span className="visually-hidden">new notification</span></span>}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                    <Notifications />
                                </ul>
                            </li>
                            <li className="nav-item mx-2">
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar