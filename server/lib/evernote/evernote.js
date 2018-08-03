'use strict'

const Evernote = require('evernote')
const enAuth = require('./auth')

const CacheService = require('../cache')

const ttl = 60 * 60 * 1 // cache length 1 hr
const cache = new CacheService(ttl)

const notebooksCacheKey = sessionUserId => `user${sessionUserId}-notebooks`

async function notebooks(token) {
  return cache.get(notebooksCacheKey(token), async () => fetchNotebooks(token))
}

async function fetchNotebooks(token) {
  const noteStore = enAuth.createAuthenticatedClient(token).getNoteStore()
  const notebooks = await noteStore.listNotebooks().then(result => result)

  const noteCounts = await noteStore
    .findNoteCounts(token, new Evernote.NoteStore.NoteFilter())
    .then(count => count['notebookCounts'])

  return notebooks
    .map(notebook => ({
      name: notebook.name,
      guid: notebook.guid,
      count: noteCounts[notebook.guid]
    }))
    .filter(notebook => notebook.count) // exclude empty notebooks
}

async function notebooksWithPara(token) {
  const notebooksSet = await notebooks(token)
  const paraNotebooks = notebooksSet.filter(n =>
    ['projects', 'areas', 'resources', 'archives'].includes(
      n.name.toLowerCase()
    )
  )
  const parNotebooks = notebooksSet.filter(n =>
    ['projects', 'areas', 'resources'].includes(n.name.toLowerCase())
  )
  return notebooksSet.concat([
    { name: 'Any PARA', guid: paraNotebooks.map(n => n.guid) },
    { name: 'Any PAR', guid: parNotebooks.map(n => n.guid) },
    { name: 'Any', guid: notebooksSet.map(n => n.guid) }
  ])
}

async function randomNotebook(token) {
  const notebooksSet = await notebooks(token)
  const randomNoteIndex = randomInt(0, notebooksSet.length - 1)
  return notebooksSet[randomNoteIndex]
}

async function randomNote(token, notebookGuid) {
  const client = enAuth.createAuthenticatedClient(token)
  const noteStore = client.getNoteStore()

  const filter = new Evernote.NoteStore.NoteFilter()

  filter.notebookGuid = notebookGuid.includes(',')
    ? randomElement(notebookGuid.split(','))
    : notebookGuid

  const noteCount = (await notebooks(token)).find(
    n => n.guid == filter.notebookGuid
  ).count

  const maxNotes = 50
  const offset = noteCount < maxNotes ? 0 : randomInt(0, noteCount - maxNotes)

  var spec = new Evernote.NoteStore.NotesMetadataResultSpec()
  spec['includeNotebookGuid'] = true

  const notesMetadata = await noteStore
    .findNotesMetadata(filter, offset, maxNotes, spec)
    .then(notesMetadata => notesMetadata)
    .catch(err => [])

  if (!notesMetadata.notes.length) {
    return new Promise(resolve => resolve({ errorCode: 404 }))
  }

  const noteGuids = notesMetadata.notes.map(n => n.guid)

  return noteStore
    .getNote(randomElement(noteGuids), true, true, true, true)
    .then(note => note)
    .catch(err => err)
}

exports.randomNotebook = randomNotebook
exports.randomNote = randomNote
exports.notebooksWithPara = notebooksWithPara
exports.notebooks = notebooks

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
const randomElement = array => array[randomInt(0, array.length - 1)]
