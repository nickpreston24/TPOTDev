const letterPath = './assets/rtf/SampleLetter.rtf'
const rtfToHtml = require('@iarna/rtf-to-html')
var fs = require('fs')

function sampleCallback() {
    var x = (function () {
        return true;
    })();
    console.log(x)
}

// function usageSample() {
//     let htmlOuter
//     fs.createReadStream('example.rtf').pipe(rtfToHTML((err, html) => {
//         console.log(html)
//         htmlOuter = html
//     }))
//     console.log(htmlOuter)
// }


//todo: delete when done testing
function convertSample() {
    console.log('started conversion')
    var regexp = new RegExp('rtf')
    fs.createReadStream(letterPath).pipe(rtfToHtml((err, html) => {
        console.log('callback-inner():\n', html)
        savePath = letterPath.replace(regexp, 'html')
        console.log(savePath)

        //ERROR: Works, but we can't get our save path back to access it.
        // fs.writeFile(savePath, html, (error) => {
        //     if (error) {
        //         return console.log(error)
        //     }
        //     console.log('save complete')
        // })
    }))
}

module.exports = {
    convertSample,
    sampleCallback,
}