import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../../src/reducers/initialState';
import SignIn from
   '../../../src/components/authentication/Signin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: false },
  initialState
});


const props = {
  store
};

describe('<SignIn />', () => {
  it('should have props a prop called login', () => {
    const wrapper = shallow(<SignIn {...props} />);
    expect(wrapper.props().login).to.not.be.undefined; // eslint-disable-line
  });
  // it('should render two text inputs', () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <SignIn {...props} />
  //     </Provider>);
  //   expect(wrapper.find('Input')).to.have.length(2); // eslint-disable-line
  // });
});

