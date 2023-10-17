const path = require('path');
const { app, BrowserWindow, session,protocol } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url')
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  });

  // win.loadURL(
  //   isDev
  //     ? 'http://127.0.0.1:3000'
  //     : `file://${path.join(__dirname, 'index.html')}`
  // );
win.loadURL(
    url.format({
      pathname:path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

function setupWebRequestFilter() {
  const filter = {
    urls: ['http://127.0.0.1:3000/*']
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['Origin'] = null;
    details.headers['Origin'] = null;
    callback({ requestHeaders: details.requestHeaders });
  });
}

app.whenReady().then(setupWebRequestFilter);

app.on('ready', () => {
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
