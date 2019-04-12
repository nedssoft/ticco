import React from 'react';
import { shallow } from 'enzyme'
import LandingPage from './LandingPage'

describe('Landing Page', () => {
  it('should render correctly', () => {
    const component = shallow(<LandingPage />);
    expect(component).toMatchSnapshot();
  });
});