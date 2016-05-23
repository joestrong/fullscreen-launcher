const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let win;

app.on('ready', () => {
  win = new BrowserWindow({ fullscreen: true, frame: false });
  win.loadURL(`file://${__dirname}/index.html`);
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
});
