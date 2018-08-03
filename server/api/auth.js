module.exports = auth_routes => {
  const auth = require('../controllers/auth')

  auth_routes.get('/en-auth/new', auth.new)
  auth_routes.get('/en-auth/callback', auth.callback)

  auth_routes.get('/isLoggedIn', auth.isLoggedIn)
  auth_routes.get('/logout', auth.logout)
}
