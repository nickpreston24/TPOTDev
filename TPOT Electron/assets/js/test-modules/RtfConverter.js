const letterPath = './assets/rtf/SampleLetter.rtf'
const rtfToHtml = require('@iarna/rtf-to-html')
var fs = require('fs')
const pattern = /rtf/g
const savePath = letterPath.replace(pattern, 'html')
const ipc = require('electron').ipcRenderer
const file2html = require('file2html')
const TextReader = require('file2html-text');
const OOXMLReader = require('file2html-ooxml');
const ImageReader = require('file2html-image');

var onConversionComplete = new Event('on-convert-complete')

function convert() {

}

window.addEventListener('on-convert-complete', (e) => {
    // console.log('event received!')
    fs.readFile(savePath, 'utf8', (error, data) => {
        if (error) throw error;
        console.log("File red: ", savePath)
        ipc.send('html-data', data)
    })

}, false)

/* Sample Html Converters: */
function convertIarnaSample() {
    console.log('started conversion')
    fs.createReadStream(letterPath).pipe(rtfToHtml((err, html) => {
        ipc.send('html-data', html)
        SaveHtml(html);
        window.dispatchEvent(onConversionComplete, html)
    }))
}

function mammothSample() {}

function file2HtmlSample() {
    file2html.config({
        readers: [
            TextReader,
            OOXMLReader,
            ImageReader
        ]
    });

    var fileBuffer = fs.ReadStream(letterPath)
    var meta = {}

    file2html.read({
        fileBuffer,
        meta
    }).then((file) => {
        const {
            styles,
            content
        } = file.getData();
        // document.body.innerHTML = styles + content;
        console.log('file2Html-sample:\n', styles + content);
    });
}

function SaveHtml(html) {
    fs.writeFile(savePath, html, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('save complete for file\n', savePath);
    });
}

// function sampleCallback() {
//     var x = (function () {
//         return true;
//     })();
//     console.log(x)
// }

// function usageSample() {
//     let htmlOuter
//     fs.createReadStream('example.rtf').pipe(rtfToHTML((err, html) => {
//         console.log(html)
//         htmlOuter = html
//     }))
//     console.log(htmlOuter)
// }

module.exports = {
    convertIarnaSample,
    file2HtmlSample
}