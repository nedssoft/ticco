import 'babel-polyfill'
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import * as types from './types';
import * as authActions from './auth'
import { 
  registerUser,
  loginUser, 
  resetPassword,
  logoutUser
} from "." 


let mock = new MockAdapter(axios);
const mockStore = configureStore([thunk]);

const baseUrl = 'https://oriechinedu-politico.herokuapp.com/api/v1'
describe('auth actions', () => {
  it('has an action to show sign up request', () => {
    const expectedAction = {
      type: types.REGISTER_REQUEST
    }
    expect(authActions.registerRequest()).toEqual(expectedAction);
  })
  it('has an action to show sign up request succeeded', () => {
    const userData = {
      user: {
        email: 'test@test.com',
        password: 'password',
        isadmin: false,
        firstName: 'john',
        lastName: 'Doe',
        phone: '09087654323'
      },
      token: 'bunchOfRandomToken'
    }
    const expectedAction = {
      type: types.REGISTER_SUCCESS,
      userData,
    }
    expect(authActions.registerSuccess(userData)).toEqual(expectedAction);
  })
  it('has an action to show sign up request failed', () => {
    const payload = {
      error: 'Unknown error occurred',
    }
    const expectedAction = {
      type: types.REGISTER_FAILED,
      payload,
    }
    expect(authActions.registerFailed(payload)).toEqual(expectedAction);
  })

  it('has an action to show login request', () => {
    const expectedAction = {
      type: types.LOGIN_REQUEST
    }
    expect(authActions.loginRequest()).toEqual(expectedAction);
  })
  it('has an action to show login request succeeded', () => {
    const userData = {
      user: {
        email: 'test@test.com',
        password: 'password',
        isadmin: false,
      },
      token: 'bunchOfRandomToken'
    }
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      userData,
    }
    expect(authActions.loginSuccess(userData)).toEqual(expectedAction);
  })
  it('has an action to show sign up request failed', () => {
    const payload = {
      error: 'Unknown error occurred',
    }
    const expectedAction = {
      type: types.LOGIN_FAILED,
      payload,
    }
    expect(authActions.loginFailed(payload)).toEqual(expectedAction);
  })
})

describe('ASYNC actions', () => {
  afterEach(() => {
    mock.reset()
  })
  const userData = {
    user: {
      email: 'test@test.com',
      password: 'password',
      isadmin: false,
      firstName: 'john',
      lastName: 'Doe',
      phone: '09087654323'
    },
    token: 'bunchOfRandomToken'
  }
  it('should return expected actions when registration succeeds', async(done) => {
    const store = mockStore({token: null, user: null, isLoading: null, error: null})
    mock.onPost(`${baseUrl}/auth/signup`)
    .reply(200, {
      data: [userData]
    })
    const expectedActions = [
      {
        type: types.REGISTER_REQUEST,
      },
      {
        type: types.REGISTER_SUCCESS,
        userData,
      }
    ]
    await store.dispatch(registerUser(userData.user))
    expect(store.getActions()).toEqual(expectedActions)
    done()
  })

  it('should dispatch REGISTER_FAILED', async (done) => {
    const store = mockStore({token: null, user: null, isLoading: null, error: null})
    mock.onPost(`${baseUrl}/auth/signupp`)
    .reply(500, {
      data: {
        error: 'Internal server error'
      }
    })
    const expectedActions = [
      {
        type: types.REGISTER_REQUEST,
      },
      {
        type: types.REGISTER_FAILED,
        payload: 'Internal server error'
      }
    ]
    await store.dispatch(registerUser(userData.user))
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
    done()
  })

  it('should return expected actions when login succeeds', async(done) => {
    const store = mockStore({token: null, user: null, isLoading: null, error: null})
    mock.onPost(`${baseUrl}/auth/login`)
    .reply(200, {
      data: [userData]
    })
    const expectedActions = [
      {
        type: types.LOGIN_REQUEST,
      },
      {
        type: types.LOGIN_SUCCESS,
        userData,
      }
    ]
    await store.dispatch(loginUser({ email: userData.user.email, password: userData.user.password}))
    expect(store.getActions()).toEqual(expectedActions)
    done()
  })
  it('should dispatch LOGIN_FAILED', async (done) => {
    const store = mockStore({token: null, user: null, isLoading: null, error: null})
    mock.onPost(`${baseUrl}/auth/loginn`)
    .reply(500, {
      data: {
        error: 'Internal server error'
      }
    })
    const expectedActions = [
      {
        type: types.LOGIN_REQUEST,
      },
      {
        type: types.LOGIN_FAILED,
        payload: 'Internal server error'
      }
    ]
    await store.dispatch(loginUser({ email: userData.user.email, password: userData.user.password}))
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
    done()
  })
  it('should return expected actions when reset password succeeds', async(done) => {
    const store = mockStore({token: null, user: null, isLoading: null, error: null})
    mock.onPost(`${baseUrl}/auth/reset`)
    .reply(200, {
      data: 'Password reset successful'
    })
    const expectedActions = [
      {
        type: types.RESET_PASSWORD_REQUEST,
      },
      {
        type: types.RESET_PASSWORD_SUCCESS,
      }
    ]
    await store.dispatch(resetPassword({ email: userData.user.email}))
    expect(store.getActions()).toEqual(expectedActions)
    done()
  })
  it('should dispatch LOGIN_FAILED', async (done) => {
    const store = mockStore({token: null, user: null, isLoading: null, error: null})
    mock.onPost(`${baseUrl}/auth/resett`)
    .reply(500, {
      data: {
        error: 'Internal server error'
      }
    })
    const expectedActions = [
      {
        type: types.RESET_PASSWORD_REQUEST,
      },
      {
        type: types.RESET_PASSWORD_FAILED,
      }
    ]
    await store.dispatch(resetPassword({ email: userData.user.email}))
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
    done()
  })
 it('should disptach action of type LOGOUT', async (done) => {
    const store = mockStore({token: null, user: null, isLoading: null, error: null})
    await store.dispatch(logoutUser())
    expect(store.getActions()).toEqual([{type: types.LOGOUT}])
    done()
  })
})