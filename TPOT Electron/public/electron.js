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
const rest = (ms) => {
    return new Promise(r => setTimeout(r, ms));
}

let toolboxWindow;

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

let doOnce = true

//  TOOLBOX  POST-LOAD EVENTS
/////////////////////////////////////////////////////////////////////////

ipc.on("toolbox-initialized", (event, arg) => {
    console.log(chalk.bgGreen.black('Toolbox render process loaded...'))

    if (doOnce === false) {

    // Start Auto Update Service
    autoUpdater.checkForUpdates()
    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 60000)

    // Mock on Dev Tools
    if (isDev) {
        // Mock Update Available
        setTimeout(() => {
            sendUpdateStatusToToolbox('update-available', `temp update`, {
                version: '0.1.15'
            })
        }, 1500)
        setInterval(async () => {
            sendUpdateStatusToToolbox('update-available', `temp update`, {
                version: '0.1.15'
            })
        }, 60000)
        // Mock Download every few seconds
        sendUpdateStatusToToolbox('update-downloaded', 'Starting  Mock download')
        setInterval(async () => {
            let time = new Array(11)
            console.log(chalk.bgGreen.black('Toolbox render process loaded...'));
            for (let count = 0; count < time.length; count++) {
                let progressObj = {
                    bytesPerSecond: '100kb',
                    percent: `${count * 10}`,
                    transferred: `${count*512}`,
                    total: `${count*512*10}`
                }
                console.log(chalk.blue(progressObj));
                sendUpdateStatusToToolbox('update-download-progress', `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`, progressObj)
                await rest(1000)
            }
            sendUpdateStatusToToolbox('update-downloaded', `Update downloaded: ${"fin"}`, {
                version: "test"
            })
            setTimeout(() => {
                sendUpdateStatusToToolbox('update-error', `Error: ${"TEST"}`, "test")
            }, 1500)
            setTimeout(() => {
                sendUpdateStatusToToolbox('update-available', `temp update`, {
                    version: '0.1.15'
                })
            }, 1500)

        }, 15000)
    }

    }

    if (doOnce === false) {
        doOnce = true
    }

})


//  AUTO UPDATES
/////////////////////////////////////////////////////////////////////////

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

autoUpdater.on('checking-for-update', () => {
    sendUpdateStatusToToolbox('update-checking', 'Checking for update...')
})

autoUpdater.on('update-available', (info) => {
    sendUpdateStatusToToolbox('update-available', `Found Update: ${info}`, info)
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
    sendUpdateStatusToToolbox('update-download-progress', `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`, progressObj)
})

ipc.on("update-confirm-download-and-restart", async (event, arg) => {
    await autoUpdater.downloadUpdate()
    autoUpdater.quitAndInstall(); // Downloads and Quits after Finished
})

ipc.on("update-confirm-download", (event, arg) => {
    autoUpdater.downloadUpdate(); //  Download Update and Show Progress
})

ipc.on("update-confirm-restart", (event, arg) => {
    autoUpdater.quitAndInstall(); //  If Update Downloaded, Refresh Install
})

function sendUpdateStatusToToolbox(event, desc, data) {
    log.info(desc ? desc : "auto-update uknown event triggered");
    toolboxWindow.webContents.send('auto-update', msg = {
        event: event ? event : 'update-unknown',
        desc: desc ? event : 'Unknown Update...',
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
            webSecurity: true,
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

    if (true) { // flag to enable dev tools in production build
        isDev && toolboxWindow.webContents.openDevTools()
    }

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