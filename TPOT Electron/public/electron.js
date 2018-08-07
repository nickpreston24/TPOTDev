// Electron
const electron = require("electron");
const app = electron.app;
const ipc = electron.ipcMain
const BrowserWindow = electron.BrowserWindow;
require('electron-debug')() // Doesn't work?

// Other Modules
const path = require("path");
const isDev = require("electron-is-dev");



// Main Process

let mainWindow;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});


function createWindow(offset) {
  console.log(offset)

  const windowOptions = {
    // width: 1100,
    x: offset.x,
    y: offset.y,
    width: 1700,
    height: 700,
    center: true
  }
  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.setMenu(null)
  mainWindow.webContents.openDevTools()
  mainWindow.on("closed", () => (mainWindow = null));



  ipc.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.sender.send('asynchronous-reply', 'pong')
  })
  
  ipc.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
  })

  ipc.on('html-data', function (event, html) {
    console.log(html);
  });



}

app.on("ready", ()=>{
  var electronScreen = electron.screen;
  var displays = electronScreen.getAllDisplays();
  var externalDisplay = null;
  for (var i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      externalDisplay = displays[i];
      break;
    }
  }

  if (externalDisplay) {
    let offset = {
      x: externalDisplay.bounds.x + 110,
      y: externalDisplay.bounds.y + 170
    }
    createWindow(offset)
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
      app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow(offset);
  }
});