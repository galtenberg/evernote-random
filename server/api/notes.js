module.exports = (notes_routes) => {
  //notes_routes.get('/notebooks', (req, res) => {
    //var result = [
      //{ guid: "efa61084-ee95-4e47-a8d0-be81a4b1c658", name: "Notes" },
      //{ guid: "ca66549d-66f1-41eb-ae70-3e97a855851e", name: "Documents" },
      //{ guid: "a99142a2-94b4-49bd-8b0a-05fd593e3f75", name: "Web Clippings" },
    //]
    //res.status(200).json(result);
  //})

  const notes = require('../controllers/notes')
  notes_routes.get('/notebooks', notes.notebooks)
}
