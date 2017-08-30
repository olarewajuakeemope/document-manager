import { combineReducers } from 'redux';
import auth from './auth';
import manageDocuments from './document';
import manageUsers from './user';

const rootReducer = combineReducers({
  // Add all reducers here
  auth,
  manageDocuments,
  manageUsers
});

export default rootReducer;
