import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { RoleTable } from
   '../../../src/components/admin/RoleManager/RoleTable';

const props = {
  tableHeaders: [],
  data: [],
  total: 8,
  limit: 2,
  actions: {}
};

const wrapper = shallow(<RoleTable {...props} />);
const componentWrapper = wrapper.unrendered.props;

describe('<RoleTable />', () => {
  it('should have props a prop called actions', () => {
    expect(componentWrapper.actions).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called data', () => {
    expect(componentWrapper.data).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called total', () => {
    expect(componentWrapper.total).to.not.be.undefined; // eslint-disable-line
  });
  it('should have props a prop called tableHeaders', () => {
    expect(componentWrapper.tableHeaders).to.not.be.undefined; // eslint-disable-line
  });
});
