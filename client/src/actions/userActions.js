import axios from 'axios';
import types from './actionTypes';
import { setAuthorizationToken } from '../auth';

/**
 * Function to dispatch action type of SIGNUP_USER
 * @export
 * @param {Object} user
 * @returns {Object} action
 */
export function createUser(user) {
  return { type: types.SIGNUP_USER, user };
}
/**
 * Function to dispatch action type of SETUP_USER
 * @export
 * @param {Object} user
 * @returns {Object} action
 */
export function setCurrentUser(user) {
  return {
    type: types.SETUP_USER,
    user
  };
}
/**
 * Async Function to handle signup request
 * @export
 * @param {Object} user
 * @returns {Object} dispatch
 */
export function signup(user) {
  return dispatch => axios.post('/api/users', user)
    .then((res) => {
      const token = res.data.token;
      dispatch(createUser(res.data));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(res.data));
    });
}

