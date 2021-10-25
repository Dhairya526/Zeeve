import { Redirect } from "react-router-dom";
import config from "../../config/config";
import { getAccessToken, removeAccessToken } from "../utils/tokenHandler";

const authToken = getAccessToken();
const logout = () => {
    alert('Unathorized Access!!!');
    removeAccessToken();
    return <Redirect to='/' />;
}

// **************************************************************************
//                              Authentication APIs
// **************************************************************************

export const signupApi = async (payload) => {
    console.log('signupApi');
    const response = await fetch(config.authApi + '/signup', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
        body: payload,
    });
    const data = await response.json();
    return data;
}

export const loginApi = async (payload) => {
    console.log('loginApi');
    const response = await fetch(config.authApi + '/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
        body: payload,
    });
    const data = await response.json();
    return data;
}

// **************************************************************************
//                              User APIs
// **************************************************************************

export const fetchUserDataApi = async (id) => {
    console.log('fetchUserDataApi');
    const response = await fetch(config.userApi + `/userDetails/${id}`, {
        method: "GET",
        headers: { "jwt": authToken },
    });
    const data = await response.json();
    return data;
}

export const modifyUserApi = async (uid, payload) => {
    console.log('modifyUserApi');
    const response = await fetch(config.userApi + `/modifyUser/${uid}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
        body: payload,
    });
    const data = await response.json();
    return data;
}

export const verifyEmailApi = async (method) => {
    console.log('verifyEmailApi');
    const response = await fetch(config.userApi + `/verify/email/${method}`, {
        method: "GET",
        headers: { "jwt": authToken },
    });
    const data = await response.json();
    return data;
}

export const confirmEmailApi = async (path) => {
    console.log('confirmEmailApi');
    const response = await fetch(config.userApi + path, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}

export const confirmOtpApi = async (payload) => {
    console.log('confirmOtpApi');
    const response = await fetch(config.userApi + '/confirm/email/otp', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
        body: payload,
    });
    const data = await response.json();
    return data;
}

export const requestChangePasswordApi = async (payload) => {
    console.log('requestChangePasswordApi');
    const response = await fetch(config.userApi + '/confirm/email/otp', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
        body: payload,
    });
    const data = await response.json();
    return data;
}

// **************************************************************************
//                                 Buyer APIs
// **************************************************************************

export const productsApi = async () => {
    try {
        console.log('productsApi');
        const response = await fetch(config.buyerApi + '/products', {
            method: "GET",
            headers: { "jwt": authToken },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('errrrrrrrrr', error);
    }

}

// **************************************************************************
//                                Seller APIs
// **************************************************************************

export const sellerProductsApi = async (uid) => {
    try {
        console.log('sellerProductsApi');
        const response = await fetch(config.sellerApi + `/getProducts/${uid}`, {
            method: "GET",
            headers: { "jwt": authToken },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error', error);
    }

}

export const productCategoriesApi = async () => {
    try {
        console.log('productCategoriesApi');
        const response = await fetch(config.sellerApi + '/getCategories', {
            method: "GET",
            // headers: { "jwt": `${authToken}w` },s
            headers: { "jwt": authToken },
        });
        const data = await response.json();
        if (data.errors)
            if (data.errors.access) {
                console.log(data.errors);
                logout();
            }
        return data;
    } catch (error) {
        console.log('errrrrrrrrr', error);
    }

}

export const addProductApi = async (payload) => {
    console.log('addProductApi');
    const response = await fetch(config.sellerApi + '/addProduct', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
        body: payload,
    });
    const data = await response.json();
    return data;
}

export const modifyProductApi = async (pid, payload) => {
    console.log('modifyProductApi');
    const response = await fetch(config.sellerApi + `/modifyProduct/${pid}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
        body: payload,
    });
    const data = await response.json();
    return data;
}

export const deleteProductApi = async (pid) => {
    console.log('deleteProductApi');
    const response = await fetch(config.sellerApi + `/removeProduct/${pid}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "jwt": authToken
        },
    });
    const data = await response.json();
    return data;
}
