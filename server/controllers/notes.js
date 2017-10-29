const evernote = require('../lib/evernote/evernote')

async function notebooks(req, res) {
  try {
    const notebooks = await evernote.notebooks(req.session.accessToken)
    res.status(200).json(notebooks)
  } catch(err) {
    res.status(500).json(err)
  }
}

async function randomNote(req, res) {
  const randomNote = await evernote.randomNote(req.query.guid, req.session.accessToken)
  res.status(200).json({
    note: randomNote,
    edamUserId: req.session.edamUserId,
    edamShard: req.session.edamShard,
  })
}

exports.notebooks = notebooks
exports.randomNote = randomNote
