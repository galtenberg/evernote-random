'use strict'

const Evernote = require('evernote')
const enAuth = require('./auth')

async function notebooks(token) {
  const client = enAuth.createAuthenticatedClient(token)
  const notebooks = await client.getNoteStore().listNotebooks()
  return addParaNotebooks(notebooks)
}

function addParaNotebooks(notebooks) {
  const paraNotebooks = notebooks.filter(n => ['projects', 'areas', 'resources', 'archives'].includes(n.name.toLowerCase()))
  const parNotebooks = notebooks.filter(n => ['projects', 'areas', 'resources'].includes(n.name.toLowerCase()))
  return notebooks.concat([
    { name: 'Any PARA', guid: paraNotebooks.map(n => n.guid) },
    { name: 'Any PAR', guid: parNotebooks.map(n => n.guid) },
    { name: 'Any', guid: notebooks.map(n => n.guid) }
  ])
}

async function randomNotebook(token) {
  const notebooksSet = await notebooks(token)
  const randomNoteIndex = getRandomInt(0, [notebooksSet].length)
  return notebooksSet[randomNoteIndex]
}

async function randomNote(token, notebookGuid) {
  const client = enAuth.createAuthenticatedClient(token)
  const noteStore = client.getNoteStore()

  const filter = new Evernote.NoteStore.NoteFilter()

  filter.notebookGuid = notebookGuid.includes(',') ?
    getRandomElement(notebookGuid.split(',')) :
    notebookGuid

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

  return noteStore.getNote(getRandomElement(noteGuids), true, true, true, true)
  .then(note => note)
  .catch(err => err)
}

exports.randomNotebook = randomNotebook
exports.randomNote = randomNote
exports.notebooks = notebooks

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomElement = array => array[getRandomInt(0, array.length)]
