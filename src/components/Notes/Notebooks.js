import React, { Component } from 'react'
//import classnames from 'classnames'
//import './style.css'

import Notebook from './Notebook'

const { fetchCred, j } = require('../../../config/config')

export default class Notebooks extends Component {
  constructor() {
    super()
    this.state = { notebooks: 0 }
  }

  async componentDidMount() {
    const response = await fetch('/notebooks', fetchCred)
    const notebooks = await response.json()
    if (notebooks) { this.setState({ notebooks: notebooks }) }
  }

  renderNotebook = (notebook) =>
    <Notebook
      name={notebook.name}
      guid={notebook.guid}
    />

  renderNotebooks = (notebooks) =>
    notebooks.map(notebook => this.renderNotebook(notebook))

  render() {
    const notebooks = this.state.notebooks || []
    return (
      <div>
        { this.renderNotebooks(notebooks) }
      </div>
    )
  }
}
