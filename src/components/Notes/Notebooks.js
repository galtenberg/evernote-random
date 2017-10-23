import React, { Component } from 'react'

import Notebook from './Notebook'
import Note from './Note'

const { fetchCred } = require('../../../config/config')

export default class Notebooks extends Component {
  constructor() {
    super()
    this.state = {
      notebooks: [],
      notebookGuid: null
    }
  }

  async componentDidMount() {
    var response, notebooks

    response = await fetch('/notebooks', fetchCred)
    notebooks = await response.json()

    if (notebooks) { this.setState({ notebooks: notebooks }) }
  }

  notebookChanged = (notebookGuid) => {
    console.log("CG in Notebooks::notebookChanged")
    this.setState({ notebookGuid })
  }

  renderNotebooks = (notebooks) =>
    notebooks.map(notebook => this.renderNotebook(notebook))

  renderNotebook = (notebook) =>
    <Notebook
      name={notebook.name}
      key={notebook.guid}
      guid={notebook.guid}
      notebookChanged={this.notebookChanged}
    />

  render() {
    return (
      <div>
        <div>
          Choose a notebook:&nbsp;
          { this.renderNotebooks(this.state.notebooks) }
        </div>
        <hr/>
        <Note
          notebookGuid={this.state.notebookGuid}
        />
      </div>
    )
  }
}
