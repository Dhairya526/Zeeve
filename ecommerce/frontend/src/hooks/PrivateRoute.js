import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { fetchUserDataApi } from '../core/services/api';
import { decodeToken, getAccessToken, removeAccessToken } from '../core/utils/tokenHandler';
import { Store } from '../provider/Store';

const PrivateRoute = ({ path, sellerComponent: SellerComponent, buyerComponent: BuyerComponent, ...props }) => {
    console.log('private route');
    const { setUserData } = useContext(Store);
    const [userType, setuserType] = useState(null);
    const [isAuth, setisAuth] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwtToken = getAccessToken();
                const decodedjwtToken = decodeToken(jwtToken);
                if (decodedjwtToken) {
                    const latestUserData = await fetchUserDataApi(decodedjwtToken.userId);
                    setUserData(latestUserData);
                    setuserType(decodedjwtToken.userType);
                    setisAuth(true);
                    setloading(false);
                }
                else {
                    setisAuth(false);
                    removeAccessToken();
                    setloading(false);
                }
            } catch (error) {
                console.log('PrivateRoute error :', error);
            }
        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])


    const getComponent = (innerProps) => {
        if (userType === 'BUYER' && BuyerComponent) {
            return (<BuyerComponent {...innerProps} />);
        } else if (userType === 'SELLER' && SellerComponent) {
            return (<SellerComponent {...innerProps} />);
        } else {
            return (<Redirect to="/404" />);
        }
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <Route
            {...props}
            render={innerProps =>
                isAuth ? getComponent(innerProps) :
                    (<Redirect to="/" />)
            }
        />
    );
}

export default PrivateRoute;;