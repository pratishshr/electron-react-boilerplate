const { app, dialog, BrowserWindow } = require('electron');

const config = require('../config');

let mainWindow;
let windows = [];

const WIDTH = 1280;
const HEIGHT = 700;
const MIN_WIDTH = 1070;
const MIN_HEIGHT = 700;

const defaults = {
  width: WIDTH,
  height: HEIGHT,
  minWidth: MIN_WIDTH,
  minHeight: MIN_HEIGHT,
  backgroundColor: '#00376a',
  show: false
};

/**
 * Create browser window.
 *
 * @param {object} browserOptions
 * @param {string} pathname
 * @param {object} options
 * @returns {object} window
 */
function createWindow(browserOptions = defaults, pathname = '', options = { maximize: true }) {
  let bundleUrl;
  let { maximize } = options;
  let window = new BrowserWindow(browserOptions);
  let webContents = window.webContents;

  // Disable zoom
  window.webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1);
    webContents.setVisualZoomLevelLimits(1, 1);
    webContents.setLayoutZoomLevelLimits(0, 0);
  });

  // Disable Ctrl + click for new window
  window.webContents.on('new-window', function(e, url) {
    e.preventDefault();
  });

  windows.push(window);

  bundleUrl = `${config.bundleUrl}#${pathname}`;

  window.loadURL(bundleUrl);

  maximize && window.maximize();
  window.show();

  window.on('closed', function() {
    windows.splice(windows.indexOf(window), 1);
  });

  return window;
}

/**
 * Create main browser window of the application.
 *
 * @returns {object} window
 */
function createMainWindow() {
  if (mainWindow) {
    return;
  }

  mainWindow = createWindow();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  return mainWindow;
}

/**
 * Close main window.
 */
function closeMainWindow() {
  if (!mainWindow) {
    return;
  }

  mainWindow.hide();
}

module.exports = {
  closeMainWindow,
  createMainWindow
};
