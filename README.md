[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/galtenberg/evernote-react-express)

Example application created from [create-react-app-fullstack](https://github.com/ekatzenstein/create-react-app-fullstack), minus postgresql.

You'll probably want to use react-scripts 1.x outside of glitch (has too many dependencies / requires too much disk space on glitch).

## To run locally:

1. Obtain Evernote development API key.
2. Change local files (TODO fix this)
  * `package.json` proxy should show `http://localhost:8000`
  * `config/config.js` Urls show `http://localhost:3000`
  * `server/index.js` `static` and `sendFile` references should be commented out

$ evernoteKey=[your-key-name] evernoteSecret=[your-key-secret] npm run start

## To run on glitch:

1. Click Remix button
2. Update files (TODO fix this)
  * `package.json` proxy should show `https://your-glitch-project-name.glitch.me`
  * `config/config.js` Urls show `https://your-glitch-project-name.glitch.me`
  * `server/index.js` `static` and `sendFile` references should be uncommented
3. Set `key.env` `evernoteKey` and `evernoteSecret` values to your API key
