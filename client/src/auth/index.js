import axios from 'axios';

export const isAuthenticated = () => {
  if (localStorage.getItem('jwtToken') !== null) {
    return true;
  }
  return false;
};

export const authenticate = (nextState, replace, callback) => {
  if (!isAuthenticated()) {
    replace('/login');
  }
  return callback();
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
