// const os = require('os')

const electron = window.require('electron')
const IPC = electron.ipcRenderer;
const remote = electron.remote
const app = remote.app
// const path = window.require('path')
// const fs = window.require('fs')

/////////////////////////////////////////////////////////////////////////////////////
//
//                                           EXTRA UTILITIES AND FUNCTIONS
//
/////////////////////////////////////////////////////////////////////////////////////

// function getVersion() {
//     return os.getVersion();
// }

// function getHomeDir() {
//     return os.homedir();
// }

// function getConfigPath(file) {
//     const applicationPath = app.getAppPath();
//     const configDir = './src/config';

//     return file ?
//         path.join(applicationPath, configDir, file) :
//         path.join(applicationPath, configDir)
// }

// function getConfigPath(file) {
//     const applicationPath = app.getAppPath();
//     const configDir = './src/config';

//     return file ?
//         path.join(applicationPath, configDir, file) :
//         path.join(applicationPath, configDir)
// }

// function saveJSONFile(json, savePath) {
//     let fileContents = JSON.stringify(json)
//     fs.writeFile(path.join(getConfigPath(), savePath), fileContents, (err) => {
//         if (err) {
//             throw err
//         }
//         // printConfigDir() // print index again to see newly created save file
//         console.log("File Saved to Disk")
//     })
// }

// function printConfigDir() {
//     fs.readdir(getConfigPath(), (err, files) => {
//         if (err) throw err;
//         console.group("Directory '" + getConfigPath() + "'")
//         files.forEach(file => console.log(file));
//         console.groupEnd()
//     })
// }

const __appPath = app.getAppPath()
const __appData = app.getPath('userData')
const __userData = app.getPath('userData')
const __temp = app.getPath('temp')
const __exe = app.getPath('exe')
const __module = app.getPath('module')
const __desktop = app.getPath('desktop')
const __documents = app.getPath('documents')
const __downloads = app.getPath('downloads')
const __music = app.getPath('music')
const __pictures = app.getPath('')
const __videos = app.getPath('videos')
const __logs = app.getPath('logs')

module.exports = {
    __appPath,
    __appData,
    __userData,
    __temp,
    __exe,
    __module,
    __desktop,
    __documents,
    __downloads,
    __music,
    __pictures,
    __videos,
    __logs
}