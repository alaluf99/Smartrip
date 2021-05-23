import axios from 'axios';
import { serverUrls } from '../config/config';

export const loginUser = (userData, history) => {
    axios.post(serverUrls.login, userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            history.push('/');
        })
}

export const signupUser = (newUserData, history) => {
    axios.post(serverUrls.register, newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            history.push('/');
        })
}
export const logoutUser = () => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
}

export const getHeaders = () => {
    const token = localStorage.getItem('FBIdToken');
    return {'Authorization': token}
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}