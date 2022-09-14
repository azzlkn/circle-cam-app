const { app, BrowserWindow } = require('electron');

let mainWindow;
let oldSize;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') app.quit();
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    transparent: true,
    height: 250,
    width: 250,
    frame: false,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setFullScreenable(false);
  mainWindow.moveTop();

  setInterval(() => {
    oldSize = mainWindow && mainWindow.getSize();
  }, 10);

  mainWindow.on('resize', () => {
    let size = mainWindow.getSize();
    let widthChanged = oldSize[0] != size[0];
    if (widthChanged) {
      mainWindow.setSize(size[0], parseInt((size[0] * 1).toString()));
    } else {
      mainWindow.setSize(parseInt((size[1] / 1).toString()), size[1]);
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
