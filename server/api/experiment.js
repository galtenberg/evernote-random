//const api = module.exports = require('express').Router()
const debug = require('debug')('cg');

module.exports = (api) => {
  //const notebooks = require('../api/notebooks');

  api.get('/express-test', (req, res) => res.send({express: 'working!'}))
  //api.use('/notebooks', notebooks)
  api.get('/notebooks', (req, res, next) => {
    var result = [
      { guid: "efa61084-ee95-4e47-a8d0-be81a4b1c658", name: "Notes" },
      { guid: "ca66549d-66f1-41eb-ae70-3e97a855851e", name: "Documents" },
      { guid: "a99142a2-94b4-49bd-8b0a-05fd593e3f75", name: "Web Clippings" },
    ]
    res.status(200).send(result)
  })

  api.get('/redirect-me', (req, res) => {
    res.json('http://cnn.com')
  })
}
