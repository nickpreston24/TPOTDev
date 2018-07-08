const remote = require('electron').remote
const webContents = require('electron')
const progress = require('progressbar.js')
const config = require('config')
const ui = require('./assets/js/ui.js')
const wvm = require('./assets/js/wvm.js')
const fs = require('fs')
window.$ = window.jQuery = require('./assets/js/jquery.min.js') // Weird way, but works for electron. Code is directly transferrable from web.
var ipc = require('electron').ipcRenderer


    // .then(function(result){
    //     var html = result.value; // The generated HTML
    //     var messages = result.messages; // Any messages, such as warnings during conversion
    // })
    // .done();
    // C:/Users/Braden/Desktop/docxtest.docx

// Get the most popular repo asynchronously: "await" waits for it to finish!
// var response = await mammoth.convertToHtml({path: "path/to/document.docx"})
//                             .then(function(result){
//                                 var html = result.value; // The generated HTML
//                                 var messages = result.messages; // Any messages, such as warnings during conversion
//                             })
//                             .done()

// // Grab the contributors of the most popular repo, asynchronously
// var mostPopularRepo = response.body.items[0];

// console.log(mostPopularRepo)

var got = URL => require("got")(URL, { json : true });

async function x() {

    // ui.createAppLaunchScreen()

    // Get the most popular repo asynchronously: "await" waits for it to finish!
    var response = await mammoth.convertToHtml({path: "C:/Users/Braden/Desktop/docxtest.docx"})
                                .then(function(result){
                                    var html = result.value; // The generated HTML
                                    var messages = result.messages; // Any messages, such as warnings during conversion
                                })
                                // .done()

    // Grab the contributors of the most popular repo, asynchronously
    var mostPopularRepo = response

    return response
    // var contributors = (await got(mostPopularRepo.contributors_url)).body;

    // // and render them as html
    // contributors.reduce((prev, user) =>
    //     prev + `<li><img src=${user.avatar_url} width=24 /> ${user.login} </li>`
    // , "");
}


// Utilities
let log = console.log.bind(console)
// setInterval(function(){ const webview = document.querySelector('webview'); webview.reload(); }, 5000);

// DOMContentLoaded / Ready  ==  Fired after HTML page has finished Parsing
// window.DOMContentLoaded()

window.addEventListener("DOMContentLoaded", function() { // ($( document ).ready() is the jQuery equivalent
    console.log('DOM Content Loaded')
    var e = x().then((result) => {
        console.log(result)
    })
    
});

// This even fires after the BrowserWindow has loaded its WebContents, which contains the Window object. The Window loads the DOM. When it is ready, this event fires.
// If there are any functions that access an element in the DOM, like a <button>, then they need to be initialized here. All other functions can go elsewhere.
window.addEventListener('load', function() { // window.load() is the Window equivalent

    console.log('DOM Fully Loaded')
    // setTimeout(ui.destroyAppLaunchScreen,2000)

    // As Trump says... "verwy emportant. verwy special."
    const webview = document.querySelector('webview')

    webview.addEventListener('dom-ready', (e) => {
        // e.target.openDevTools()
        // setInterval(()=>{webview.reload()}, 2000);
        console.log('Webview DOM Ready')
    })

    // Test all packages for valid load
    ui.test('UI Package Loaded')
    wvm.test('WVM Package Loaded')

    // Add in dom-dependant button event listeners
    ui.addEventListeners()

    // Create & Set Class-based UI Elements
    ui.createCircle(((Math.random() * 100) / 100).toFixed(2))

    //Sample transfer of html over IPC:
    window.addEventListener('on-convert-complete', (e) => {
        ipc.send('html-data', 'Ping!')
    })

    // window.addEventListener('on-convert-complete', (e) => {
    //     console.log('Letters.js heard an event!')
    // })

    //Rtf to html conversion test:
    var test = require('./assets/js/test-modules/RtfConverter.js')
    test.convertIarnaSample()

    //View builder test:
    // let view1 = new View.Builder('first-view') //.build()
    // console.log(view1)


    //psuedocode (put inside a class, if possible, else just use inside editor.html)
    async function ConvertDocument() {
        await converter.Convert(filename)
            .then((response) => {
                //1.  run conversion
                //2.  fire event UI or other class can pick up via event listener 
                //    & pair that event listener with a handler function (outside this function and promise!)
                //pack the event with the new file's location within this promise or this function
                window.dispatchEvent(conversionCompleteEvent)

            }).then((error) => {
                //rethrow error to an event the UI can pick up
            })
    }

}