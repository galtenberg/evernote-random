const api = module.exports = require('express').Router()
const products = require('./products');
const reviews = require('./reviews');

api
  .get('/express-test', (req, res) => res.send({express: 'working!'}))
  .use('/products', products)
  .use('/reviews', reviews)

api.use((req, res) => res.status(404).end())
