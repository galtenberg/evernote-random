import React, { Component } from 'react'
//import classnames from 'classnames'
//import './style.css'

const { fetchCred, rootUrl } = require('../../../config/config')

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = { note: null, notebookGuid: props.notebookGuid }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ notebookGuid: nextProps.notebookGuid })
  }

  async fetchNote(guid) {
    if (!guid) { return null }

    const url = new URL('/notes', rootUrl)
    const params = { guid }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    console.log(`CG in fetchNote, url = ${url}`)

    const response = await fetch(url, fetchCred)
    this.setState({ note: await response.json(), notebookGuid: null })
  }

  render() {
    this.fetchNote(this.state.notebookGuid)
    return (
      <div>
        { JSON.stringify(this.state.note) }
      </div>
    )
  }
}
