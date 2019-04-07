import axios from 'axios'
import * as actionTypes from './types'
import { successFeedback, errorFeedback } from '../../helpers/FeedbackMessage'

const SIGN_UP_URL = 'https://oriechinedu-politico.herokuapp.com/api/v1/auth/signup'
const LOGIN_URL = 'https://oriechinedu-politico.herokuapp.com/api/v1/auth/login'
const PASSWORD_RESET_URL = 'https://oriechinedu-politico.herokuapp.com/api/v1/auth/reset'
export const registerRequest = () => {
  return {
    type: actionTypes.REGISTER_REQUEST,
  }
}

export const registerSuccess = (userData) => {
  localStorage.setItem('token', userData.token)
  localStorage.setItem('isAdmin', userData.user.isadmin)
  return {
    type: actionTypes.REGISTER_SUCCESS,
    userData: userData
  }
}

export const registerFailed = () => {
  return {
    type: actionTypes.REGISTER_FAILED,
  }
}
export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  }
}

export const loginSuccess = (userData) => {
  localStorage.setItem('token', userData.token)
  localStorage.setItem('isAdmin', userData.user.isadmin)
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userData: userData
  }
}

export const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
  }
}
export const passwordResetRequest = () => {
  return {
    type: actionTypes.RESET_PASSWORD_REQUEST,
  }
}

export const passwordResetSuccess = () => {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
  }
}

export const passwordResetFailed = () => {
  return {
    type: actionTypes.RESET_PASSWORD_FAILED,
  }
}
export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest())
  try {
    const res = await axios.post(SIGN_UP_URL, userData);
    const { data } = res.data
    if (data.length) {
      dispatch(registerSuccess(data[0]))
      successFeedback('Registration Successful')
    } else errorFeedback('unknown error occurred')
  } catch (err) {
    dispatch(registerFailed())
    errorFeedback(err.response.data.error)
  }
}
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest())
  try {
    const res = await axios.post(LOGIN_URL, userData);
    const { data } = res.data
    if (data.length) {
      dispatch(loginSuccess(data[0]))
      successFeedback('Login Successful')
    } else errorFeedback('unknown error occurred')
  } catch (err) {
    dispatch(loginFailed())
    errorFeedback(err.response.data.error)
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isAdmin')
  return {
    type: actionTypes.LOGOUT
  }
}
export const logoutUser = () => {
  return dispatch => {
    dispatch(logout())
  }
}

export const resetPassword = (userData) => async (dispatch) => {
  dispatch(passwordResetRequest())
  try {
    const res = await axios.post(PASSWORD_RESET_URL, userData)
    console.log(res.data)
    dispatch(passwordResetSuccess())
  } catch (err) {
    dispatch(passwordResetFailed())
    const message = err.response.data.error || 'Unknown error occurred'
    errorFeedback(message)
  }
}