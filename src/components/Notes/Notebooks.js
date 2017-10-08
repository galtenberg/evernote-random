import React, { Component } from 'react'
import classnames from 'classnames'

const { fetchCred } = require('../../../config/config')

import './style.css'

export default class Notebooks extends Component {
  constructor() {
    super()
    this.state = { notebooksLen: 0 }
  }

  //componentDidMount() {
    //const response = await fetch('/logout', fetchCred)
    //await response.json()
  //}

  render() {
    return (
      <div>
        { this.state.notebooksLen }
      </div>
    )
  }
}
