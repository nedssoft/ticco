
import axios from '../../helpers/axios'
import * as actionTypes from './types'
import { successFeedback } from '../../helpers/FeedbackMessage'

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

export const registerFailed = (payload) => {
  return {
    type: actionTypes.REGISTER_FAILED,
    payload
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

export const loginFailed = (payload) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload
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

export const passwordResetFailed = (payload) => {
  return {
    type: actionTypes.RESET_PASSWORD_FAILED,
    payload
  }
}
export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest())
  try {
    const res = await axios.post('/auth/signup', userData);
    const { data } = res.data
    dispatch(registerSuccess(data[0]))
    successFeedback('Registration Successful')
  } catch (err) {
    dispatch(registerFailed(err.response.data))
  }
}
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest())
  try {
    const res = await axios.post('/auth/login', userData);
    const { data } = res.data
    dispatch(loginSuccess(data[0]))
    successFeedback('Login Successful')
  } catch (err) {
    dispatch(loginFailed(err.response.data))
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
    const res = await axios.post('/auth/reset', userData)
    if (res.data) dispatch(passwordResetSuccess())
  } catch (err) {
    dispatch(passwordResetFailed(err.response.data || {error: 'Unknown error occurred' }))
  }
}