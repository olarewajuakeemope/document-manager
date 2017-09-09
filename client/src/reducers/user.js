import types from '../actions/actionTypes';
import initialState from './initialState';

let newState;

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

  case types.INIT_ALL_USERS:
    return Object.assign({}, ...state, {
      allUsers: action.users });

  case types.DELETE_USER:
    newState = state;
    newState.allUsers = [...state.allUsers].filter(
      user => user.id !== action.id
    );
    return newState;

  default:
    return state;
  }
}

