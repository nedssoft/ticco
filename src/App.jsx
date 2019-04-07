import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import styles from './App.css'
import Layout from './components/Layout/Layout'
import LandingPage from './containers/LandingPage/LandingPage'
import SignUp from './containers/Auth/SignUp'
import SignIn from './containers/Auth/SignIn'
import PasswordReset from './containers/Auth/PasswordReset'
import Logout from './containers/Auth/Logout'

class App extends Component {
  render()  {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/password-reset" exact component={PasswordReset} />
            <Route path="/logout" exact component={Logout} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;

