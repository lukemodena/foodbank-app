import { combineReducers } from 'redux';
import auth from './auth';
import donors from './donors';
import collections from './collections';


export default combineReducers({
    auth,
    donors,
    collections
});