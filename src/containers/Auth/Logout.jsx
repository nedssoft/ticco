import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  componentDidMount() {}

  render() {
    return (
      <Redirect to="/" />
    )
  }
}

export default Logout