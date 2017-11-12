import React, { Component } from 'react'
import classnames from 'classnames'

const { fetchCred } = require('../../../config/config')

import './style.css'

export default class Auth extends Component {
  async componentDidMount() {
    const response = await fetch('/en-auth/new', fetchCred)
    const loginPage = await response.json()
    window.location = loginPage
  }

  render() {
    return (
      <div className={classnames('Auth', this.props.className)}>
        Redirecting to Evernote Login...
      </div>
    );
  }
}
