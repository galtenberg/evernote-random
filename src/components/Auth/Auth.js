import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class Auth extends Component {
  async componentDidMount() {
    console.log(`CG in componentDidMount`)
    const response = await fetch('/en-auth/new')
    //const response = await fetch('/api/redirect-me')
    console.log(`response: ${JSON.stringify(response)}`)
    //console.log(`responseJson: ${await response.json()}`)
    const loginPage = await response.json()
    console.log(`loginPage: ${loginPage}`)
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
