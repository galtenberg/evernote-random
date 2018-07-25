module.exports = notes_routes => {
  const notes = require('../controllers/notes')
  notes_routes.get('/notebooks', notes.notebooks)
  notes_routes.get('/randomNote', notes.randomNote)
}
