import initialState from './initialState';
import types from '../actions/actionTypes';

export default (state = initialState.manageUsers, action = {}) => {
  switch (action.type) {
  case types.SETUP_USER:
    return {
      isLoggedIn: window.localStorage.getItem('jwtToken') !== null,
      user: action.user
    };
  default: return state;
  }
};
