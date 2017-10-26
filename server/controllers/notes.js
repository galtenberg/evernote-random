const evernote = require('../lib/evernote/evernote')
//var printObject = require('print-object');
const debug = require('debug')('cg')

async function notebooks(req, res) {
  const notebooks = await evernote.notebooks(req.session.accessToken)
  res.status(200).json(notebooks)
}

async function notes(req, res) {
  const notes = await evernote.notesMetadata(req.query.guid, req.session.accessToken)
  res.status(200).json(notes)
}

exports.notebooks = notebooks
exports.notes = notes
