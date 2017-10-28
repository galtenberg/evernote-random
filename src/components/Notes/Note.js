import React, { Component } from 'react'
import classnames from 'classnames'
import './style.css'

const enml = require('enml-js')
//const enml = require('enml2html')
import renderHTML from 'react-render-html'

const { fetchCred, rootUrl, j } = require('../../../config/config')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = { note: null, noteGuid: null, notebookGuid: props.notebookGuid }
  }

  componentWillReceiveProps(nextProps) {
    const note = nextProps.notebookGuid ?
      '<div>Loading...</div>' :
      '<div>Select a Notebook above.</div>'
    this.setState({ note, noteTitle: null, noteGuid: null, notebookGuid: nextProps.notebookGuid })
  }

  async fetchNote(guid) {
    if (!guid) { return null }

    const url = new URL('/notes', rootUrl)
    const params = { guid }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    var note;
    for (var i = 0; i < 3; i++) {
      const response = await fetch(url, fetchCred)
      note = await response.json()
      if (note && !note.errorCode) { break }
      await sleep(500)
    }

    if (note && note.errorCode && note.errorCode === 5) {
      note = { content: `<div>Evernote rate limit hit. Try again in a few seconds. ${j(guid)}</div>` }
    } else if (note && note.errorCode && note.errorCode === 404) {
      note = { content: '<div>No notes found.</div>' }
    }

    this.setState({
      note: note.content,
      noteTitle: note.title,
      noteGuid: note.guid,
      notebookGuid: null,
    })
  }

  noteLink() {
    if (!this.state.noteGuid) { return }
    const link = `https://sandbox.evernote.com/shard/s1/nl/605861/${this.state.noteGuid}`
    return <div className='openLink'>
      Open in:&nbsp;
      <a href={link} target='_blank'>
        Evernote Web
      </a>
      &nbsp;/&nbsp;
      <a href={link} target='_blank'>
        Evernote App
      </a>
    </div>
  }

  render() {
    this.fetchNote(this.state.notebookGuid)
    return (
      <div className={classnames('Note', this.props.className)}>
        { this.noteLink() }
        { this.state.noteTitle ? <div><b>{ this.state.noteTitle }</b><br/><br/></div> : null }
        { renderHTML(enml.HTMLOfENML(this.state.note)) }
      </div>
    )
  }
}
