import React from 'react';
import { shallow } from 'enzyme'
import { SignIn } from './SignIn'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'

describe('Auth Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignIn />)
  })
 it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
 })
 it('should render form element', () => {
  expect(wrapper.find('form')).toHaveLength(1)
 })
 it('should render Button component', () => {
  expect(wrapper.find(Button)).toHaveLength(1)
 })
 it('should render Input component', () => {
  expect(wrapper.find(Input)).toHaveLength(2)
 })
})