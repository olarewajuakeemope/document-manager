import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

import 'material-ui';
import 'materialize-css'; //eslint-disable-line
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize'; //eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';

import { setAuthorizationToken } from './auth/';
import { setCurrentUser } from './actions/userActions';

import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  axios.defaults.headers.common.Authorization = localStorage.jwtToken;
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <MuiThemeProvider >
    <Provider store={store} >
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider >,
  document.getElementById('root')
);
