const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const ipc = electron.ipcMain
const autoUpdater = require("electron-updater").autoUpdater;
// require('electron-debug')() // Doesn't work?
const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require('electron-log')
const chalk = require('chalk')

let TOOLBOX_WINDOW;

// : ELECTRON MAIN PROCESS APP EVENTS

app.on("ready", () => {
    createToolboxWindow()
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (TOOLBOX_WINDOW === null) {
        createToolboxWindow();
    }
});

const createToolboxWindow = () => {

    // : Create Toolbox Window
    TOOLBOX_WINDOW = new BrowserWindow({
        title: 'Toolbox',
        frame: false,
        center: true,
        height: 700,
        width: 1200,
        webPreferences: {
            webSecurity: true,
            allowRunningInsecureContent: true,
            // devTools: isDev ? true : false
        },
    });

    // : Set URL to Localhost or Build root.
    TOOLBOX_WINDOW.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // Install React Dev Tools
    if (false) {
        const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
        setTimeout(() => {
            installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
                console.log(`Added Extension:  ${name}`);
            })
                .catch((err) => {
                    console.log('An error occurred: ', err);
                });
        }, 15000) // Need to wait for bundle & Concurrently to finish
    }

    // : Other
    isDev ? TOOLBOX_WINDOW.webContents.openDevTools() : null
    TOOLBOX_WINDOW.setMenu(null)
    TOOLBOX_WINDOW.maximize()
    TOOLBOX_WINDOW.on("closed", () => (TOOLBOX_WINDOW = null));

}



//  TOOLBOX  POST-LOAD EVENTS
/////////////////////////////////////////////////////////////////////////


//  AUTO UPDATES
/////////////////////////////////////////////////////////////////////////

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true
allowPrerelease = true
allowDowngrade = true

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
    setImmediate(() => {
        autoUpdater.quitAndInstall();
    })
})

autoUpdater.on('error', (err) => {
    sendUpdateStatusToToolbox('update-error', `Error: ${err}`, err)
})

autoUpdater.on('download-progress', (progressObj) => {
    sendUpdateStatusToToolbox('update-download-progress', `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`, progressObj)
})

ipc.on("update-confirm-download-and-restart", async (event, arg) => {
    await autoUpdater.downloadUpdate()
    // setImmediate(() => {
    //     autoUpdater.quitAndInstall();
    //   })
    // autoUpdater.quitAndInstall(true, true); // Downloads and Quits after Finished
})

ipc.on("update-confirm-download", (event, arg) => {
    autoUpdater.downloadUpdate(); //  Download Update and Show Progress
})

ipc.on("update-confirm-restart", (event, arg) => {
    autoUpdater.quitAndInstall(true, true); //  If Update Downloaded, Refresh Install
})

const sendUpdateStatusToToolbox = (event, desc, data) => {
    log.info(desc ? desc : "auto-update uknown event triggered");
    toolboxWindow.webContents.send('auto-update', msg = {
        event: event ? event : 'update-unknown',
        desc: desc ? event : 'Unknown Update...',
        data: data ? data : null
    });
}


let doOnce = true

ipc.on("toolbox-initialized", (event, arg) => {
    console.log(chalk.bgGreen.black('Toolbox render process loaded...'))
    autoUpdater.checkForUpdates()
    console.log(chalk.bgBlue.black('Starting Auto Update Service...'))
    setInterval(() => {
        console.log(chalk.bgBlue.black('Checking for Updates...'))
        autoUpdater.checkForUpdates()
    }, 60000)

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
                        transferred: `${count * 512}`,
                        total: `${count * 512 * 10}`
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

//  CONFIG AND UTILITIES
/////////////////////////////////////////////////////////////////////////

const rest = (ms) => {
    return new Promise(r => setTimeout(r, ms));
}