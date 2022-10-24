
import axios from 'axios';

import {
    PARTICIPATION_SUCCESS,
    PARTICIPATION_FAIL,
    ADD_PARTICIPATION_SUCCESS,
    ADD_PARTICIPATION_FAIL,
    EDIT_PARTICIPATION_SUCCESS,
    EDIT_PARTICIPATION_FAIL,
    DELETE_PARTICIPATION_SUCCESS,
    DELETE_PARTICIPATION_FAIL,
    PARTICIPATION_EXISTS,
    PARTICIPATION_NOT_EXISTS,
    DONOR_ID_SEARCH_SUCCESS,
    DONOR_ID_SEARCH_FAIL,
    EDIT_DONOR_SUCCESS,
    EDIT_DONOR_FAIL,
    WHOLESALE_ID_SUCCESS,
    WHOLESALE_ID_FAIL,
    EDIT_WHOLESALE_SUCCESS,
    EDIT_WHOLESALE_FAIL,
    PARTICIPATION_LIST_SUCCESSFUL,
    PARTICIPATION_LIST_FAIL
} from './types';

// GET PARTICIPANT LIST

export const getParticipantList = (CollectionID, FullName, Type) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            if (CollectionID === "" | CollectionID === null ){
                const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?fullname=${FullName}`, config)
                dispatch({
                    type: PARTICIPATION_LIST_SUCCESSFUL,
                    payload: res.data
                });
            } else {
                const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?collid=${CollectionID}&fullname=${FullName}&type=${Type}`, config)
                dispatch({
                    type: PARTICIPATION_LIST_SUCCESSFUL,
                    payload: res.data
                });
            }
            
        } catch (err) {
            dispatch({
                type: PARTICIPATION_LIST_FAIL
            });
        }

    } else {
        dispatch({
            type: PARTICIPATION_LIST_FAIL
        });
    }
}

// PULL PARTICIPANTS

export const getParticipants = (CollectionID) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchparticipants?collid=${CollectionID}`, config)
            dispatch({
                type: PARTICIPATION_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PARTICIPATION_FAIL
            });
        }
    } else {
        dispatch({
            type: PARTICIPATION_FAIL
        });
    }
};

// PULL CURRENT PARTICIPANTS

export const getCurrentParticipants = (CollectionID, DonorID, payRec, donTyp, totDon, droTim, donId, colId, whoId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
    
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchparticipants?collid=${CollectionID}&donid=${DonorID}`, config)
            
            if (res.data.length !== 0){
                dispatch({
                    type: PARTICIPATION_EXISTS,
                    payload: "Donor already Participating"
                });

            } else {
                dispatch({
                    type: PARTICIPATION_NOT_EXISTS,
                    payload: "Donor Not Participating"
                });
                dispatch(addParticipant(payRec, donTyp, totDon, droTim, donId, colId, whoId))
            }
                
        } catch (err) {
            dispatch({
                type: PARTICIPATION_NOT_EXISTS,
                payload: "errors"
            });
            //dispatch(addParticipant(payRec, donTyp, totDon, droTim, donId, colId, whoId))
        }
    } else {
        dispatch({
            type: PARTICIPATION_NOT_EXISTS
        });
    }
};

// UPDATE DONOR

