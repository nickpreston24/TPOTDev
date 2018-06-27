const {app, BrowserWindow} = require('electron')
const config = require('config');

initialize()


function initialize () {
  
  function createWindow () {
    
    // Create a new browser window
    window = new BrowserWindow(config.settings.windowOptions)
    
    // // Graceful Load
    // window.once('ready-to-show', () => {window.show()})

    // set the path of the browser window url
    window.loadFile('letters.html')
    // window.loadFile('main.js') // text-only load

    // Launch fullscreen with DevTools if set in config, usage: npm run debug
    if (config.settings.loaderOnLaunch) {
      window.webContents.openDevTools()
      // window.maximize()
    }

    // More code related to creating this browsers window here

  }

  app.on('ready', createWindow)

}