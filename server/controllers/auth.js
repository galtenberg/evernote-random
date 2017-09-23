const { callbackUrl, debug, j } = require('../../config/config')
const enAuth = require('../lib/evernote/en-auth')

exports.new = (req, res) => {
  enAuth.getRequestTokenObservable(`${callbackUrl}`)
  .subscribe(([oauthToken, oauthTokenSecret, oauthUrl]) => {
    req.session.oauthToken = oauthToken
    req.session.oauthTokenSecret = oauthTokenSecret
    res.status(200).json(oauthUrl)
  }, (error) => {
    debug(`Error in auth new: ${j(error)}`)
    res.sendStatus(400)
  });
}

exports.callback = (req, res) => {
  let oauthVerifier = req.query.oauth_verifier;
  if (!oauthVerifier) {
    res.sendStatus(400)
    return
  }

  enAuth.getAccessTokenObservable(req.session.oauthToken, req.session.oauthTokenSecret, oauthVerifier)
  .subscribe((token) => {
    req.session.accessToken = token
    res.status(200).json(true)
  }, (error) => {
    res.sendStatus(400)
  })
}

exports.isLoggedIn = (req, res) => {
  // TODO Also check oauth and access tokens against Evernote API?
  res.status(200).json(!!(req.session && req.session.oauthToken))
}

exports.logout = (req, res) => {
  req.session = null
  res.status(200).json(true)
}
