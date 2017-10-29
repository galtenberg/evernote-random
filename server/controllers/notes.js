const evernote = require('../lib/evernote/evernote')
const debug = require('debug')('cg')

async function notebooks(req, res) {
  try {
    const notebooks = await evernote.notebooks(req.session.accessToken)
    res.status(200).json(notebooks)
  } catch(err) {
    debug(`Error in controllers/notes::notebooks, err: ${JSON.stringify(err)}`)
    res.status(500).json(err)
  }
}

async function notes(req, res) {
  const notes = await evernote.notes(req.query.guid, req.session.accessToken)
  res.status(200).json(notes)
}

exports.notebooks = notebooks
exports.notes = notes
