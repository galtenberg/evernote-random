import React, { Component } from 'react'
import classnames from 'classnames'
import './style.css'

const enml = require('enml-js')
import renderHTML from 'react-render-html'

const { fetchCred, rootUrl, j } = require('../../../config/config')

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = { note: null, noteGuid: null, notebookGuid: props.notebookGuid }
  }

  componentWillReceiveProps(nextProps) {
    const note = nextProps.notebookGuid ?
      '<div>Loading...</div>' :
      '<div>Select a Notebook above.</div>'
    this.setState({ note, noteGuid: null, notebookGuid: nextProps.notebookGuid })
  }

  async fetchNote(guid) {
    if (!guid) { return null }

    const url = new URL('/notes', rootUrl)
    const params = { guid }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await fetch(url, fetchCred)
    var note = await response.json()
    console.log(`CG response.json = ${j(note)}`)

    if (note && note.errorCode) {
      note = { content: '<div>Evernote rate limit hit. Try again in a few seconds.</div>' }
    }

    this.setState({ note: note.content, noteGuid: note.guid, notebookGuid: null })
  }

  noteLink() {
    if (!this.state.noteGuid) { return }
    const link = `https://sandbox.evernote.com/shard/s1/nl/605861/${this.state.noteGuid}`
    return <div className='openLink'>
      <a href={link} target='_blank'>
        Open in Evernote Web
      </a>
    </div>
  }

  render() {
    this.fetchNote(this.state.notebookGuid)
    return (
      <div className={classnames('Note', this.props.className)}>
        { this.noteLink() }
        { renderHTML(enml.HTMLOfENML(this.state.note)) }
      </div>
    )
  }
}
