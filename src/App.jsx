import React, { Component } from 'react'
import styles from './App.css'
import Layout from './components/Layout/Layout'
import LandingPage from './containers/LandingPage'

class App extends Component {
  render()  {
    return (
      <div>
        <Layout>
          <LandingPage />
        </Layout>
      </div>
    )
  }
}

export default App;

