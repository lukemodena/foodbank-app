import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loginStatus: ""
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case AUTHENTICATED_SUCCESS:
            localStorage.setItem('isAuthenticated', true)
            return {
                ...state,
                isAuthenticated: true
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            localStorage.setItem('isAuthenticated', true)
            localStorage.setItem('loginStatus', "Success")
            return {
                ...state,
                isAuthenticated: true,
                token: payload.token
            }

        case LOAD_USER_SUCCESS:
            localStorage.setItem('isAuthenticated', true)
            return{
                ...state,
                user: payload
            }

        case AUTHENTICATED_FAIL:
            localStorage.setItem('isAuthenticated', false)
            return {
                ...state,
                isAuthenticated: false
            }
    
        case LOAD_USER_FAIL:
            localStorage.setItem('isAuthenticated', false)
            return{
                ...state,
                user: null
            }  

        case LOGIN_FAIL:
            localStorage.removeItem('token')
            localStorage.setItem('isAuthenticated', false)
            localStorage.setItem('loginStatus', "Failed")
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                loginStatus: "Failed"
            }

        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            localStorage.setItem('isAuthenticated', false)
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            }

        case LOGOUT_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}