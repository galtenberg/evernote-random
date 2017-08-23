// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class About extends Component {
  render() {
    return (
      <div className={classnames('About', this.props.className)}>
        <h1>
          React Router working!
        </h1>
      </div>
    );
  }
}
