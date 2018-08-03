import React, { Component } from 'react'
import classnames from 'classnames'
import renderHTML from 'react-render-html'
import './style.css'

const enml = require('enml-js')
const enml2html = require('../../lib/enml2html') // require('enml2html')

const { fetchCred, rootUrl } = require('../../config/config')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: null,
      noteGuid: null,
      notebookGuid: props.notebookGuid
    }
  }

  componentWillReceiveProps(nextProps) {
    const note = nextProps.notebookGuid
      ? "<div className='Note-heading'>Loading...</div>"
      : "<div className='Note-heading'>Select a Notebook above.</div>"
    this.setState({
      note,
      noteTitle: null,
      noteGuid: null,
      notebookGuid: nextProps.notebookGuid
    })
  }

  async fetchNote(notebookGuid) {
    if (!notebookGuid) {
      return null
    }

    const guid = notebookGuid || ''
    const url = new URL('/randomNote', rootUrl)
    const params = { guid }
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    )

    var note
    for (var i = 0; i < 3; i++) {
      const response = await fetch(url, fetchCred)
      note = await response.json()
      if (
        note &&
        note.note &&
        (!note.note.errorCode || note.note.errorCode === 404)
      ) {
        break
      }
      await sleep(500)
    }

    if (note && note.note && note.note.errorCode && note.note.errorCode === 5) {
      note = {
        note: {
          content: `<div className='Note-heading'>Evernote rate limit hit. Try again in a few seconds.</div>`
        }
      }
    } else if (
      note &&
      note.note &&
      note.note.errorCode &&
      note.note.errorCode === 404
    ) {
      note = {
        note: {
          content: "<div className='Note-heading'>No notes found.</div>"
        }
      }
    }

    this.setState({
      note: note.note.content,
      noteTitle: note.note.title,
      noteGuid: note.note.guid,
      noteResources: note.note.resources,
      edamUserId: note.edamUserId,
      edamShard: note.edamShard,
      notebookGuid: null
    })
  }

  noteLink() {
    if (!this.state.noteGuid) {
      return
    }
    const link = `https://www.evernote.com/shard/${this.state.edamShard}/nl/${
      this.state.edamUserId
    }/${this.state.noteGuid}`
    const appLink = `evernote:///view/${this.state.edamUserId}/${
      this.state.edamShard
    }/${this.state.noteGuid}/${this.state.noteGuid}/`
    return (
      <div className="Note-openLink">
        <a
          href={link}
          className="Button Button--reverse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Evernote Web
        </a>
        <a
          href={appLink}
          className="Button Button--reverse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Evernote App
        </a>
      </div>
    )
  }

  noteHtml() {
    if (this.state.noteResources) {
      return renderHTML(
        enml2html(
          this.state.note,
          this.state.noteResources,
          `https://www.evernote.com/shard/${this.state.edamShard}/nl/${
            this.state.edamUserId
          }/${this.state.noteGuid}`,
          this.state.noteGuid
        )
      )
    } else {
      return renderHTML(enml.HTMLOfENML(this.state.note))
    }
  }

  render() {
    this.fetchNote(this.state.notebookGuid)
    return (
      <div className={classnames('Note', this.props.className)}>
        {this.noteLink()}
        {this.state.noteTitle ? (
          <h2 className="Note-heading">{this.state.noteTitle}</h2>
        ) : null}
        <div className="Note-inner">{this.noteHtml()}</div>
      </div>
    )
  }
}
