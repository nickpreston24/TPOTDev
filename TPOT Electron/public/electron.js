// Electron
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const ipc = electron.ipcMain
const dialog = electron.dialog
const autoUpdater = require("electron-updater").autoUpdater;
// require('electron-debug')() // Doesn't work?

// Other Modules
const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require('electron-log')
const chalk = require('chalk');

let updater
let toolboxWindow;
autoUpdater.autoDownload = false
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


//  ELECTRON MAIN PROCESS APP EVENTS
/////////////////////////////////////////////////////////////////////////

app.on("ready", () => {
    createToolboxWindow()
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


//  TOOLBOX  POST-LOAD EVENTS
/////////////////////////////////////////////////////////////////////////

ipc.on("toolbox-initialized", (event, arg) => {
    console.log(chalk.bgGreen.black('Toolbox render process loaded...'));
    // Start Auto Update Service
    autoUpdater.checkForUpdates()
    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 60000)
})


//  AUTO UPDATES
/////////////////////////////////////////////////////////////////////////

autoUpdater.on('checking-for-update', () => {
    sendUpdateStatusToToolbox('update-checking', 'Checking for update...')
})

autoUpdater.on('update-available', (info) => {
    sendUpdateStatusToToolbox('update-available', `Found Update: ${info.version}`, info)
})

autoUpdater.on('update-not-available', (info) => {
    sendUpdateStatusToToolbox('update-not-available', 'Update not available.', info)
})

autoUpdater.on('update-downloaded', (info) => {
    sendUpdateStatusToToolbox('update-downloaded', `Update downloaded: ${info.version}`, info)
})

autoUpdater.on('error', (err) => {
    sendUpdateStatusToToolbox('update-error', `Error: ${err}`, err)
})

autoUpdater.on('download-progress', (progressObj) => {
    sendUpdateStatusToToolbox('update-download-progress', `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`, info)
})

ipc.on("update-confirm-download-and-restart", (event, arg) => {
    autoUpdater.quitAndInstall(); // Downloads and Quits
})

ipc.on("update-confirm-download", (event, arg) => {
    autoUpdater.downloadUpdate(); // Just Downloads
})

ipc.on("update-confirm-restart", (event, arg) => {
    autoUpdater.quitAndInstall(); // Assuming already download, will just quit, otherwise, download  quit
})

function sendUpdateStatusToToolbox(event, desc, data) {
    log.info(desc ? desc : "auto-update uknown event triggered");
    toolboxWindow.webContents.send('auto-update', msg = {
        event: event,
        desc: desc,
        data: data ? data : null
    });
}


//  CONFIG AND UTILITIES
/////////////////////////////////////////////////////////////////////////

const createToolboxWindow = () => {
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
}

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

// autoUpdater.on('update-downloaded', (info) => {
//     autoUpdater.quitAndInstall();
// })

// autoUpdater.on('update-available', (info) => {
//     sendStatusToWindow('Update available.');
//     dialog.showMessageBox({
//         type: 'info',
//         title: `Found Updates ${info}`,
//         message: 'Found updates, do you want update now?',
//         buttons: ['Sure', 'No']
//     }, (buttonIndex) => {
//         if (buttonIndex === 0) {
//             autoUpdater.downloadUpdate()
//         } else {
//             updater.enabled = true
//             updater = null
//         }
//     })
// })