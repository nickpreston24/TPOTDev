const os = require('os')

/////////////////////////////////////////////////////////////////////////////////////
//
//                                           EXTRA UTILITIES AND FUNCTIONS
//
/////////////////////////////////////////////////////////////////////////////////////

function getVersion() {
    return os.getVersion();
}

function getHomeDir() {
    return os.homedir();
}

function getConfigPath(file) {
    const applicationPath = app.getAppPath();
    const configDir = './src/config';

    return file ?
        path.join(applicationPath, configDir, file) :
        path.join(applicationPath, configDir)
}

function saveJSONFile(json, savePath) {
    let fileContents = JSON.stringify(json)
    fs.writeFile(path.join(getConfigPath(), savePath), fileContents, (err) => {
        if (err) {
            throw err
        }
        // printConfigDir() // print index again to see newly created save file
        console.log("File Saved to Disk")
    })
}

function printConfigDir() {
    fs.readdir(getConfigPath(), (err, files) => {
        if (err) throw err;
        console.group("Directory '" + getConfigPath() + "'")
        files.forEach(file => console.log(file));
        console.groupEnd()
    })
}