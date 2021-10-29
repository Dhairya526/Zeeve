import React from 'react'
import { useHistory } from 'react-router';
import { useContext } from 'react/cjs/react.development'
import { removeAccessToken } from '../../core/utils/tokenHandler';
import { Store } from '../../provider/Store';

export default function LogoutButton() {
    const history = useHistory();
    const { socket, setUserData, setNotifications } = useContext(Store);
    const logout = () => {
        setUserData({});
        removeAccessToken();
        setNotifications([]);
        socket.disconnect();
        history.replace('/');
    }
    return (
        <button className="btn btn-light" onClick={logout}>
            Logout
        </button>
    )
}
