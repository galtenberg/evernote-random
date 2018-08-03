const path = require('path')
const rootPath = path.normalize(__dirname + '/..')
const debug = require('debug')('rn')

module.exports = {
  root: rootPath,
  //rootUrl: 'https://evernote-random.glitch.me',
  //callbackUrl: 'https://evernote-random.glitch.me/auth/callback',
  rootUrl: 'http://localhost:3000',
  callbackUrl: 'http://localhost:3000/auth/callback',
  appName: 'RandomNote',
  debug: debug,
  j: JSON.stringify,
  fetchCred: { credentials: 'same-origin' }
}
