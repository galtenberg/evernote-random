import React, { Component } from 'react';
import classnames from 'classnames';

const f = { credentials: 'same-origin' }

import './style.css';

export default class Auth extends Component {
  async componentDidMount() {
    const response = await fetch('/en-auth/new', f)
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
