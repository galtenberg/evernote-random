'use strict';

const Evernote = require('evernote')
const Rx = require('rxjs/Rx')
const secrets = require('../../../config/secrets')

function createClient() {
  return new Evernote.Client({
    consumerKey: secrets.evernoteKey, //process.env.EVERNOTE_KEY,
    consumerSecret: secrets.evernoteSecret, //process.env.EVERNOTE_SECRET,
    sandbox: secrets.sandbox, // change to false when you are ready to switch to production
    china: false, // change to true if you wish to connect to YXBJ - most of you won't
  })
}

function createAuthenticatedClient(token) {
  return new Evernote.Client({
    token: token,
    sandbox: secrets.sandbox,
    china: false,
  })
}

exports.createAuthenticatedClient = createAuthenticatedClient

exports.getRequestTokenObservable = (callbackUrl) => {
  let client = createClient()

  return Rx.Observable.create((observer) => {
    client.getRequestToken(callbackUrl, (error, oauthToken, oauthTokenSecret) => {
      if (error) {
        observer.error(error);
        return
      }
      observer.next([oauthToken, oauthTokenSecret, client.getAuthorizeUrl(oauthToken)])
      observer.complete()
    })
  })
}

exports.getAccessTokenObservable = (oauthToken, oauthTokenSecret, oauthVerifier) => {
  return Rx.Observable.create((observer) => {
    let client = createClient()
    client.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (error) {
        observer.error(error)
        return
      }
      observer.next([oauthAccessToken, results])
      observer.complete()
    })
  })
}

