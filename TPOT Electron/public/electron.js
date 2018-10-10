// Electron
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const ipc = electron.ipcMain
const dialog = electron.dialog
const {
    autoUpdater
} = require("electron-updater");
// require('electron-debug')() // Doesn't work?



// Other Modules
const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require('electron-log')


let updater
autoUpdater.autoDownload = false
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// Main Process
let toolboxWindow;


// require("update-electron-app")({
//     repo: "kitze/react-electron-example",
//     updateInterval: "1 hour"
// });

function createWindow(offset) {
    console.log(offset)

    const windowOptions = {
        // width: 1100,
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true,
            devTools: true
        },
        x: offset.x,
        y: offset.y,
        width: 1800,
        height: 700,
        center: true
    }

    toolboxWindow = new BrowserWindow(windowOptions);
    toolboxWindow.loadURL(
        isDev ?
        "http://localhost:3000" :
        `file://${path.join(__dirname, "../build/index.html")}`
    );

    toolboxWindow.setMenu(null)
    toolboxWindow.webContents.openDevTools()
    toolboxWindow.on("closed", () => (toolboxWindow = null));

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

app.on("ready", () => {

    // Create Main window (Refactor Later)
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
            x: externalDisplay.bounds.x + 60,
            y: externalDisplay.bounds.y + 170
        }
        createWindow(offset)
    }

    // // Start Auto-Update Service
    // autoUpdater.checkForUpdates();
    toolboxWindow.send('test')

});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (toolboxWindow === null) {
        createWindow(offset);
    }
});

// Auto Update Event Callbacks
function sendStatusToWindow(text) {
    log.info(text);
    toolboxWindow.webContents.send('message', text);
}

// IPC Dispatch
autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
    dialog.showMessageBox({
        type: 'info',
        title: 'Found Updates',
        message: 'Found updates, do you want update now?',
        buttons: ['Sure', 'No']
    }, (buttonIndex) => {
        if (buttonIndex === 0) {
            autoUpdater.downloadUpdate()
        } else {
            updater.enabled = true
            updater = null
        }
    })
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
    dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
})
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    autoUpdater.quitAndInstall();
})
autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
});

// IPC Listen
ipc.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})

ipc.on("render", (event, arg) => {
    console.log("RENDER-M")
    // Start Auto-Update Service
    autoUpdater.checkForUpdates();
    toolboxWindow.webContents.send('message', 'hey there')
})