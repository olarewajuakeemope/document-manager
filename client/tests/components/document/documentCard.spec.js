import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DocumentCard } from
   '../../../src/components/Documents/DocumentCard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true,
    user: {
      id: 1,
      firstName: 'Rowland',
      lastName: 'Ekpos',
      roleId: 1
    } },
  manageDocuments: {
    documents: [{
      access: 'public'
    }, {
      access: 'private'
    }, {
      access: 'role'
    }, {
      access: 'public'
    }],
    documentDetails: false,
    editMode: false
  },
  manageSearch: {
    searchList: [1, 2, 3]
  }
});

const props = {
  title: 'title',
  id: 2,
  ownerId: 12,
  auth: {},
  actions: {},
  content: 'content',
  access: 'access',
  date: '10-10-07'
};

const wrapper = shallow(<DocumentCard {...props} />);
const componentProps = wrapper.unrendered.props;

describe('<DocumentCard />', () => {
  it('should have props a prop called auth', () => {
    expect(componentProps.auth).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called title', () => {
    expect(componentProps.title).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called id', () => {
    expect(componentProps.id).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called ownerId', () => {
    expect(componentProps.ownerId).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called actions', () => {
    expect(componentProps.actions).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called content', () => {
    expect(componentProps.content).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called access', () => {
    expect(componentProps.access).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called date', () => {
    expect(componentProps.date).to.not.be.undefined; // eslint-disable-line
  });
});