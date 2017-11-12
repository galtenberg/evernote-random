const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const path = require('path')
const csp = require('helmet-csp')

const app = express()

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// json parser
app.use(bodyParser.json())
// Serve static assets
//app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Re-enable on glitch.com
// Always return the main index.html, so react-router render the route in the client
//app.get(['/', '/auth*', '/randomInApp', '/random-in-app'], (req, res) => {
  //res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
//})

app.use(cookieSession({
  name: 'evernoteSolitaire',
  secret: 'evernote-sandbox-secret',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 1 month
}))

require('./api/auth')(app)
require('./api/notes')(app)

app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}))

app.post('/report-violation', function (req, res) {
  if (req.body) {
    console.log('CSP Violation: ', req.body)
  } else {
    console.log('CSP Violation: No data received!')
  }
  res.status(204).end()
})

const PORT = 8000 //process.env.PORT || 8000

app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'unsafe-inline'"],
    styleSrc: ["'unsafe-inline'"],
    reportUri: '/report-violation',
    upgradeInsecureRequests: true
  },
  reportOnly: false,
  loose: true,
  setAllHeaders: true,
  browserSniff: false
}))

app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`)
})
