import React from 'react';
import { shallow } from 'enzyme'
import { SignUp } from './SignUp'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'

describe('Auth Components', () => {
 it('should render sign up page', () => {
  const wrapper = shallow(<SignUp />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find(Input)).toHaveLength(5)
 })
})