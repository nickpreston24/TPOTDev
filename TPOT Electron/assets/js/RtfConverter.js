const letterPath = './assets/SampleLetter.rtf'
const rtfToHtml = require('@iarna/rtf-to-html')
var fs = require('fs')

class RtfConverter {
    // constructor(path) {
    //     this.filePath = path
    // }

    setPath(path) {
        this.filePath = rtfFilePath
    }

    convert(path) {
        // if (path) {
        //     throw "rtf file path cannot be empty!"
        // }
        fs.createReadStream(path).pipe(rtfToHtml((error, html) => {
            // console.log(html)
            this.html = html
        }))
        console.log(this.html)
    }

    static convert(path) {
        if (!this.path) {
            throw "rtf file path cannot be empty!"
        }

        fs.createReadStream(path).pipe(rtfToHtml((error, html) => {
            console.log(html)
            return html
        }))
    }

    //todo: delete when done testing
    static convertSample() {
        console.log('started conversion')
        fs.createReadStream(letterPath).pipe(rtfToHtml((error, html) => {
            console.log('Conversion complete')
            console.log(html)
            return html
        }))

        console.log('convertsample(): \n', result)
        return result
    }
}

function sampleCallback() {
    var x = (function () {
        return true;
    })();
    console.log(x)
}


function usageSample() {
    let htmlOuter
    fs.createReadStream('example.rtf').pipe(rtfToHTML((err, html) => {
        console.log(html)
        htmlOuter = html
    }))
    console.log(htmlOuter)
}


//todo: delete when done testing
function convertSample() {
    // console.log('started conversion')
    let callback = function (err, html) {
        console.log('callback-inner():\n', html)
        // this.html = html
        // return html
    }

    fs.createReadStream(letterPath).pipe(rtfToHtml(callback))


    console.log('callback-outer()', callback.html)
    var x = callback();
    console.log('x = ', x)

}

// foo("", function (html) {
//     console.log(html)
// });


module.exports = {
    RtfConverter,
    convertSample,
    sampleCallback,
}