import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Auth.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { checkValidity } from '../../helpers/helper'
import { successFeedback, errorFeedback } from '../../helpers/FeedbackMessage'
import { registerUser } from '../../store/actions'

class SignUp extends Component {
  state = {
    controls: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your First Name',
          id: 'firstName',
          type:'text'
        },
        value: '',
        label: 'First Name',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Last Name',
          id: 'lastName',
          type:'text'
        },
        value: '',
        label: 'Last Name',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true
      },
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
      phone:{
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Phone Number',
          id: 'phone',
          type:'tel'
        },
        value: '',
        label: 'Phone',
        validation: {
          required: true,
          minLength: 11
        },
        valid: false,
        shouldValidate: true
      },
      password:{
        elementType: 'input',
        elementConfig: {
          placeholder: 'Password',
          id: 'password',
          type:'password'
        },
        value: '',
        label: 'Password',
        validation: {
          required: true,
          minLength: 6
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
      errorFeedback('Fix the errors indicated')
      return false
    }
    const userData = this.extractFormData(controls)
    this.props.registerUser(userData)
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
            <Button disabled={!formIsValid} btnType="Submit">Sign Up</Button>
          </form>
          <Link to="/signin"> Already Registered? Sign in</Link>
        </div>
      </div>
)
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.token !== null || localStorage.getItem('token')
  }
}
export default connect(mapStateToProps, { registerUser})(SignUp)
