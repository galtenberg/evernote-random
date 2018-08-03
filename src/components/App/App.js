import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './style.css'
import Header from './Header'
import Footer from './Footer'
import Notebooks from '../Notes/Notebooks'

const { fetchCred, appName } = require('../../config/config')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: false, notebooksActive: false }
  }

  async componentWillMount() {
    const response = await fetch('/isLoggedIn', fetchCred)
    const userData = await response.json()
    this.setState({ loggedIn: userData.loggedIn })
  }

  componentWillUnmount() {
    this.setState({ loggedIn: false })
  }

  notebooksToggle = () => {
    this.setState({ notebooksActive: !this.state.notebooksActive })
  }

  render() {
    return (
      <div className={classnames('App', this.props.className)}>
        <Header
          notebooksToggle={this.notebooksToggle}
          loggedIn={this.state.loggedIn}
          appName={this.props.appName}
        />
        <Notebooks
          loggedIn={this.state.loggedIn}
          notebooksActive={this.state.notebooksActive}
        />
        <Footer />
      </div>
    )
  }
}

export default App
