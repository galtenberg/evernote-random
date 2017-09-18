module.exports = (app) => {
  const auth = require('../controllers/auth')

  app.get('/en-auth/new', auth.new)
  app.get('/en-auth/callback', auth.callback)

  app.get('/logout', auth.logout)
}
