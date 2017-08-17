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
