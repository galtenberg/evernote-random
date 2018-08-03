import React, { Component } from 'react'
import classnames from 'classnames'

const { fetchCred } = require('../../config/config')

export default class Auth extends Component {
  async componentDidMount() {
    const response = await fetch('/en-auth/new', fetchCred)
    const loginPage = await response.json()
    window.location = loginPage
  }

  render() {
    return (
      <div className={classnames('Auth', this.props.className)}>
        <div className="Masthead">
          <div className="Container">
            <div className="f-childrenCenter">
              <div>
                <h2>Redirecting to Evernote Login…</h2>
                <p className="Masthead-note">
                  <a href="/">Click here</a> to go back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
