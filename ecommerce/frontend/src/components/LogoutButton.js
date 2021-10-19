import React from 'react'
import { useHistory } from 'react-router';
import { useContext } from 'react/cjs/react.development'
import { removeAccessToken } from '../core/utils/tokenHandler';
import { Store } from '../provider/Store';

export default function LogoutButton() {
    const history = useHistory();
    const { setUserData } = useContext(Store);
    const logout = () => {
        setUserData({});
        removeAccessToken();
        history.replace('/');
    }
    return (
        <button className="btn btn-light" onClick={logout}>
            Logout
        </button>
    )
}
