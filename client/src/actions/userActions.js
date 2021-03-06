import axios from 'axios';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
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

/**
 * Async Function to handle user login
 * @export
 * @param {Object} user
 * @returns {Object} dispatch
 */
export function login(user) {
  return dispatch => axios.post('/api/users/login', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data));
      return browserHistory.push('/');
    }).catch((error) => {
      const errorStatus = error.request.status;
      if (errorStatus === 401) {
        return toastr.error('Invalid Password!');
      } else if (errorStatus === 404) {
        return toastr.error('User does not exist!');
      }
      return toastr.error('Invalid Login details!');
    });
}

/**
 * Function to handle logout
 * @export
 * @param {Object} user
 * @returns {Object} dispatch
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
/**
 * Function to dispatch action type of INIT_ALL_USERS
 * @export
 * @param {Object} users
 * @returns {Object} action
 */
export function loadAllUsers(users) {
  return {
    type: types.INIT_ALL_USERS,
    users
  };
}
/**
 * Async Function to handle loading of all users
 * @export
 * @param {Number} id
 * @returns {Object} dispatch
 */
export function initUsers() {
  return dispatch => axios.get('/api/users').then((res) => {
    dispatch(loadAllUsers(res.data.users));
  });
}
/**
 * Function to dispatch action type of EDIT_USER
 * @export
 * @param {Object} user
 * @returns {Object} action
 */
export function updateUser(user) {
  return {
    type: types.EDIT_USER,
    user
  };
}
/**
 * Async Function to handle updates of user details
 * @export
 * @param {Object} user
 * @param {Number} id
 * @returns {Object} dispatch
 */
export function editUser(user, id) {
  return dispatch => axios.put(`/api/users/${id}`, user).then((response) => {
    dispatch(updateUser(response.data));
    // dispatch(setCurrentUser(response.data));
  });
}
