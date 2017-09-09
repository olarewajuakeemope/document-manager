import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Form from '../../../src/components/authentication/Signup/Form';

const props = {
  signup: () => {}
};

const wrapper = shallow(<Form {...props}/>);

describe('<Form/>', () => {
  it('should have props a prop called signup', () => {
    expect(wrapper.unrendered.props.signup).to.not.be.undefined; // eslint-disable-line
  });
  it('should render four text input fields', () => {
    expect(wrapper.find('Input')).to.have.length(4); // eslint-disable-line
  });
  it('should render an input button', () => {
    expect(wrapper.find('Button')).to.have.length(1); // eslint-disable-line
  });
});
