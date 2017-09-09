import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RoleManager from
   '../../../src/components/admin/RoleManager/RoleManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true, user: { firstName: 'Rowland' } },
  manageRoles: {
    roles: [1, 2, 3]
  }
});


const props = {
  store
};

const wrapper = shallow(<RoleManager {...props} />);
const componentWrapper = wrapper.node.props;

describe('<RoleManager />', () => {
  it('should have props a prop called saveRole', () => {
    expect(componentWrapper.saveRole).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called user', () => {
    expect(componentWrapper.user).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called roles', () => {
    expect(componentWrapper.roles).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called loadRoles', () => {
    expect(componentWrapper.loadRoles).to.not.be.undefined; // eslint-disable-line
  });
});
