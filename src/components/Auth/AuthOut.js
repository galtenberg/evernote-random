import React, { Component } from 'react'
import classnames from 'classnames'

const { fetchCred } = require('../../config/config')

// TODO: Make this class unnecessary, just allow proxy through to api auth/callback

export default class AuthOut extends Component {
  async componentDidMount() {
    const response = await fetch('/logout', fetchCred)
    await response.json()
    window.location = '/'
  }

  render() {
    return (
      <div className={classnames('Auth', this.props.className)}>
        Redirecting to home...
      </div>
    )
  }
}
