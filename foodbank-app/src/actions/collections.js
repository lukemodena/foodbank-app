import React from "react";
import axios from 'axios';

import {
    COLLECTIONS_SUCCESS,
    COLLECTIONS_FAIL,
    COLLECTION_SEARCH_SUCCESS,
    COLLECTION_SEARCH_FAIL,
    ADD_COLLECTION_SUCCESS,
    ADD_COLLECTION_FAIL,
    EDIT_COLLECTION_SUCCESS,
    EDIT_COLLECTION_FAIL,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAIL,
    COLLECTION_PHOTO_SUCCESS,
    COLLECTION_PHOTO_FAIL,
    OLD_PHOTO_DELETE_SUCCESS,
    OLD_PHOTO_DELETE_FAIL,
    OLD_PHOTO_DELETE_CANCEL,
    COLLECTION_ID_SEARCH_SUCCESS,
    COLLECTION_ID_SEARCH_FAIL,
    ADD_WHOLESALE_SUCCESS,
    ADD_WHOLESALE_FAIL
} from './types';

// PULL COLLECTION

export const getCollections = () => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
    
        try {
            const res = await axios.get('http://127.0.0.1:8000/searchcollections', config)
            dispatch({
                type: COLLECTIONS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: COLLECTIONS_FAIL
            });
        }
    } else {
        dispatch({
            type: COLLECTIONS_FAIL
        });
    }
};

// SEARCH COLLECTION

export const searchCollections = (monthType, searchInputStart, searchInputEnd) => async dispatch => {
    if (localStorage.getItem('token')) { 
        if (searchInputStart == null || searchInputStart === ""){
            try {
                const config ={
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };

                const res = await axios.get(`http://127.0.0.1:8000/searchcollections?type=${monthType}`, config)
                dispatch({
                    type: COLLECTION_SEARCH_SUCCESS,
                    payload: res.data
                });
            } catch (err) {
                dispatch({
                    type: COLLECTION_SEARCH_FAIL
                });
                dispatch(getCollections());
            }
        } else {
            try {
                const config ={
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };
                
                const res = await axios.get(`http://127.0.0.1:8000/searchcollections?startdate=${searchInputStart}&enddate=${searchInputEnd}&search=${monthType}`, config)
                dispatch({
                    type: COLLECTION_SEARCH_SUCCESS,
                    payload: res.data
                });
            } catch (err) {
                dispatch({
                    type: COLLECTION_SEARCH_FAIL
                });
                dispatch(getCollections());
            }
        }
    } else {
        dispatch({
            type: COLLECTION_SEARCH_FAIL
        });
    }
};

// ADD WHOLESALE

export const addWholesale = (collId) => async dispatch => {

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
            "TotalDonated":"0",
            "TotalSpent":"0",
            "Remainder":"0",
            "WholesaleReceipt":"N/A",
            "CollectionID":`${collId}`
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

// ADD COLLECTION

export const addCollection = (date, type, totalWeight, totalCost, photo, spreadsheet) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "CollectionID": null,
            "CollectionDate": `${date}`,
            "Type": `${type}`,
            "TotalWeight": `${totalWeight}`,
            "TotalCost": `${totalCost}`,
            "CollectionPhoto": `${photo}`,
            "CollectionSpreadsheet": `${spreadsheet}`
        };
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/collection', body, config);
            dispatch({
                type: ADD_COLLECTION_SUCCESS,
                payload: res.data
            });
            try {
                const res = await axios.get(`http://127.0.0.1:8000/searchcollections?startdate=${date}`, config);
                dispatch({
                    type: COLLECTION_ID_SEARCH_SUCCESS,
                    payload: res.data[0].CollectionID
                });

                const data = await res.data[0].CollectionID

                dispatch(addWholesale(data));
            } catch (err) {
                dispatch({
                    type: COLLECTION_ID_SEARCH_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: ADD_COLLECTION_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: ADD_COLLECTION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// EDIT COLLECTION

export const editCollection = (collectionId, date, type, totalWeight, totalCost, photo, spreadsheet) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "CollectionID": `${collectionId}`,
            "CollectionDate": `${date}`,
            "Type": `${type}`,
            "TotalWeight": `${totalWeight}`,
            "TotalCost": `${totalCost}`,
            "CollectionPhoto": `${photo}`,
            "CollectionSpreadsheet": `${spreadsheet}`
        };
    
        try {
            const res = await axios.put('http://127.0.0.1:8000/collection', body, config);
            dispatch({
                type: EDIT_COLLECTION_SUCCESS,
                payload: res.data
            });
            
        } catch (err) {
            dispatch({
                type: EDIT_COLLECTION_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: EDIT_COLLECTION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// DELETE COLLECTION

export const deleteCollection = (collectionId) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/collection/${collectionId}`, config);
            dispatch({
                type: DELETE_COLLECTION_SUCCESS
            });
        } catch (err) {
            dispatch({
                type: DELETE_COLLECTION_FAIL
            });
            dispatch(alert('Delete Fail'));
        }
    } else {
        dispatch({
            type: DELETE_COLLECTION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

export const addCollectionPhoto = (file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet) => async dispatch => {

    const formData = new FormData();

    if (ogfile === "anonymous.png"){
        formData.append(
            "myFile",
            file
        );
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const body = formData;

        try {
            const res = await axios.post('http://127.0.0.1:8000/Collection/FileHandle', body, config);
            dispatch({
                type: COLLECTION_PHOTO_SUCCESS,
                payload: res.data
            });
            dispatch(editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet));
        } catch (err) {
            dispatch({
                type: COLLECTION_PHOTO_FAIL
            });
        }
    } else if (ogfile !== "anonymous.png") {
        const confirmDel = `Are you sure you want to overwrite ${ogfile}?`

        // Confirm deletion of original photo, and delete request //
        if (window.confirm(confirmDel)) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };
                const body = {
                    "fileName": `${ogfile}`
                }
                const res = await axios.delete('http://127.0.0.1:8000/Collection/FileHandle', body, config);
                dispatch({
                    type: OLD_PHOTO_DELETE_SUCCESS,
                    payload: res.data
                });
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    };

                    formData.append(
                        "myFile",
                        file
                    );
                    
                    const body = formData
                    const res = await axios.post('http://127.0.0.1:8000/Collection/FileHandle', body, config);
                    dispatch({
                        type: COLLECTION_PHOTO_SUCCESS,
                        payload: res.data
                    });
                    dispatch(editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet));
                } catch (err) {
                    dispatch({
                        type: COLLECTION_PHOTO_FAIL
                    });
                }
            } catch (err) {
                dispatch({
                    type: OLD_PHOTO_DELETE_FAIL
                });
            }
        }
    } else {
        dispatch({
            type: OLD_PHOTO_DELETE_CANCEL
        });
    }
}