const { app, BrowserWindow, shell } = require('electron');

const APP_URL = 'https://merylmoviesbox.web.app';
// Opt-in maintenance preview; normal operation remains the default.
const MAINTENANCE_PREVIEW = process.env.MERYL_MAINTENANCE_PREVIEW === '1';
const START_WIDTH = 761;
const START_HEIGHT = 765;

function createWindow() {
  const win = new BrowserWindow({
    width: START_WIDTH,
    height: START_HEIGHT,
    minWidth: 700,
    minHeight: 650,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#1f2229',
    title: 'MerylMoviesBox',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    }
  });

  win.setMenuBarVisibility(false);

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(APP_URL)) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(APP_URL)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  if (MAINTENANCE_PREVIEW) {
    win.loadFile('404-preview.html');
  } else {
    win.loadURL(APP_URL);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
