import axios from 'axios';

export const loginUser = (userData, history) => {
    axios.post('http://localhost:3000/api/users/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            history.push('/');
        })
}

export const signupUser = (newUserData, history) => {
    axios.post('http://localhost:3000/api/users/register', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            history.push('/');
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}