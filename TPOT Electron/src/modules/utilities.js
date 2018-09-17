const os = require('os')
//@ts-check
/////////////////////////////////////////////////////////////////////////////////////
//
//                                           EXTRA UTILITIES AND FUNCTIONS
//
/////////////////////////////////////////////////////////////////////////////////////

//Check js type
//https://stackoverflow.com/questions/7893776/the-most-accurate-way-to-check-js-objects-type
//Usage: if(types.get(prop) == types.number) { ... }
var types = {
    'get': function (prop) {
        return Object.prototype.toString.call(prop);
    },
    'null': '[object Null]',
    'object': '[object Object]',
    'array': '[object Array]',
    'string': '[object String]',
    'boolean': '[object Boolean]',
    'number': '[object Number]',
    'date': '[object Date]',
}

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