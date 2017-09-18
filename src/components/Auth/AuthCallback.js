import React, { Component } from 'react'
import classnames from 'classnames'
const queryString = require('query-string')

const f = { credentials: 'same-origin' }

import './style.css'

export default class AuthCallback extends Component {
  async componentDidMount() {
    const parsed = queryString.parse(this.props.location.search)
    const url = new URL('/en-auth/callback', 'http://localhost:3000')
    const params = { oauth_verifier: parsed.oauth_verifier, oauth_token: parsed.oauth_token }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const response = await fetch(url, f)
    const success = await response.json()
    //window.location = loginPage
  }

  render() {
    return (
      <div className={classnames('Auth', this.props.className)}>
        Redirecting to Evernote Login...
      </div>
    );
  }
}
