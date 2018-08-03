import React, { Component } from 'react'

const { fetchCred, rootUrl, j } = require('../../config/config')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class RandomApp extends Component {
  async componentDidMount() {
    var response, note

    try {
      const url = new URL('/randomNote', rootUrl)
      for (var i = 0; i < 3; i++) {
        response = await fetch(url, fetchCred)
        note = await response.json()
        if (
          note &&
          note.note &&
          (!note.note.errorCode || note.note.errorCode === 404)
        ) {
          break
        }
        await sleep(100)
      }

      if (note) {
        const appLink = `evernote:///view/${note.edamUserId}/${
          note.edamShard
        }/${note.note.guid}/${note.note.guid}/`
        window.location = appLink
      }
    } catch (err) {
      console.log(
        `Random Note fetch error ${j(err)}, response ${j(response)}, note ${j(
          note
        )}`
      )
      window.location = '/'
    }
  }

  render() {
    return (
      <div>
        Redirecting to Evernote app...
        <br />
        <br />
        <hr />
        <br />
        Click <a href="/">here</a> to go home.
      </div>
    )
  }
}
