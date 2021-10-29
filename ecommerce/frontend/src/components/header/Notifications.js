import React, { useContext, useEffect } from 'react';
import { getAccessToken } from '../../core/utils/tokenHandler';
import { Store } from '../../provider/Store';

export default function Notifications() {
    const { socket, notifications, setNotifications, setNewNotificationAlert } = useContext(Store);

    useEffect(() => {
        if (socket) {
            socket.on("connect_error", () => {
                socket.auth.jwtToken = getAccessToken();
                socket.connect();
            });
            socket.on('login', payload => {
                setNotifications([payload.message, ...notifications]);
                setNewNotificationAlert(true);
            });
            socket.on('notification', payload => {
                setNotifications([payload.message, ...notifications]);
                setNewNotificationAlert(true);
            });
        }
    });
    if (notifications.length === 0)
        return (
            <li><small className="dropdown-item-text" >No new notifications</small></li>
        );
    else
        return (
            notifications.map((notification, index) => {
                return <li key={index}><p className="dropdown-item-text" >{notification}</p></li>
            })
        )
}
