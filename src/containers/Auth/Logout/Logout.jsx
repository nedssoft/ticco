import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../../store/actions'

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser()
  }
  render() {
    return (
      <Redirect to="/" />
    )
  }
}

export default connect(null, { logoutUser })(Logout)