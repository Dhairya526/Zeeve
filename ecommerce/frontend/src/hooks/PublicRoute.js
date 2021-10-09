import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../provider/userContext'

export default function PublicRoute({ component: Component, path }) {
    const user = useContext(userContext);
    return (
        <Route path={path} render={props => (
            !user.isLoggedin ?
                <Component {...props} />
                : <Redirect to="/dashboard" />
        )} />
    )
}
