const config = require('../config/config')
const enAuth = require('../lib/evernote/en-auth')
const debug = require('debug')('cg')

exports.new = (req, res) => {
  enAuth.getRequestTokenObservable(`${config.rootUrl}/auth/callback`)
  .subscribe(([oauthToken, oauthTokenSecret, oauthUrl]) => {
    req.session.oauthToken = oauthToken;
    req.session.oauthTokenSecret = oauthTokenSecret;
    res.status(200).json(oauthUrl)
  }, (error) => {
    console.error(error);
    res.sendStatus(400);
  });
}

exports.callback = (req, res) => {
  debug("CG in callback")
  let oauthVerifier = req.query.oauth_verifier;
  if (!oauthVerifier) {
    res.sendStatus(400);
    return;
  }

  enAuth.getAccessTokenObservable(req.session.oauthToken, req.session.oauthTokenSecret, oauthVerifier)
  .subscribe((token) => {
    req.session.accessToken = token;
    res.redirect('/notes');
  }, (error) => {
    console.error(error);
    res.sendStatus(400);
  });
};

exports.logout = (req, res) => {
  req.session = null;
  res.redirect('/');
};
