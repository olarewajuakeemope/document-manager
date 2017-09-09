import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as userActions from '../../src/actions/userActions';
import types from '../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  email: 'user@gmail.com',
  firstName: 'phil',
  lastName: 'eke',
  password: 'instance' 
};
describe('loadUser', () => {
  it('should create an action to load a user', () => {
    const users = {};
    const action = userActions.loadAllUsers(users);
    expect(action.type).to.equal(types.INIT_ALL_USERS);
  });
});
describe('Signup', () => {
  const response = {
    firstName: user.email,
    lastName: user.lastName,
    email: user.email,
    roleId: 2
  };
  after(() => {
    nock.cleanAll();
  });
  it('should signup a user', () => {
    nock('/api')
    .post('/users', user)
    .reply(201, response);

    const expectedActions = [
      { type: types.SIGNUP_USER },
      { type: types.SETUP_USER }
    ];
    const store = mockStore({ user: {} });
    store.dispatch(userActions.createUser(user));
    store.dispatch(userActions.setCurrentUser(user));
    expect(store.getActions()[0].type).to.eql(expectedActions[0].type);
    expect(store.getActions()[1].type).to.eql(expectedActions[1].type);
  });
});
describe('login', () => {
  const response = {
    firstName: user.email,
    lastName: user.lastName,
    email: user.email,
    roleId: 2
  };
  after(() => {
    nock.cleanAll();
  });
  it('should login a user', () => {
    nock('/api')
    .post('/users/login', user)
    .reply(201, response);

    const expectedActions = [
      { type: types.SETUP_USER }
    ];
    const store = mockStore({ user: {} });
    store.dispatch(userActions.setCurrentUser(user));
    expect(store.getActions()[0].type).to.eql(expectedActions[0].type);
  });
});
