const evernote = require('../lib/evernote/evernote');
var printObject = require('print-object');

async function notes(req, res) {

  const notebooks = await evernote.notebooks(req.session.accessToken)
  const notes = await evernote.notesMetadata(req.session.accessToken)

  res.render('notes', { notebooks: notebooks, notes: notes, token: req.session.accessToken})
}

exports.notes = notes;
