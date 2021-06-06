import {
  LOADING_USER, SET_AUTHENTICATED,
  SET_UNAUTHENTICATED, SET_USER, WRONG_PASSWORD_OR_EMAIL
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    wrongPasswordOrEmail: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
              wrongPasswordOrEmail: false
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
      case WRONG_PASSWORD_OR_EMAIL:
        return {
          ...state,
          wrongPasswordOrEmail: true
        };
        default:
            return state;
    }
}
