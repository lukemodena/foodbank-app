
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
    ADD_WHOLESALE_FAIL,
    COLLECTION_STATUS_SUCCESS,
    COLLECTION_STATUS_FAIL,
    WHOLESALE_SUCCESS,
    WHOLESALE_FAIL,
    ACTIVE_COLLECTION_SUCCESS,
    ACTIVE_COLLECTION_FAIL
} from './types';

// PULL COLLECTION

export const getCollections = (status) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        if (status !== null) {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}searchcollections?status=${status}`, config)
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
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}searchcollections`, config)
                dispatch({
                    type: COLLECTIONS_SUCCESS,
                    payload: res.data
                });
            } catch (err) {
                dispatch({
                    type: COLLECTIONS_FAIL
                });
            }
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
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                };

                const res = await axios.get(`${process.env.REACT_APP_API}searchcollections?type=${monthType}`, config)
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
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                };
                
                const res = await axios.get(`${process.env.REACT_APP_API}searchcollections?startdate=${searchInputStart}&enddate=${searchInputEnd}&search=${monthType}`, config)
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
            const res = await axios.post(`${process.env.REACT_APP_API}wholesale`, body, config);
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

// CHECK STATUS (ADD)

export const checkStatusAdd = (status) => async dispatch => {
    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try{ 
            const res = await axios.get(`${process.env.REACT_APP_API}collectionstatus?status=${status}`, config);
            dispatch({
                type: COLLECTION_STATUS_SUCCESS,
                payload: res.data
            });
            const collectionId = await res.data[0].CollectionID
            const date = await res.data[0].CollectionDate
            const type = await res.data[0].Type
            const totalWeight = await res.data[0].TotalWeight
            const totalCost = await res.data[0].TotalCost
            const photo = await res.data[0].CollectionPhoto
            const spreadsheet = await res.data[0].CollectionSpreadsheet
            const newstatus = "ARCHIVED"
            
            dispatch(editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, newstatus));
            

        } catch(err) {
            dispatch({
                type: COLLECTION_STATUS_FAIL,
                payload: err
            });
        }
    } else {
        dispatch({
            type: COLLECTION_STATUS_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
}

// CHECK STATUS (EDIT)

export const checkStatusEdit = (status, collid) => async dispatch => {
    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try{ 
            const res = await axios.get(`${process.env.REACT_APP_API}collectionstatus?status=${status}`, config);
            dispatch({
                type: COLLECTION_STATUS_SUCCESS,
                payload: res.data
            });
            const collectionId = await res.data[0].CollectionID
            const date = await res.data[0].CollectionDate
            const type = await res.data[0].Type
            const totalWeight = await res.data[0].TotalWeight
            const totalCost = await res.data[0].TotalCost
            const photo = await res.data[0].CollectionPhoto
            const spreadsheet = await res.data[0].CollectionSpreadsheet
            const newstatus = "ARCHIVED"

            if (parseInt(collid) !== collectionId) {
                dispatch(editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, newstatus));
            }

        } catch(err) {
            dispatch({
                type: COLLECTION_STATUS_FAIL,
                payload: err
            });
        }
    } else {
        dispatch({
            type: COLLECTION_STATUS_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
}

// ADD COLLECTION

export const addCollection = (date, type, totalWeight, totalCost, photo, spreadsheet, status) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
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
            "CollectionSpreadsheet": `${spreadsheet}`,
            "CollectionStatus": `${status}`
        };
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}collection`, body, config);
            dispatch({
                type: ADD_COLLECTION_SUCCESS,
                payload: res.data
            });
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}searchcollections?startdate=${date}`, config);
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

export const editCollection = (collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
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
            "CollectionSpreadsheet": `${spreadsheet}`,
            "CollectionStatus": `${status}`
        };
    
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}collection`, body, config);
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
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}collection/${collectionId}`, config);
            dispatch({
                type: DELETE_COLLECTION_SUCCESS,
                payload: res.data
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

// DELETE MULTIPLE COLLECTIONS

export const deleteCollectionsMulti = (collections) => async dispatch => {
    if (localStorage.getItem('token')) {
        await collections.map((id) => {
            try{
                dispatch(deleteCollection(id))
            } catch(err) {
                dispatch({
                    type: DELETE_COLLECTION_FAIL
                })
            }
        })
    } else {
        dispatch({
            type: DELETE_COLLECTION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// ADD COLLECTION PHOTO (After Delete)

export const newCollectionPhoto = (file, photo, collectionId, date, type, totalWeight, totalCost, spreadsheet, status) => async dispatch => {
    const formData = new FormData();
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        }
    };
    formData.append(
        "myFile",
        file
    );
    const body = formData;
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}Collection/FileHandle`, body, config);
        dispatch({
            type: COLLECTION_PHOTO_SUCCESS,
            payload: res.data
        });
        dispatch(editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status));
    } catch (err) {
        dispatch({
            type: COLLECTION_PHOTO_FAIL
        });
    }
}

// EDIT COLLECTION (With Photo) - Delete photo (if exists) OR - Add new photo (if none exist)

export const addCollectionPhoto = (file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet, status) => async dispatch => {

    const formData = new FormData();

    if (ogfile === "anonymous.png"){
        formData.append(
            "myFile",
            file
        );
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            }
        };
        const body = formData;

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}Collection/FileHandle`, body, config);
            dispatch({
                type: COLLECTION_PHOTO_SUCCESS,
                payload: res.data
            });
            dispatch(editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status));
        } catch (err) {
            dispatch({
                type: COLLECTION_PHOTO_FAIL
            });
        }
    } else if (ogfile !== "anonymous.png") {
        const confirmDel = `Are you sure you want to overwrite ${ogfile}?`

        // Confirm deletion of original photo, and delete request //
        if (window.confirm(confirmDel)) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            };
            const body = { 
                data: JSON.stringify({
                    "fileName":`${ogfile}`
                })
            };
            try {
                
                const res = await axios.delete(`${process.env.REACT_APP_API}Collection/FileHandle`, body, config);
                dispatch({
                    type: OLD_PHOTO_DELETE_SUCCESS,
                    payload: res.data
                });
                dispatch(newCollectionPhoto(file, photo, collectionId, date, type, totalWeight, totalCost, spreadsheet));
            } catch (err) {
                dispatch({
                    type: OLD_PHOTO_DELETE_FAIL,
                    payload: err
                });
            }
        }
    } else {
        dispatch({
            type: OLD_PHOTO_DELETE_CANCEL
        });
    }
}
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
            const res = await axios.get(`${process.env.REACT_APP_API}searchwholesale?collid=${CollectionID}`, config)
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

// GET ACTIVE COLLECTION

export const getActiveCollection = () => async dispatch => {
    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try{ 
            const res = await axios.get(`${process.env.REACT_APP_API}collectionstatus?status=ACTIVE`, config);
            dispatch({
                type: ACTIVE_COLLECTION_SUCCESS,
                payload: res.data
            });

            const CollectionID = await res.data[0].CollectionID;
            dispatch(getWholesale(CollectionID))

        } catch(err) {
            dispatch({
                type: ACTIVE_COLLECTION_FAIL,
                payload: err
            });
        }
    } else {
        dispatch({
            type: ACTIVE_COLLECTION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
}