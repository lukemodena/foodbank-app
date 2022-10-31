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
    CLEAR_COLLECTIONS,
    COLLECTION_ID_SEARCH_SUCCESS,
    COLLECTION_ID_SEARCH_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    COLLECTION_STATUS_SUCCESS,
    COLLECTION_STATUS_FAIL,
    ACTIVE_COLLECTION_SUCCESS,
    ACTIVE_COLLECTION_FAIL
} from '../actions/types';

const initialState = { 
    colls: [],
    result: '',
    total: 0,
    totalc: 0,
    isAuthenticated: null,
    statusCol: []
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }

        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }

        case COLLECTIONS_SUCCESS:
            return {
                ...state,
                colls: payload,
                total: payload.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 ),
                totalc: payload.reduce((a,v) =>  a = a + parseInt(v.TotalCost) , 0 )
            }

        case COLLECTIONS_FAIL:
            return {
                ...state,
                colls: [],
                total: 0,
                totalc: 0
            }

        case COLLECTION_SEARCH_SUCCESS:
            return{
                ...state,
                colls: payload,
                total: payload.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 ),
                totalc: payload.reduce((a,v) =>  a = a + parseInt(v.TotalCost) , 0 )
            }
            
        case COLLECTION_SEARCH_FAIL:
            return {
                ...state,
                colls: payload,
                total: payload.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 ),
                totalc: payload.reduce((a,v) =>  a = a + parseInt(v.TotalCost) , 0 )
            }

        case ADD_COLLECTION_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case ADD_COLLECTION_FAIL:
            return {
                ...state,
                result: payload
            }

        case EDIT_COLLECTION_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case EDIT_COLLECTION_FAIL:
            return {
                ...state,
                result: payload
            }

        case DELETE_COLLECTION_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case DELETE_COLLECTION_FAIL:
            return {
                ...state,
                result: payload
            }
        case COLLECTION_PHOTO_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case COLLECTION_PHOTO_FAIL:
            return {
                ...state
            }
        case OLD_PHOTO_DELETE_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case OLD_PHOTO_DELETE_FAIL:
            return {
                ...state
            }

        case OLD_PHOTO_DELETE_CANCEL:
            return {
                ...state
            }

        case CLEAR_COLLECTIONS:
            return {
                ...state,
                colls: [],
                result: '',
                total: 0,
                totalc: 0
            }

        case COLLECTION_ID_SEARCH_SUCCESS:
            return {
                ...state
            }

        case COLLECTION_ID_SEARCH_FAIL:
            return {
                ...state
            }
        case COLLECTION_STATUS_SUCCESS:
            return {
                ...state,
                statusCol: payload
            }
        case COLLECTION_STATUS_FAIL:
            return {
                ...state,
                result: payload
            }
        case ACTIVE_COLLECTION_SUCCESS:
            return {
                ...state,
                statusCol: payload
            }
        case ACTIVE_COLLECTION_FAIL:
            return {
                ...state,
                result: payload
            }

    default:
        return state;
    }
}