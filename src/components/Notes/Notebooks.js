import React, { Component } from 'react'

import Notebook from './Notebook'
import Note from './Note'

const { fetchCred, j } = require('../../../config/config')

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

    try {
      response = await fetch('/notebooks', fetchCred)
      if (response) { notebooks = await response.json() }
      if (notebooks) { this.setState({ notebooks: notebooks }) }
    } catch(err) { console.log(`Notebooks fetch error ${j(err)}, response ${j(response)}, notebooks ${j(notebooks)}`) }
  }

  notebookChanged = (notebookGuid) => {
    this.setState({ notebookGuid })
  }

  renderNotebooks = (notebooks) =>
    notebooks.length ?
      notebooks.map(notebook => this.renderNotebook(notebook)) :
      <span>Locating notebooks... (or try to refresh)</span>

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
