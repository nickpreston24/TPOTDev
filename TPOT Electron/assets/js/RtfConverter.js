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

//todo: delete when done testing
let result = 'bunnies'
// result.html = ''

function convertSample() {
    console.log('started conversion')

    // var a
    fs.createReadStream(letterPath).pipe(rtfToHtml((err, html) => {

        // console.log(html)
    }))

    // console.log("FINAL", rtfToHtml.display())

    // console.log("Exported Output variable: ", a)

    // rtfToHtml.getHTML()
    // console.log('output var : \n', output)
    // return result
}
// }

//     (err, html) => {
//         // console.log('Conversion complete')
//         // result = html
//         console.log("html var", html)
//         output = html
//         console.log("result var", output)

//         // console.log('convertsample(): \n', result)
//         // console.log('output var : \n', output)

//     }


// function convertSample (){
//     const rtfToHtml = require('@iarna/rtf-to-html')

//     fs.createReadStream(letterPath).pipe(rtfToHTML((err, html) => {
//         console.log("from read stream", html)
//         // …
//     }))

//     // rtfToHTML.fromStream(fs.createReadStream('example.rtf'), (err, html) => {
//     //     // …
//     // })

//     // rtfToHTML.fromString('{\\rtf1\\ansi\\b hi there\\b0}', (err, html) => {
//     //     // prints a document containing:
//     //     // <p><strong>hi there</strong></p>
//     // })

// }




// async function convertAsync() {
//     var result;

//     console.log('started conversion')
//     result = fs.createReadStream(letterPath).pipe(rtfToHtml((error, html) => {
//         console.log('Conversion complete')
//         return html
//     }))

//     return result
// }

module.exports = {
    RtfConverter,
    convertSample,
    result
}