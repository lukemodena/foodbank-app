
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
    EDIT_WHOLESALE_FAIL
} from './types';

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
            const res = await axios.get(`http://127.0.0.1:8000/searchparticipants?collid=${CollectionID}`, config)
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
            const res = await axios.get(`http://127.0.0.1:8000/searchparticipants?collid=${CollectionID}&donid=${DonorID}`, config)
            if (`${res.data[0].DonorID}` === DonorID){
                dispatch({
                    type: PARTICIPATION_EXISTS,
                    payload: "Donor Already Participating"
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
                payload: "Donor Not Participating"
            });
            dispatch(addParticipant(payRec, donTyp, totDon, droTim, donId, colId, whoId))
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
            const res = await axios.get(`http://127.0.0.1:8000/searchdonors?donid=${donorId}`, config)
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
                const res = await axios.put('http://127.0.0.1:8000/donor', body, config);
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
                type: WHOLESALE_ID_SUCCESS
            });
            let currentTotal = parseFloat(res.data[0].TotalDonated) + parseFloat(newDonationVal);
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
                const res = await axios.put('http://127.0.0.1:8000/wholesale', body, config);
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
            "DonorID":parseInt(donId),
            "CollectionID":parseInt(colId),
            "WholesaleID":parseInt(whoId)
        };
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/participants', body, config);
            dispatch({
                type: ADD_PARTICIPATION_SUCCESS,
                payload: res.data
            });
            dispatch(updateDonor(donId));
            dispatch(updateWholesale(colId, whoId, totDon));
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

export const editParticipant = (parId, payRec, donTyp, totDon, droTim, donId, colId, whoId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "ParticipationID":parseInt(parId),
            "PaymentRecieved":`${payRec}`,
            "DonationType":`${donTyp}`,
            "TotalDonated":`${totDon}`,
            "DropOffTime":`${droTim}`,
            "DonorID":parseInt(donId),
            "CollectionID":parseInt(colId),
            "WholesaleID":parseInt(whoId)
        };
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/participants', body, config);
            dispatch({
                type: EDIT_PARTICIPATION_SUCCESS,
                payload: res.data
            });
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

// DELETE PARTICIPANTS

export const deleteCollection = (participantID, totalDonated) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/participants/${participantID}`, config);
            dispatch({
                type: DELETE_PARTICIPATION_SUCCESS
            });
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

