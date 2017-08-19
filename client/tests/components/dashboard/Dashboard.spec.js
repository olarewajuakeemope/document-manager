import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import Dashboard from
   '../../../src/components/Dashboard';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Dashboard', () => {
  it('should be defined', () => {
    expect(Dashboard).to.not.equal(undefined);
  });
});