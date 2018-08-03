import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './style.css'

export default class Header extends Component {
  render() {
    const loginLink = this.props.loggedIn ? 'authout' : 'auth'
    const loginText = this.props.loggedIn ? 'Logout' : 'Login'

    return (
      <header className="Header" role="banner">
        <div className="f f-justifyBetween">
          <div className="App-logo f f-alignSelfCenter">
            {this.props.appName}
          </div>
          <div className="f Header-buttons">
            <div>
              <a href="#">
                <button>Play again</button>
              </a>
            </div>
            <div>
              <a onClick={this.props.notebooksToggle}>
                <button>Filter by notebook</button>
              </a>
            </div>
            <div>
              <a href="">
                <button>Instructions</button>
              </a>
            </div>
            <div>
              <Link to={loginLink}>
                <button>{loginText}</button>
              </Link>
            </div>
            {/* <div className="SaveInstructions">
            <div className="Container">
              <h2 className="Heading p-spacer">
                You're on a desktop Mac. Here's how you can save this page.
              </h2>
              <p>Instructions go here…</p>
            </div>
          </div> */}
          </div>
        </div>
      </header>
    )
  }
}
