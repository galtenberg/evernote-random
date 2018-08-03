import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './style.css'
import IconRandom from '../ui/IconRandom.js'
import IconFilter from '../ui/IconFilter.js'
import IconPerson from '../ui/IconPerson.js'
import IconInfo from '../ui/IconInfo.js'

export default class Header extends Component {
  render() {
    const loginLink = this.props.loggedIn ? 'authout' : 'auth'
    const loginText = this.props.loggedIn ? 'Logout' : 'Login'

    return (
      <header className="Header" role="banner">
        <div className="f f-justifyBetween">
          <div className="App-logo f f-alignSelfCenter">
            <a href="#">
              Randomnote
              <IconRandom />
            </a>
          </div>
          <div className="f Header-buttons">
            <div>
              <a onClick={this.props.notebooksToggle}>
                <button>
                  <IconFilter />Filter
                </button>
              </a>
            </div>
            {/*<div>
              <a href="">
                <button>
                  <IconInfo />Appify
                </button>
              </a>
            </div>
            */}
            <div>
              <Link to={loginLink}>
                <button>
                  <IconPerson />
                  {loginText}
                </button>
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
