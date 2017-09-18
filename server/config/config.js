const path = require('path')
const rootPath = path.normalize(__dirname + '/..')

module.exports = {
  root: rootPath,
  rootUrl: 'http://localhost:3000/auth/callback',
  callbackUrl: 'http://localhost:8000',
  app_name: process.env.APP_NAME,
}
