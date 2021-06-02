import { SET_USER, 
    SET_UNAUTHENTICATED, 
    LOADING_USER,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS
} from '../redux/types';
import axios from 'axios';
import { serverUrls } from '../config/config';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(serverUrls.login, userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data
          });
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(serverUrls.register, newUserData)
      .then((res) => {
          setAuthorizationHeader(res.data.token);
          dispatch(getUserData());
          dispatch({ type: CLEAR_ERRORS });
          history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get(serverUrls.users)
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = '/';
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}
