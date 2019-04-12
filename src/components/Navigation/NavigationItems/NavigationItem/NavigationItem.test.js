import React from 'react';
import { shallow } from 'enzyme'
import NavigationItem from './NavigationItem'

describe('Auth Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItem link='/' />)
  })
 it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
 })
 it('should render NavLink Component', () => {
  expect(wrapper.find('li')).toHaveLength(1)
 })

})