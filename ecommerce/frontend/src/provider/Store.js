import { createContext, useState } from 'react';
import io from 'socket.io-client';
import config from '../config/config';
import { getAccessToken } from '../core/utils/tokenHandler';

export const Store = createContext();

let socket;
export const connectSocket = () => {
    if (getAccessToken())
        socket = io(config.socketUrl, { auth: { jwtToken: getAccessToken() } });
}
connectSocket();

export default function AppProvider({ children }) {
    const [userData, setUserData] = useState({});

    const [allProducts, setAllProducts] = useState([]);
    const [sellerProducts, setSellerProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [notifications, setNotifications] = useState([]);
    const [newNotificationAlert, setNewNotificationAlert] = useState(false);

    const combinedStore = {
        socket,
        userData,
        setUserData,
        allProducts,
        setAllProducts,
        sellerProducts,
        setSellerProducts,
        categories,
        setCategories,
        notifications,
        setNotifications,
        newNotificationAlert,
        setNewNotificationAlert,
    };

    return (
        <Store.Provider value={combinedStore}>
            {children}
        </Store.Provider>
    )
}