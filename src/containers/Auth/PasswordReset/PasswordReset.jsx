import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../Auth.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import { checkValidity, extractFormData } from '../../../helpers/helper'
import { resetPassword } from '../../../store/actions'
import { errorFeedback } from '../../../helpers/FeedbackMessage'

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      errorFeedback(nextProps.errors.error)
    }
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
    this.props.resetPassword(userData)
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
        { this.props.isLoading ? <Spinner /> : ''}
        <div className={styles.Auth}>
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
const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    errors: state.auth.errors
  }
}
export default connect(mapStateToProps, { resetPassword })(SignIn)
