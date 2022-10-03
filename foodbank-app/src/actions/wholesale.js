import React from "react";
import axios from 'axios';

import {
    WHOLESALE_SUCCESS,
    WHOLESALE_FAIL,
    ADD_WHOLESALE_SUCCESS,
    ADD_WHOLESALE_FAIL,
    EDIT_WHOLESALE_SUCCESS,
    EDIT_WHOLESALE_FAIL,
    DELETE_WHOLESALE_SUCCESS,
    DELETE_WHOLESALE_FAIL
} from './types';

// PULL WHOLESALE

export const getWholesale = (CollectionID) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
    
        try {
            const res = await axios.get(`http://127.0.0.1:8000/searchwholesale?collid=${CollectionID}`, config)
            dispatch({
                type: WHOLESALE_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: WHOLESALE_FAIL
            });
        }
    } else {
        dispatch({
            type: WHOLESALE_FAIL
        });
    }
};

// ADD WHOLESALE

export const addWholesale = (remainder, collId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "WholesaleID":null,
            "TotalDonated":parseFloat(remainder),
            "TotalSpent":parseFloat(0),
            "Remainder":parseFloat(0),
            "WholesaleReceipt":"N/A",
            "CollectionID":parseInt(collId)
        };
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/wholesale', body, config);
            dispatch({
                type: ADD_WHOLESALE_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ADD_WHOLESALE_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: ADD_WHOLESALE_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

export const editWholesale = (wholId, totalDonated, totalSpent, collId, newDonationVal, wholesaleReceipt) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        let currentTotal = parseFloat(totalDonated) + parseFloat(newDonationVal);
        let remainder = currentTotal - parseFloat(totalSpent);

        const body = {
            "WholesaleID": `${wholId}`,
            "TotalDonated": `${currentTotal}`,
            "TotalSpent": `${totalSpent}`,
            "Remainder": `${remainder}`,
            "WholesaleReceipt": `${wholesaleReceipt}`,
            "CollectionID": `${collId}`
        };
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/wholesale', body, config);
            dispatch({
                type: EDIT_WHOLESALE_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: EDIT_WHOLESALE_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: EDIT_WHOLESALE_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// DELETE WHOLESALE

export const deleteCollection = (wholesaleId) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/wholesale/${wholesaleId}`, config);
            dispatch({
                type: DELETE_WHOLESALE_SUCCESS
            });
        } catch (err) {
            dispatch({
                type: DELETE_WHOLESALE_FAIL
            });
            dispatch(alert('Delete Fail'));
        }
    } else {
        dispatch({
            type: DELETE_WHOLESALE_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

