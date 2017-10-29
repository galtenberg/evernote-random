'use strict'

const Evernote = require('evernote')
const enAuth = require('./auth')

exports.notebooks = (token) => {
  const client = enAuth.createAuthenticatedClient(token)
  return client.getNoteStore().listNotebooks()
}

async function randomNote(notebookGuid, token) {
  const client = enAuth.createAuthenticatedClient(token)
  const noteStore = client.getNoteStore()

  const filter = new Evernote.NoteStore.NoteFilter()
  filter.notebookGuid = notebookGuid

  const noteCount = noteStore.findNoteCounts(token, filter)
  .then(count => count['notebookCounts'][filter.notebookGuid])
  .catch(err => err)

  const maxNotes = 50
  const offset = noteCount < maxNotes ? 0 : getRandomInt(0, noteCount-maxNotes)

  var spec = new Evernote.NoteStore.NotesMetadataResultSpec()
  spec['includeNotebookGuid'] = true

  const notesMetadata = await noteStore.findNotesMetadata(filter, offset, maxNotes, spec)
  .then(notesMetadata => notesMetadata)
  .catch(err => [])

  if (!notesMetadata.notes.length) {
    return new Promise((resolve) => resolve({ errorCode: 404 }))
  }

  const noteGuids = notesMetadata.notes.map(n => n.guid)
  const randomNoteIndex = getRandomInt(0, noteGuids.length)

  return noteStore.getNote(noteGuids[randomNoteIndex], true, true, true, true)
  .then(note => note)
  .catch(err => err)
}

exports.randomNote = randomNote

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
