import React, { Component } from 'react'
//import classnames from 'classnames'
//import './style.css'

import Notebook from './Notebook'

const { fetchCred } = require('../../../config/config')

export default class Notebooks extends Component {
  constructor() {
    super()
    this.state = {
      notebooks: [],
      notes: []
    }
  }

  async componentDidMount() {
    const response = await fetch('/notebooks', fetchCred)
    const notebooks = await response.json()
    if (notebooks) { this.setState({ notebooks: notebooks }) }
  }

  async fetchNotes() {
    const response = await fetch('/notes', fetchCred)
    const notes = await response.json()
    if (notes) { this.setState({ notes: notes }) }
  }

  notebookChanged = (guid) => {
    this.setState({ notes: [] })
    this.fetchNotes(); //console.log(`in notebookChanged ${guid}`)
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

  renderNotes = (notes) =>
    <div>{JSON.stringify(notes)}</div>

  render() {
    //const notebooks = this.state.notebooks || []
    //const notes = this.state.notes || []
    return (
      <div>
        <div>
          Choose a notebook:
          { this.renderNotebooks(this.state.notebooks) }
        </div>
        <hr/>
        { this.state.notes }
      </div>
    )
  }
}
