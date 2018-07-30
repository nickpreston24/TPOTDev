const remote = require('electron').remote
const webContents = require('electron')
const progress = require('progressbar.js')
const config = require('config')
const ui = require('./assets/js/ui.js')
const wvm = require('./assets/js/wvm.js')
const fs = require('fs')
window.$ = window.jQuery = require('./assets/js/jquery.min.js') // Weird way, but works for electron. Code is directly transferrable from web.
let ipc = require('electron').ipcRenderer

// Utilities
const converter = require('./assets/js/docxConverter.js')
let log = console.log.bind(console)

// This event fires after the BrowserWindow has loaded its WebContents, which contains the Window object. 
// The Window loads the DOM. When it is ready, this event fires.
// If there are any functions that access an element in the DOM, like a <button>, then they need to be initialized here. 
// All other functions can go elsewhere.
window.onload = function () {

    // As Trump says... "verwy emportant. verwy special."
    const webview = document.querySelector('webview')

    webview.addEventListener('dom-ready', (event) => {
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
}

//[MP] - psuedocode (put inside a class, if possible, else just use inside editor.html)
async function ConvertDocument() {
    await converter.convert(filename)
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