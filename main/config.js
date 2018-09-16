const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');

/**
 * Electron configuration.
 */
const config = {
  port: process.env.PORT || '3000',
  host: process.env.HOST || 'localhost',
  env: process.env.REACT_APP_ENV || 'development',
  bundleUrl: isDev
    ? `http://${process.env.HOST}:${process.env.PORT}`
    : url.format({
        pathname: path.join(__dirname, '/../web-build/index.html'),
        protocol: 'file:',
        slashes: true
      })
};

module.exports = config;
