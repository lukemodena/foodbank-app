import React from "react";
import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
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
            const res = await axios.post('http://127.0.0.1:8000/api/auth/user', config)
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
        const res = await axios.post('http://127.0.0.1:8000/api/auth/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
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
            const res = await axios.get('http://127.0.0.1:8000/api/auth/user', config);
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

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};