import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './style.css'
import IconLogo from '../ui/IconLogo.js'
import IconRefresh from '../ui/IconRefresh.js'
import IconFilter from '../ui/IconFilter.js'
import IconPerson from '../ui/IconPerson.js'
import IconInfo from '../ui/IconInfo.js'

import Notebooks from '../Notes/Notebooks'

const { fetchCred, appName } = require('../../config/config')

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
    const linkTo = this.state.loggedIn ? 'authout' : 'auth'
    const linkButton = this.state.loggedIn ? 'Logout' : 'Login'
    const notebooks = this.state.loggedIn ? (
      <Notebooks />
    ) : (
      <div className="Masthead">
        <div className="Container">
          <div className="f-childrenCenter">
            <h2>
              Hello! <Link to={linkTo}>{linkButton}</Link> to see your
              Evernotes.
            </h2>
          </div>
        </div>
      </div>
    )

    return (
      <div className={classnames('App', this.props.className)}>
        <header className="Header" role="banner">
          <div className="f f-justifyBetween">
            <div className="App-logo f f-alignSelfCenter">
              <IconLogo />
            </div>
            <div className="f Header-buttons">
              <div>
                <a href="#">
                  <button>
                    <IconRefresh />Play
                  </button>
                </a>
              </div>
              <div>
                <a href="">
                  <button>
                    <IconFilter />Filter
                  </button>
                </a>
              </div>
              <div>
                <a href="">
                  <button>
                    <IconInfo />Appify
                  </button>
                </a>
              </div>
              <div>
                <Link to={linkTo}>
                  <button>
                    <IconPerson />
                    {linkButton}
                  </button>
                </Link>
              </div>
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
          A{' '}
          <a href="https://www.fortelabs.co/" target="_blank">
            ForteLabs
          </a>{' '}
          thing. Contributions welcome on{' '}
          <a
            href="https://github.com/galtenberg/evernote-random"
            target="_blank"
          >
            Github
          </a>.
        </footer>
      </div>
    )
  }
}

export default App
