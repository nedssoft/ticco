import React from 'react';
import { shallow } from 'enzyme'
import Button from './Button'

describe('Auth Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Button btnType='Submit'>Submit</Button>)
  })
 it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
 })
 
 it('should render Button component', () => {
  expect(wrapper.find('button')).toHaveLength(1)
 })
 it('simulate onClick handler', () => {
    const value = '2';
    const clickedFn = jest.fn();
    const wrapper = shallow(
      <Button clicked={clickedFn} btnType="Submit">Submit</Button>
    );
    expect(wrapper).toMatchSnapshot();
        wrapper.find('button').simulate('click', value
        );
    expect(clickedFn).toBeCalledWith(value);
});
})