export const updateDonor = (donorId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchdonors?donid=${donorId}`, config)
            dispatch({
                type: DONOR_ID_SEARCH_SUCCESS
            });

            let involveNo = parseInt(res.data[0].InvolveNo)+1
            
            const body = {
                "DonorID": `${res.data[0].DonorID}`,
                "FullName": `${res.data[0].FullName}`,
                "FirstName": `${res.data[0].FirstName}`,
                "LastName": `${res.data[0].LastName}`,
                "Email": `${res.data[0].Email}`,
                "Address1": `${res.data[0].Address1}`,
                "Address2": `${res.data[0].Address2}`,
                "PostCode": `${res.data[0].PostCode}`,
                "DonorType": `${res.data[0].DonorType}`,
                "Notes": `${res.data[0].Notes}`,
                "Phone": `${res.data[0].Phone}`,
                "InvolveNo": `${involveNo}`
            };
    
            try {
                const res = await axios.put(`${process.env.REACT_APP_API}donor`, body, config);
                dispatch({
                    type: EDIT_DONOR_SUCCESS,
                    payload: res.data
                });
                
            } catch (err) {
                dispatch({
                    type: EDIT_DONOR_FAIL
                });
                dispatch(alert('Failed'));
            }
        } catch (err) {
            dispatch({
                type: DONOR_ID_SEARCH_FAIL
            })
        }
    } else {
        dispatch({
            type: EDIT_DONOR_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// UPDATE WHOLESALE

export const updateWholesale = (CollectionID, wholesaleID, newDonationVal) => async dispatch => {

    if (localStorage.getItem('token')){
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchwholesale?collid=${CollectionID}`, conf)
            dispatch({
                type: WHOLESALE_ID_SUCCESS
            });
            let currentTotal = parseFloat(res.data[0].TotalDonated) + parseFloat(newDonationVal);
            let remainder = currentTotal - parseFloat(res.data[0].TotalSpent);

            const config ={
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            };
            
            const body = {
                "WholesaleID": `${wholesaleID}`,
                "TotalDonated": `${currentTotal}`,
                "TotalSpent": `${res.data[0].TotalSpent}`,
                "Remainder": `${remainder}`,
                "WholesaleReceipt": `${res.data[0].WholesaleReceipt}`,
                "CollectionID": `${res.data[0].CollectionID}`
            };
            try {
                const res = await axios.put(`${process.env.REACT_APP_API}wholesale`, body, config);
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

        } catch (err) {
            dispatch({
                type: WHOLESALE_ID_FAIL
            });
        }
        
    } else {
        dispatch({
            type: EDIT_WHOLESALE_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};


// ADD PARTICIPANTS

export const addParticipant  = (payRec, donTyp, totDon, droTim, donId, colId, whoId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "ParticipationID":null,
            "PaymentRecieved":`${payRec}`,
            "DonationType":`${donTyp}`,
            "TotalDonated":`${totDon}`,
            "DropOffTime":`${droTim}`,
            "DonorID":`${donId}`,
            "CollectionID":`${colId}`,
            "WholesaleID":`${whoId}`
        };
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}participants`, body, config);
            dispatch({
                type: ADD_PARTICIPATION_SUCCESS,
                payload: res.data
            });
            dispatch(updateDonor(donId));
            if (totDon !== "0"){ 
                dispatch(updateWholesale(colId, whoId, totDon));
            };
        } catch (err) {
            dispatch({
                type: ADD_PARTICIPATION_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: ADD_PARTICIPATION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// EDIT PARTICIPANTS

export const editParticipant = (CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "ParticipationID":`${ParticipantID}`,
            "PaymentRecieved":`${PaymentRecieved}`,
            "DonationType":`${DonationType}`,
            "TotalDonated":`${TotalDonated}`,
            "DropOffTime":`${DropOffTime}`,
            "DonorID":`${DonorID}`,
            "CollectionID":`${CollectionID}`,
            "WholesaleID":`${WholesaleID}`
        };

        let donChange = parseFloat(DonationChange)
    
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}participants`, body, config);
            dispatch({
                type: EDIT_PARTICIPATION_SUCCESS,
                payload: res.data
            });

            if (donChange !== 0) {
                dispatch(updateWholesale(CollectionID, WholesaleID, donChange));
            }
        } catch (err) {
            dispatch({
                type: EDIT_PARTICIPATION_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: EDIT_PARTICIPATION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// UPDATE WHOLESALE (DELETE)

export const updateWholesaleDelete = (wholesaleID, collectionID, DonationVal) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchwholesale?collid=${collectionID}`, config)
            dispatch({
                type: WHOLESALE_ID_SUCCESS
            });
            let currentTotal = parseFloat(res.data[0].TotalDonated) - parseFloat(DonationVal);
            let remainder = currentTotal - parseFloat(res.data[0].TotalSpent);

            const body = {
                "WholesaleID": `${wholesaleID}`,
                "TotalDonated": `${currentTotal}`,
                "TotalSpent": `${res.data[0].TotalSpent}`,
                "Remainder": `${remainder}`,
                "WholesaleReceipt": `${res.data[0].WholesaleReceipt}`,
                "CollectionID": `${res.data[0].CollectionID}`
            };
            try {
                const res = await axios.put(`${process.env.REACT_APP_API}wholesale`, body, config);
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

        } catch (err) {
            dispatch({
                type: WHOLESALE_ID_FAIL
            });
        }
        
    } else {
        dispatch({
            type: EDIT_WHOLESALE_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// DELETE PARTICIPANTS

export const deleteParticipant = (participantID, DonationVal, collectionID, wholesaleID) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}participants/${participantID}`, config);
            dispatch({
                type: DELETE_PARTICIPATION_SUCCESS,
                payload: res.data
            });

            dispatch(updateWholesaleDelete(wholesaleID, collectionID, DonationVal));
        } catch (err) {
            dispatch({
                type: DELETE_PARTICIPATION_FAIL
            });
            dispatch(alert('Delete Fail'));
        }
    } else {
        dispatch({
            type: DELETE_PARTICIPATION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

