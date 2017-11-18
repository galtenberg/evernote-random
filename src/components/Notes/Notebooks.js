import React, { Component } from 'react'

import Notebook from './Notebook'
import Note from './Note'

const isString = require('is-string')

const { fetchCred, j } = require('../../../config/config')

function secondsToHms(d) {
  d = Number(d)
  var h = Math.floor(d / 3600)
  var m = Math.floor(d % 3600 / 60)
  var s = Math.floor(d % 3600 % 60)

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : ""
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : ""
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : ""
  return hDisplay + mDisplay + sDisplay
}

export default class Notebooks extends Component {
  constructor() {
    super()
    this.state = {
      notebooks: 'Loading notebooks...',
      notebookGuid: null
    }
  }

  async componentDidMount() {
    var response, notebooks

    try {
      response = await fetch('/notebooks', fetchCred)
      if (response) { notebooks = await response.json() }
      if (notebooks) { this.setState({ notebooks: notebooks }) }
    } catch(err) {
      console.log(`Notebooks fetch error ${j(err)}, response ${j(response)}, notebooks ${j(notebooks)}`)
      this.setState({ notebooks: `Evernote has rate limited us. Try again in ${secondsToHms(notebooks.rateLimitDuration)}.` })
    }
  }

  notebookChanged = (notebookGuid) => {
    this.setState({ notebookGuid })
  }

  renderNotebooks = (notebooks) =>
    isString(notebooks) ?
      <span>{ notebooks }</span> :
      notebooks.map(notebook => this.renderNotebook(notebook))

  renderNotebook = (notebook) =>
    <Notebook
      name={notebook.name}
      key={notebook.name+notebook.guid}
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
