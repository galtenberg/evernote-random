Provides a react client and express server implementation to fetch a random note from Evernote API.

## Remix on Glitch

1. Click Remix: [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/galtenberg/evernote-random)
2. Update files (TODO fix this):
  * `package.json` proxy should show `https://your-glitch-project-name.glitch.me`
  * `config/config.js` Urls show `https://your-glitch-project-name.glitch.me`
  * `src/config/config.js` Urls show `https://your-glitch-project-name.glitch.me`
  * `server/index.js` `static` and `sendFile` references should be uncommented
3. Set `key.env` values:
  * `evernoteKey` and `evernoteSecret` values to your API key
  * `HOST=your-glitch-project.glitch.me`
4. Open Glitch project Advanced Options -> Open Console:
  * `rm -rf build/`
  * `npm run build`
  * `refresh`
5. Click Show button on Glitch project

## To run locally:

1. On Glitch, under project name, Advanced Options -> Download Project or clone project from github.com/galtenberg/evernote-random
2. Obtain Evernote development API key
3. Change local files (TODO fix this):
  * `package.json` proxy should show `http://localhost:8000`
  * `config/config.js` Urls show `http://localhost:3000`
  * `src/config/config.js` Urls show `http://localhost:3000`
  * `server/index.js` `static` and `sendFile` references should be commented out
4. Run:
`$ evernoteKey=[your-key-name] evernoteSecret=[your-key-secret] npm run start`

You'll possibly want to use react-scripts 1.x outside of glitch (has too many dependencies / requires too much disk space on glitch).
