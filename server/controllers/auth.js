const { callbackUrl, j } = require('../../config/config')
const enAuth = require('../lib/evernote/auth')

exports.new = (req, res) => {
  enAuth.getRequestTokenObservable(`${callbackUrl}`).subscribe(
    ([oauthToken, oauthTokenSecret, oauthUrl]) => {
      req.session.oauthToken = oauthToken
      req.session.oauthTokenSecret = oauthTokenSecret
      res.status(200).json(oauthUrl)
    },
    error => {
      res.sendStatus(400)
    }
  )
}

exports.callback = (req, res) => {
  let oauthVerifier = req.query.oauth_verifier

  if (!oauthVerifier) {
    res.sendStatus(400)
    return
  }

  enAuth
    .getAccessTokenObservable(
      req.session.oauthToken,
      req.session.oauthTokenSecret,
      oauthVerifier
    )
    .subscribe(
      ([token, results]) => {
        req.session.accessToken = token
        req.session.edamShard = results.edam_shard
        req.session.edamUserId = results.edam_userId
        res.status(200).json(true)
      },
      error => {
        res.sendStatus(400)
      }
    )
}

exports.isLoggedIn = (req, res) => {
  // TODO Also check oauth and access tokens against Evernote API? Or could get us rate limited.
  res.status(200).json({
    loggedIn: !!(req.session && req.session.oauthToken)
  })
}

exports.logout = (req, res) => {
  req.session = null
  res.status(200).json(true)
}
