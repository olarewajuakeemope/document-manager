import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DocumentManager from
   '../../../src/components/admin/DocumentManager/DocumentManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true, user: { firstName: 'Rowland' } },
  manageDocuments: {
    documents: [1, 2, 3],
    documentDetails: false,
    editMode: false
  }
});


const props = {
  store
};

const wrapper = shallow(<DocumentManager {...props} />);
const componentWrapper = wrapper.node.props;

describe('<DocumentManager />', () => {
  it('should have props a prop called user', () => {
    expect(componentWrapper.user).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called docs', () => {
    expect(componentWrapper.loadAllDocument).to.not.be.undefined; // eslint-disable-line
  });
});
