import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DocumentPanel } from '../../../src/components/Documents/DocumentPanel';

const props = {
  params: {},
  publicDocuments: [],
  privateDocuments: [],
  roleDocuments: [],
  user: {},
  isLoggedIn: false
};

const wrapper = shallow(<DocumentPanel {...props}/>);
const componentProps = wrapper.unrendered.props;

describe('<DocumentPanel/>', () => {
  it('should have props a prop called publicDocuments', () => {
    expect(componentProps.publicDocuments).to.not.be.undefined; // eslint-disable-line
  });

  it('should have props a prop called privateDocuments', () => {
    expect(componentProps.privateDocuments).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called roleDocuuments', () => {
    expect(componentProps.roleDocuments).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called params', () => {
    expect(componentProps.params).to.not.be.undefined; // eslint-disable-line
  });
  it('should render 3 divs', () => {
    expect(wrapper.find('div')).to.have.length(3); // eslint-disable-line
  });
});

