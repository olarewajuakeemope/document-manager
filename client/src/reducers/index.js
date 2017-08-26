import { combineReducers } from 'redux';
import auth from './auth';
import manageUsers from './user';

const rootReducer = combineReducers({
  // Add all reducers here
  auth,
  manageUsers
});

export default rootReducer;
