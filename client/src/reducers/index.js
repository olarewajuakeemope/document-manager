import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  // Add all reducers here
  auth
});

export default rootReducer;
