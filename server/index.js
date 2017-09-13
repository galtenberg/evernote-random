const express = require('express')
const morgan = require('morgan')
//const debug = require('debug')('cg')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const path = require('path')

const app = express()

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// json parser
app.use(bodyParser.json())
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.use(cookieSession({
  name: 'session',
  secret: 'evernote-sandbox-secret',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 1 month
}))

//require('./api/experiment')(app)
require('./api/auth')(app)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
