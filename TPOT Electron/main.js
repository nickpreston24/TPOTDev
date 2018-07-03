const path = require('path')
const {
  app,
  BrowserWindow,
} = require('electron') // Both app and BrowserWindow are requiring Electron
const config = require('config');
var ipc = require('electron').ipcMain

initialize()

function initialize() {
  function createWindow() {
    // Create a new browser window
    window = new BrowserWindow(config.settings.windowOptions)

    // // Graceful Load
    // window.once('ready-to-show', () => {window.show()})

    // set the path of the browser window url
    window.loadURL(path.join('file://', __dirname, '/letters.html'))
    // window.loadFile('main.js') // text-only load

    // Launch fullscreen with DevTools if set in config, usage: npm run debug
    if (config.settings.loaderOnLaunch) {
      window.webContents.openDevTools()
      // window.maximize()
    }

    // More code related to creating this browsers window here
    // window.addEventListener('call-main')

    // window.addEventListener('on-convert-complete', (e) => {
    //   console.log('Main.js heard an event!')
    // })

    // window.webContents.window.addEventListener('on-convert-complete', (e) => {
    //   console.log('Main.js heard an event!')
    // })

    window.on('on-convert-complete', () => {
      console.log('Main.js heard an event!')
      alert('Main.js heard an event!')
    })

  }

  app.on('ready', createWindow)
  console.log('initialization complete!')


}

ipc.on('html-data', function (event, html) {
  console.log(html);
});

//try this!
// create a custom class that holds our raw converted doc (html) data
// add an event listener or call a setHtml()
// that doc will be initialized whenever, but the html can be set anywhere, anytime
// this class can be a delivery object for whatever windows wish to use it.