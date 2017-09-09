import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Signup from
   '../../../src/components/authentication/Signup/Signup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true, user: { firstName: 'Rowland' } },
});


const props = {
  store
};
describe('<Signup />', () => {
  it('should have props a prop called actions', () => {
    const wrapper = shallow(<Signup {...props} />);
    expect(wrapper.props().actions).to.not.be.undefined; // eslint-disable-line
  });
});
