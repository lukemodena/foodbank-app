import {
    DONORS_SUCCESS,
    DONORS_FAIL,
    DONOR_SEARCH_SUCCESS,
    DONOR_SEARCH_FAIL,
    ADD_DONOR_SUCCESS,
    ADD_DONOR_FAIL,
    EDIT_DONOR_SUCCESS,
    EDIT_DONOR_FAIL,
    DELETE_DONOR_SUCCESS,
    DELETE_DONOR_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
} from '../actions/types';

const initialState = { 
    dons: [],
    result: '',
    isAuthenticated: null
};

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

        case DONORS_SUCCESS:
            return {
                ...state,
                dons: payload
            }

        case DONORS_FAIL:
            return {
                ...state,
                dons: []
            }

        case DONOR_SEARCH_SUCCESS:
            return{
                ...state,
                dons: payload
            }
            
        case DONOR_SEARCH_FAIL:
            return {
                ...state,
                dons: payload
            }

        case ADD_DONOR_SUCCESS:
            return {
                ...state,
                result: action.payload
            }

        case ADD_DONOR_FAIL:
            return {
                ...state,
                result: payload
            }

        case EDIT_DONOR_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case EDIT_DONOR_FAIL:
            return {
                ...state,
                result: payload
            }

        case DELETE_DONOR_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case DELETE_DONOR_FAIL:
            return {
                ...state,
                result: payload
            }
    default:
        return state;
    }
}