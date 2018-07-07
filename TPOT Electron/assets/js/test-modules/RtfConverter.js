const letterPath = './assets/rtf/SampleLetter.rtf'
const rtfToHtml = require('@iarna/rtf-to-html')
var fs = require('fs')
const pattern = /rtf/g
const savePath = letterPath.replace(pattern, 'html')
const ipc = require('electron').ipcRenderer

var onConversionComplete = new Event('on-convert-complete')

function convert(filePath) {

}

window.addEventListener('on-convert-complete', (e) => {
    // console.log('event received!')
    fs.readFile(savePath, 'utf8', (error, data) => {
        if (error) throw error;
        console.log("File red: ", savePath)
        ipc.send('html-data', data)
    })

}, false)

//todo: delete when done testing
function convertIarnaSample() {
    console.log('started conversion')
    fs.createReadStream(letterPath).pipe(rtfToHtml((err, html) => {
        ipc.send('html-data', html)
        SaveHtml(html);
        window.dispatchEvent(onConversionComplete, html)
    }))
}

function SaveHtml(html) {
    fs.writeFile(savePath, html, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('save complete for file\n', savePath);
    });
}

function mammothSample() {}

function file2HtmlSample() {}

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
}