import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import Navbar from '../../../src/components/Nav';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Navbar', () => {
  it('should be defined', () => {
    expect(Navbar).to.not.equal(undefined);
  });
});