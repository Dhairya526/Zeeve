import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../provider/userContext'

export default function PrivateRoute({ sellerComponent: SellerComponent, buyerComponent: BuyerComponent, path }) {
    console.log('private route');
    const contextUser = useContext(userContext);
    const Component = contextUser.userType === 'BUYER' ? BuyerComponent : SellerComponent;
    return (
        <Route path={path} render={props => (
            contextUser.isLoggedin ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    )
}
