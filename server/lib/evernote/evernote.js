'use strict'

const Evernote = require('evernote')
const enAuth = require('./auth')

async function notebooks(token) {
  const client = enAuth.createAuthenticatedClient(token)
  return await client.getNoteStore().listNotebooks()
}

async function notebooksWithPara(token) {
  const notebooksSet = await notebooks(token)
  const paraNotebooks = notebooksSet.filter(n => ['projects', 'areas', 'resources', 'archives'].includes(n.name.toLowerCase()))
  const parNotebooks = notebooksSet.filter(n => ['projects', 'areas', 'resources'].includes(n.name.toLowerCase()))
  return notebooksSet.concat([
    { name: 'Any PARA', guid: paraNotebooks.map(n => n.guid) },
    { name: 'Any PAR', guid: parNotebooks.map(n => n.guid) },
    { name: 'Any', guid: notebooksSet.map(n => n.guid) }
  ])
}

async function randomNotebook(token) {
  const notebooksSet = await notebooks(token)
  const randomNoteIndex = randomInt(0, notebooksSet.length-1)
  return notebooksSet[randomNoteIndex]
}

async function randomNote(token, notebookGuid) {
  const client = enAuth.createAuthenticatedClient(token)
  const noteStore = client.getNoteStore()

  const filter = new Evernote.NoteStore.NoteFilter()

  filter.notebookGuid = notebookGuid.includes(',') ?
    randomElement(notebookGuid.split(',')) :
    notebookGuid

  const noteCount = noteStore.findNoteCounts(token, filter)
  .then(count => count['notebookCounts'][filter.notebookGuid])
  .catch(err => err)

  const maxNotes = 50
  const offset = noteCount < maxNotes ? 0 : randomInt(0, noteCount-maxNotes)

  var spec = new Evernote.NoteStore.NotesMetadataResultSpec()
  spec['includeNotebookGuid'] = true

  const notesMetadata = await noteStore.findNotesMetadata(filter, offset, maxNotes, spec)
  .then(notesMetadata => notesMetadata)
  .catch(err => [])

  if (!notesMetadata.notes.length) {
    return new Promise((resolve) => resolve({ errorCode: 404 }))
  }

  const noteGuids = notesMetadata.notes.map(n => n.guid)

  return noteStore.getNote(randomElement(noteGuids), true, true, true, true)
  .then(note => note)
  .catch(err => err)
}

exports.randomNotebook = randomNotebook
exports.randomNote = randomNote
exports.notebooksWithPara = notebooksWithPara
exports.notebooks = notebooks

const randomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)
const randomElement = array => array[randomInt(0, array.length-1)]
