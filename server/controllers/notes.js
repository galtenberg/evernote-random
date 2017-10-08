const evernote = require('../lib/evernote/evernote');
//var printObject = require('print-object');

//function notes(req, res) {
async function notebooks(req, res) {
  const notebooks = await evernote.notebooks(req.session.accessToken)
  //const notes = await evernote.notesMetadata(req.session.accessToken)

  //res.status(200).json(mockNotes());
  //res.render('notes', { notebooks: notebooks, notes: notes, token: req.session.accessToken})
  res.status(200).json(notebooks);
}

function mockNotes() {
  return [
    { guid: "efa61084-ee95-4e47-a8d0-be81a4b1c658", name: "Notes" },
    { guid: "ca66549d-66f1-41eb-ae70-3e97a855851e", name: "Documents" },
    { guid: "a99142a2-94b4-49bd-8b0a-05fd593e3f75", name: "Web Clippings" },
  ]
}

exports.notebooks = notebooks;
