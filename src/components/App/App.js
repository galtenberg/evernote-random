import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './style.css'

import Notebooks from '../Notes/Notebooks'

const { fetchCred, appName } = require('../../../config/config')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: false }
  }

  async componentWillMount() {
    const response = await fetch('/isLoggedIn', fetchCred)
    const userData = await response.json()
    this.setState({ loggedIn: userData.loggedIn })
  }

  componentWillUnmount() {
    this.setState({ loggedIn: false })
  }

  render() {
    var authButton, notebooks
    if (this.state.loggedIn) {
      authButton = (
        <Link to="authout">
          <button>Logout</button>
        </Link>
      )
      notebooks = <Notebooks />
    } else {
      authButton = (
        <Link to="auth">
          <button>Login</button>
        </Link>
      )
      notebooks = <div>Welcome. Login to see your notebooks.</div>
    }

    return (
      <div className={classnames('App', this.props.className)}>
        <header className="Header" role="banner">
          <div className="f f-justifyBetween">
            <div className="App-logo f f-alignSelfCenter">{appName}</div>
            <div className="f Header-buttons">
              <div>
                <a href="#">
                  <button>Play again</button>
                </a>
              </div>
              <div>
                <a href="">
                  <button>Filter by notebook</button>
                </a>
              </div>
              <div>
                <a href="">
                  <button>Instructions</button>
                </a>
              </div>
              <div>{authButton}</div>
            </div>
          </div>
        </header>
        {/* <div className="SaveInstructions">
          <div className="Container">
            <h2 className="Heading p-spacer">
              You're on a desktop Mac. Here's how you can save this page.
            </h2>
            <p>Instructions go here…</p>
          </div>
        </div> */}
        {notebooks}
        <footer className="Footer">
          A ForteLabs thing. Contributions welcome:{' '}
          <a href="https://github.com/galtenberg/evernote-random" target="_blank">
            Github
          </a>.
        </footer>
      </div>
    )
  }
}

export default App
