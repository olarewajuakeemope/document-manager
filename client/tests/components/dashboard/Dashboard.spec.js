import React from 'react';// eslint-disable-line
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Dashboard from
  '../../../src/components/Dashboard';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Dashboard', () => {
  it('should be defined', () => {
    expect(Dashboard).to.not.equal(undefined);
  });
});
