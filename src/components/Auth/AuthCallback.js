import React, { Component } from 'react'
import classnames from 'classnames'
const queryString = require('query-string')

const { fetchCred, rootUrl } = require('../../../config/config')

import './style.css'

// TODO: Make this class unnecessary, just allow proxy through to api auth/callback

export default class AuthCallback extends Component {
  async componentDidMount() {
    const parsed = queryString.parse(this.props.location.search)
    const url = new URL('/en-auth/callback', rootUrl)
    const params = { oauth_verifier: parsed.oauth_verifier, oauth_token: parsed.oauth_token }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await fetch(url, fetchCred)
    await response.json()
    window.location = '/'
  }

  render() {
    return (
      <div className={classnames('Auth', this.props.className)}>
        Redirecting to Evernote Solitaire...
      </div>
    )
  }
}
