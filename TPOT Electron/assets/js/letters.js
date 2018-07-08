const remote = require('electron').remote
const webContents = require('electron')
const progress = require('progressbar.js')
const config = require('config')
const ui = require('./assets/js/ui.js')
const wvm = require('./assets/js/wvm.js')
<<<<<<< HEAD
var mammoth = require("mammoth");


=======
const fs = require('fs')
>>>>>>> 48222dead837a1386745d8fff3ada907ab0e9ae2
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

<<<<<<< HEAD
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
=======
// This event fires after the BrowserWindow has loaded its WebContents, which contains the Window object. 
// The Window loads the DOM. When it is ready, this event fires.
// If there are any functions that access an element in the DOM, like a <button>, then they need to be initialized here. 
// All other functions can go elsewhere.
window.onload = function () {
>>>>>>> 48222dead837a1386745d8fff3ada907ab0e9ae2

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
<<<<<<< HEAD
    // ui.createCircle()
    // ui.destroyCircle()
    // ui.updateCircle(80)

    // console.log(webview.webContents)

    // webview.Window.postMessage("initial message", "https://googledrive.com/host/*");

    // global variable?
    // add event listener for window
    // on event, set variable to html contents
    // at end of event, reset the
    


    // actually use the event here
    // convertFileToHTML('C:/Users/Braden/Desktop/docxtest.docx')
    // sleep(1000);
    // // var x = $('#buffer').get(0).innerHTML
    // console.log(document.getElementById("buffer"))
    

    // C:/Users/Braden/Documents/TPOT/Apps/TPOT Electron/assets/SampleLetter.rtf
    // C:/Users/Braden/Desktop/docxtest.docx



})



// async function convertFileToHTML(path) {
//     console.log(path)

//     // Run mammoth promise as if it was syncronous
//     mammoth.convertToHtml({path: path})
//         .then(createBuffer) // Create Temporary Buffer
//         // .then(createBuffer) // Post event to window

//     // Retrieve Result and store to variable
//     // let e = result.value

//     // Destroy Temporary Buffer
//     // destroyBuffer()

//     // Publish Results
//     // console.log(html)
    
//     // utilities

//     function createBuffer(result) {
//         var store = document.createElement("code")
//         store.id = "buffer"
//         store.innerHTML = result.value
//         $('body').append(store)
//     }

//     // function destroyBuffer() {
//     //     $('#buffer').remove()
//     // }

//     // End of convertFileToHTML(
// }





// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//       if ((new Date().getTime() - start) > milliseconds){
//         break;
//       }
//     }
// }
=======

    //Sample transfer of html over IPC:
    window.addEventListener('on-convert-complete', (e) => {
        ipc.send('html-data', 'Ping!')
    })
>>>>>>> 48222dead837a1386745d8fff3ada907ab0e9ae2

    // window.addEventListener('on-convert-complete', (e) => {
    //     console.log('Letters.js heard an event!')
    // })

    //Rtf to html conversion test:
    var test = require('./assets/js/test-modules/RtfConverter.js')
    test.convertIarnaSample()

    //View builder test:
    // let view1 = new View.Builder('first-view') //.build()
    // console.log(view1)
}

<<<<<<< HEAD

    // async function getFirstUser() {
    //     let usersPromise = path;
    //     let users = await usersPromise;
    //     let html = users.value
    //     console.log(html)
    //     return html;
    // }



    // // Promise.all() evaluates an array of promises, like mammoth.convertToHtml(), and returns the results in the array. Index 0 is the first promise result.
    // Promise.all([mammoth.convertToHtml({path: "C:/Users/Braden/Desktop/docxtest.docx"})]).then(function(results) {
    //     // console.log(results[0].value)
    // });


    // // Console.log() doesnt print until it has a value from the async function which is waiting on mammoth.convertToHTML()
    // const makeRequest = async () => {
    //     await mammoth.convertToHtml({path: "C:/Users/Braden/Desktop/docxtest.docx"}).then(function(result){
    //         var html = result.value; // The generated HTML
    //         var messages = result.messages; // Any messages, such as warnings during conversion
    //         // console.log(html)
    //     })
    //     .done();
    // } 
    // console.log("Request: ", makeRequest())


    




=======
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
>>>>>>> 48222dead837a1386745d8fff3ada907ab0e9ae2
