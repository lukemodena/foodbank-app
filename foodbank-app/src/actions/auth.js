
import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from './types';

// AUTHENTICATION

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API}api/auth/user`, config)
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


// LOGIN
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    const body = {
        "username":`${username}`,
        "password":`${password}`
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API}api/auth/login`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err
        });
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}api/auth/user`, config);
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_USER_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
};

export const logout = () => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    };

    try {    
        const res = await axios.post(`${process.env.REACT_APP_API}api/auth/logout`, null, config);
        dispatch({ type: 'CLEAR_DONORS' });
        dispatch({ type: 'CLEAR_COLLECTIONS' });
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: err.response.data
        });
    }
};