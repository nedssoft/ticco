import * as actionTypes from '../actions/types'

const initialState = {
  token: null,
  user: null,
  isLoading: false,
  errors: null
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      }
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.userData.token,
        user: action.userData.user,
      }
      case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.userData.token,
        user: action.userData.user,
      }
    case actionTypes.RESET_PASSWORD_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.RESET_PASSWORD_FAILED:
    return {
      ...state,
      isLoading: false,
      errors: action.payload
    }
  case actionTypes.RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      isLoading: false,
    }
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null,
      }
    default:
      return state
  }
}

export default authReducer;