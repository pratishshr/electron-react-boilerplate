require('./env');

const { app, Menu } = require('electron');
const isDev = require('electron-is-dev');

const { createMainWindow } = require('./ui/window');

const extensions = require('./utils/extensions');

isDev && require('electron-debug')({ enabled: true });

/**
 *  Electron app events.
 */
app.on('ready', async () => {
  extensions.init();

  if (process.platform === 'darwin') {
    // MAC shortcuts
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
          ]
        }
      ])
    );
  }

  createMainWindow();
});

app.on('activate', async () => {
  createMainWindow();
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
