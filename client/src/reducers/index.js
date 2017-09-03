import { combineReducers } from 'redux';
import auth from './auth';
import manageDocuments from './document';
import manageRoles from './role';
import manageUsers from './user';

const rootReducer = combineReducers({
  // Add all reducers here
  auth,
  manageDocuments,
  manageRoles,
  manageUsers
});

export default rootReducer;
