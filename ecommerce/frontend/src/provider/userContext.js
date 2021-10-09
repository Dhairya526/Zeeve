import React, { createContext, useState } from "react";

export const userContext = createContext();

export default function UserState(props) {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userType, setUserType] = useState('');
    const login = () => {
        setIsLoggedin(true);
    }
    const setUser = (userType) => {
        setUserType(userType)
    }
    return (
        <userContext.Provider value={{ isLoggedin, login, userType, setUser }}>
            {props.children};
        </userContext.Provider>
    )
}
