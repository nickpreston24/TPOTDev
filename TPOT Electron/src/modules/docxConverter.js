// const letterPath = './assets/rtf/SampleLetter.rtf'
const electron = window.require('electron')
const remote = electron.remote;
const app = remote.app;
const ipc = remote.require('electron').ipcRenderer
const fs = remote.require('fs')
const path = remote.require('path')

const file2html = require('file2html')
const TextReader = require('file2html-text');
const OOXMLReader = require('file2html-ooxml');
const ImageReader = require('file2html-image');

const pattern = /docx/g
// const savePath = letterPath.replace(pattern, 'html') // refactored, see NOTES:
const letterPath = path.join(app.getAppPath(), './src/config/', 'SampleLetter.docx')
const savePath = path.join(app.getAppPath(), './src/config/') 
// NOTES: Usually a filepath that is prefixed with  ./ or ../ works, because it is local to the directory, and electron
// automatically gets the full C:// filepath when bundling the modules. Trying to acccess a file, even from the root
// directory wont work using ./ or ../ because it isn't a module, so its filepath isn't going to be auto-resolved. The solution
// is provided by Electron, with the app.getAppPath() function, which resolves the filepath, whether it is in dev mode, production,
// or a standalone, asar - packaged, executeable. All you have to do is use node's path module to combine the rest of the file's directory location.

let onConversionComplete = new Event('on-convert-complete')

window.addEventListener('on-convert-complete', (e) => {
    // console.log('event received!')
    fs.readFile(letterPath, 'utf8', (error, data) => {
        if (error) throw error;
        console.log("File red: ", letterPath)

        console.groupCollapsed("Data")
        console.log(data)
        console.groupEnd
        // ipc.send('html-data', data) // EDITED
    })

}, false)

window.dispatchEvent(onConversionComplete)

function file2HtmlSample() {
    file2html.config({
        readers: [
            TextReader,
            OOXMLReader,
            ImageReader
        ]
    });

    var fileBuffer = fs.ReadStream(letterPath)
    var meta = {
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }

    file2html.read({
        fileBuffer,
        meta // : FileMetaInformation
    }).then((file) => {
        const {
            styles,
            content
        } = file.getData();
        // document.body.innerHTML = styles + content;
        console.log('file2Html-sample:\n', styles + content);
    });
}

function SaveHtml(html, path) {
    fs.writeFile(path, html, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('save complete for file\n', savePath);
    });
}

module.exports = {
    file2HtmlSample,
}