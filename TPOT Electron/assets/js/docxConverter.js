// const letterPath = './assets/rtf/SampleLetter.rtf'
const letterPath = './assets/docs/SampleLetter.docx'
var fs = require('fs')

const pattern = /docx/g
const savePath = letterPath.replace(pattern, 'html')

const ipc = require('electron').ipcRenderer
const file2html = require('file2html')
const TextReader = require('file2html-text');
const OOXMLReader = require('file2html-ooxml');
const ImageReader = require('file2html-image');

var onConversionComplete = new Event('on-convert-complete')

window.addEventListener('on-convert-complete', (e) => {
    // console.log('event received!')
    fs.readFile(savePath, 'utf8', (error, data) => {
        if (error) throw error;
        console.log("File red: ", savePath)
        ipc.send('html-data', data)
    })

}, false)

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