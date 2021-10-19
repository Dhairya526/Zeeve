import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { decodeToken, getAccessToken } from '../core/utils/tokenHandler';

const PublicRoute = ({ path, component: Component, ...props }) => {
    console.log('Public route');
    const [isAuth, setisAuth] = useState(false)
    useEffect(() => {
        const token = getAccessToken();
        const decodedjwtToken = decodeToken(token);
        if (decodedjwtToken) {
            setisAuth(true);
        }
    }, [path])
    return (
        <Route {...props} render={props => (
            !isAuth ?
                <Component {...props} />
                : <Redirect to="/dashboard" />
        )} />
    )
}

export default PublicRoute;