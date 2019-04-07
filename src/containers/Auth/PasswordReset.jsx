import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { checkValidity } from '../../helper'

class SignIn extends Component {
  state = {
    controls: {
      email:{
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your E-mail',
          id: 'email',
          type:'email'
        },
        value: '',
        label: 'Email',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        shouldValidate: true
      },
    },
    formIsValid: false
  }
  inputChangeHandler = (event, inputId) => {
    const { controls } = this.state
    const updatedControls = { ...controls }
    const updatedElement = { ...updatedControls[inputId]}
    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    updatedElement.valid = checkValidity(updatedElement.value , updatedElement.validation);
    updatedControls[inputId] = updatedElement;

    let formIsValid = true;
    for (let key in updatedControls) {
      formIsValid = updatedControls[key].valid && formIsValid
    }
    this.setState({controls: updatedControls, formIsValid});
  }
  
  submitHandler = (event) => {
    event.preventDefault()
    const { controls, formIsValid } = this.state;
    if(!formIsValid) {
      return false
    }
    const userData = this.extractFormData(controls)
    console.log(userData)
  }
  extractFormData = (data) => {
    let formData = {}
    for (let key in data) {
      formData[key] = data[key].value;
    }
    return formData;
  }
  render() {
    const { controls, formIsValid } = this.state
    let formElementArr = [];
    for (let key in controls) {
      formElementArr.push({
        id: key,
        config: controls[key]
      });
    }
    return  (
      <div className={styles.Container}>
        <div className={styles.Auth}>
          { this.props.isLoading ? <Spinner /> : ''}
          <form onSubmit={this.submitHandler}>
            { formElementArr.map(element => {
          return (
            <Input 
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              label={element.config.label}
              key={element.id}
              valid={element.config.valid}
              shouldValidate={element.config.shouldValidate}
              touched={element.config.touched}
              changed={(event) => this.inputChangeHandler(event, element.id)}
            />
          )
        })}
            <Button disabled={!formIsValid} btnType="Submit">Reset Link</Button>
          </form>
        </div>
      </div>
)
  }
}

export default SignIn
