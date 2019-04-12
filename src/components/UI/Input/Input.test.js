import React from 'react'
import { shallow } from 'enzyme'
import Input from './Input'

describe('<Input />', () => {
  const props = {
      elementType: 'input',
        elementConfig: {
          placeholder: 'Password',
          id: 'password',
          type:'password'
        },
        value: '',
        label: 'Password',
        shouldValidate: true
    }
  let wrapper;
    beforeEach( ()=>{
      wrapper = shallow( <Input {...props} />)
    })
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should render input element', () =>{
    expect(wrapper.find('input')).toHaveLength(1)
  })

  it('should render select element', () => {
    const props = {
      elementType: 'select',
        elementConfig: {
          options: [
            {value: '', displayValue: 'Select...'},
            {value: 'test1', displayValue: 'Test1'},
            {value: 'test1', displayValue: 'Test2'},
          ],
          id: 'test'
        },
        value: 'test1',
        label: 'Test Select',
        validation: {},
        valid: true,
        changed: () => {}
    }
    wrapper = shallow(<Input {...props} />)
    expect(wrapper.find('option')).toHaveLength(3)
  })
  it('should render textarea', () => {
    const props = {
      elementType: 'textarea',
        elementConfig: {
          placeholder: 'Password',
          id: 'password',
          type:'password'
        },
        value: '',
        label: 'Password',
        shouldValidate: true,
        changed: () => {}
    }
    wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('textarea')).toHaveLength(1)
  })
})