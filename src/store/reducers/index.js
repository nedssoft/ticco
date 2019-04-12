import { combineReducers } from "redux";

import authReducer from './auth'
import errorReducer from './errors'

const reducers = combineReducers({
  auth: authReducer,
  errors: errorReducer
})

export default reducers