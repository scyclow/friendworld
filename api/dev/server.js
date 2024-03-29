'use strict';

require('pretty-error').start()

const http = require('http')
const app = require('../src')
const config = require('../src/config.ts').default

let currentApp = app.default

const server = http.createServer(currentApp)
server.listen(config.PORT, app.onServe)

if (module.hot) {
  module.hot.accept([
    '../src/index.ts',
    '../src/plugins.ts',
    '../src/config.ts',
  ], () => {
    console.log('=================================')
    server.removeListener('request', currentApp)
    currentApp = require('../src').default
    server.on('request', currentApp)
  })
}
