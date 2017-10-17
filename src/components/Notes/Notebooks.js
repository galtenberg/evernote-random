import React, { Component } from 'react'
//import classnames from 'classnames'
//import './style.css'

import Notebook from './Notebook'

const { fetchCred, rootUrl } = require('../../../config/config')

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

  async fetchNotes(guid) {
    const url = new URL('/notes', rootUrl)
    const params = { guid }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    console.log(`CG in fetchNotes, url = ${url}`)

    const response = await fetch(url, fetchCred)
    const notes = await response.json()
    if (notes) { this.setState({ notes: notes }) }
  }

  notebookChanged = (guid) => {
    this.setState({ notes: [] })
    this.fetchNotes(guid)
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
