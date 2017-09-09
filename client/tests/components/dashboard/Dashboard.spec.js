import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Dashboard } from
   '../../../src/components/Dashboard';

const props = {
  loadAllDocument: () => {},
  params: {}
};

const wrapper = shallow(<Dashboard {...props} />);
const componentProps = wrapper.unrendered.props;

describe('<Dashboard />', () => {
  it('should have props a prop called loadAllDocument', () => {
    expect(componentProps.loadAllDocument).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called params', () => {
    expect(componentProps.params).to.not.be.undefined; // eslint-disable-line
  });
});
