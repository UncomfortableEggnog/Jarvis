var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var globalShortcut = electron.globalShortcut;
var Tray = electron.Tray;
var Menu = electron.Menu;
var MenuItem = electron.MenuItem;
var ipcMain = electron.ipcMain;

electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var appIcon = null;
var toggle = false;
var menu = null;


app.on('ready', function () {
  if (process.env.NODE_ENV === 'DEV') {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600
    });
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow = new BrowserWindow({
      minWidth: 800,
      minHeight: 600,
      maxWidth: 800,
      maxHeight: 600
    });
  }
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  // Open the DevTools when in dev mode
  // if (process.env.NODE_ENV === 'DEV') {
  //   mainWindow.webContents.openDevTools();
  // }

  //start listening when the app starts
  mainWindow.webContents.on('dom-ready', function () {
    mainWindow.webContents.send('listening', 'listening');
  });

  var appPath = app.getAppPath();
  ipcMain.on('getPath', function (event, arg) {
    event.returnValue = appPath;
  });

  mainWindow.showWindow = false;
  mainWindow.toggle = function () {
    if (this.showWindow) {
      this.show();
      this.showWindow = !this.showWindow;
    } else {
      this.hide();
      this.showWindow = !this.showWindow;
    }
  };

  menu = new Menu();
  menu.append(new MenuItem({
    label: 'Quit',
    click: function () {
      app.quit();
    }
  }));

  appIcon = new Tray(appPath + '/app/assets/icons/rsz_1rsz_jarvis_tiny.png');
  appIcon.on('click', function () {
    mainWindow.toggle();
  });
  appIcon.on('right-click', function (e) {
    this.popUpContextMenu(menu);
  });

  mainWindow.on('close', function (e) {
    app.quit();
  });
  mainWindow.on('closed', function () {
    globalShortcut.unregister('ctrl+r');
    app.quit();
  });
  app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
      app.quit();
    }
  });
});
