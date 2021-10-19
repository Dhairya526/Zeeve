import { decode } from "jsonwebtoken";

export const setAccessToken = (token) => {
    localStorage.setItem('jwt', JSON.stringify(token));
}

export const getAccessToken = () => {
    return JSON.parse(localStorage.getItem('jwt'));
}

export const removeAccessToken = () => {
    localStorage.removeItem('jwt');
}

export const decodeToken = (token) => {
    const decodedToken = decode(token);
    return decodedToken;
}

export const getUserIdFromToken = () => {
    const token = decodeToken(getAccessToken());
    return token.userId;
}

export const getUserTypeFromToken = () => {
    const token = decodeToken(getAccessToken());
    return token.userType;
}