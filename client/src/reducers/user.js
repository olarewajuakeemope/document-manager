import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * User Reducer Function that handles manageUsers part of the store
 * @export
 * @param {Object} [state=initialState.manageUsers]
 * @param {Object} action
 * @returns {Object} state
 */
export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
  case types.SIGNUP_USER:
    return Object.assign({}, ...state, { users: action.user });

  case types.LOGIN_USER:
    return Object.assign({}, ...state, { users: action.user });

  default:
    return state;
  }
}

