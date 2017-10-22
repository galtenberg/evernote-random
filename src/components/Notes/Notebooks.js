import React, { Component } from 'react'
//import classnames from 'classnames'
//import './style.css'

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
    //try {
    response = await fetch('/notebooks', fetchCred)
    notebooks = await response.json()
    //} catch (err) { console.log(err); return; }
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
    //const notebooks = this.state.notebooks || []
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
