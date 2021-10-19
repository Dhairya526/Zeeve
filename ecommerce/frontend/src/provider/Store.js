import { createContext, useState } from 'react';

export const Store = createContext();

export default function AppProvider({ children }) {

    const [userData, setUserData] = useState({});

    const [allProducts, setAllProducts] = useState([]);
    const [sellerProducts, setSellerProducts] = useState([]);
    const [categories, setCategories] = useState([]);


    const combinedStore = {
        userData,
        setUserData,
        allProducts,
        setAllProducts,
        sellerProducts,
        setSellerProducts,
        categories,
        setCategories,
    };

    return (
        <Store.Provider value={combinedStore}>
            {children}
        </Store.Provider>
    )
}