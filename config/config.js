const path = require('path')
const rootPath = path.normalize(__dirname + '/..')
const debug = require('debug')('rn')

module.exports = {
  root: rootPath,
  rootUrl: 'http://localhost:3000',
  callbackUrl: 'http://localhost:3000/auth/callback',
  app_name: process.env.APP_NAME,
  debug: debug,
  j: JSON.stringify,
  fetchCred: { credentials: 'same-origin' },
}
