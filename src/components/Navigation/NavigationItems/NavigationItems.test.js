import React from 'react';
import { shallow } from 'enzyme'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

describe('<NavigationItems', () => {
  it('should render three navigation items', ()=> {
    const component = shallow(
      <NavigationItems />
    );
    expect(component).toMatchSnapshot();
    expect(component.find(NavigationItem)).toHaveLength(3)
  })
})