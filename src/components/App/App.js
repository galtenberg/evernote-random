import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './style.css';

const { fetchCred } = require('../../../config/config')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: 'unknown' }
  }

  async componentWillMount() {
    const response = await fetch('/isLoggedIn', fetchCred)
    this.setState({ loggedIn: await response.json() })
  }

  componentWillUnmount() {
    this.state = { loggedIn: 'unknown' }
  }

  async isLoggedIn() {
  }

  render() {
    return (
      <div className={classnames('App', this.props.className)}>
        <Link to='auth'><button>Login</button></Link>
        <Link to='authout'><button>Logout</button></Link>
        <div>Logged In {JSON.stringify(this.state.loggedIn)}</div>
        {/*<button onClick={this.props.actions.expressTest}>Test if Express is working (see console for result)</button>*/}
      </div>
    )
  }
}

export default App;
