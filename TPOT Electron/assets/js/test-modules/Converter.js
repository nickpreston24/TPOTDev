// const letterPath = './assets/rtf/SampleLetter.rtf'
const letterPath = './assets/docs/SampleLetter.docx'
const rtfToHtml = require('@iarna/rtf-to-html')
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

/* Sample Html Converters: */
function convertIarnaSample() {
    console.log('started conversion')
    fs.createReadStream(letterPath).pipe(rtfToHtml((err, html) => {
        ipc.send('html-data', html)
        SaveHtml(html, savePath);
        window.dispatchEvent(onConversionComplete, html)
    }))
}

function mammothSampleConversion() {
    var mammoth = require("mammoth");
    var anchorme = require('anchorme').default;

    mammoth.convertToHtml({
            path: letterPath
        })
        .then(function (result) {
            var html = result.value; // The generated HTML
            var messages = result.messages; // Any messages, such as warnings during conversion
            // document.body.html = html;

            var linkified = anchorme(html);
            // console.log('linkified html\n', linkified);

            // document.body.innerHTML = html;
            document.body.innerHTML = linkified;
            // result = html;

            // console.log('mammoth sample:\n', html)
            // if (messages) console.log('mammoth messages:\n', messages)
        })
        .done();
}

// interface FileMetaInformation
//  {
//      fileType: number; // optional
//      mimeType: string; // optional
//      name: string; // optional
//      size: number; // optional
//      creator: string; // optional
//      createdAt: string; // optional
//      modifiedAt: string; // optional
//  }

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
    file2HtmlSample,
    mammothSampleConversion
}