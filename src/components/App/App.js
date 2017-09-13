import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './style.css';

class App extends Component {

  render() {
    return (
      <div className={classnames('App', this.props.className)}>
        <Link to='auth'><button>Login</button></Link>
        {/*<button onClick={this.props.actions.expressTest}>Test if Express is working (see console for result)</button>*/}
      </div>
    );
  }
}

export default App;
