import {
    WHOLESALE_SUCCESS,
    WHOLESALE_FAIL,
    ADD_WHOLESALE_SUCCESS,
    ADD_WHOLESALE_FAIL,
    EDIT_WHOLESALE_SUCCESS,
    EDIT_WHOLESALE_FAIL,
    DELETE_WHOLESALE_SUCCESS,
    DELETE_WHOLESALE_FAIL,
    WHOLESALE_ID_SUCCESS,
    WHOLESALE_ID_FAIL
} from '../actions/types';

const initialState = { 
    whol: [],
    result: '',
    remainder: 0,
    isAuthenticated: null
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case WHOLESALE_SUCCESS:
            return {
                ...state,
                whol: payload
            }

        case WHOLESALE_FAIL:
            return {
                ...state,
                whol: []
            }

        case ADD_WHOLESALE_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case ADD_WHOLESALE_FAIL:
            return {
                ...state,
                result: payload
            }

        case EDIT_WHOLESALE_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case EDIT_WHOLESALE_FAIL:
            return {
                ...state,
                result: payload
            }

        case DELETE_WHOLESALE_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case DELETE_WHOLESALE_FAIL:
            return {
                ...state,
                result: payload
            }

        case WHOLESALE_ID_SUCCESS:
            return {
                ...state
            }
        
        case WHOLESALE_ID_FAIL:
            return {
                ...state
            }

    default:
        return state;
    }
}