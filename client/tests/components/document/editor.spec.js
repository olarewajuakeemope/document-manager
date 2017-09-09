import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { editor } from
   '../../../src/components/Documents/Editor';

const props = {
  actions: {},
  document: {
    access: 'public',
    id: 12,
    title: 'Practice',
    content: "I got fee from my momma's leash, hence i'm free",
    ownerId: 1,
    date: 'some date today',
  },
  editMode: true,
  user: {
    id: 1,
    firstName: 'Rowland',
    lastName: 'Ekpos',
    roleId: 1
  }
};

describe('<Editor />', () => {
  it('should have an editor component', () => {
    const wrapper = shallow(<editor {...props} />);
    expect(wrapper).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called actions', () => {
    const wrapper = shallow(<editor {...props} />);
    expect(wrapper.props().actions).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called editMode', () => {
    const wrapper = shallow(<editor {...props} />);
    expect(wrapper.props().editMode).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called access', () => {
    const wrapper = shallow(<editor {...props} />);
    expect(wrapper.props().document).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called user', () => {
    const wrapper = shallow(<editor {...props} />);
    expect(wrapper.props().user).to.not.be.undefined; // eslint-disable-line
  });
});