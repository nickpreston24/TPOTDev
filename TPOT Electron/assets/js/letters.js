const remote = require('electron').remote;
const progress = require('progressbar.js')
const config = require('config')
// const trianglify = require('trianglify');
const ui = require('./assets/js/updateUI.js')
window.$ = window.jQuery = require('./assets/js/jquery.min.js') // Weird way, but works for electron. Code is directly transferrable from web.

let log = console.log.bind(console)
setInterval(function(){ const webview = document.querySelector('webview'); webview.reload(); }, 5000);
// setInterval(()=>{webview.reload()}, 2000);

window.onload = function() {
    ui.addEventListeners()

    const webview = document.querySelector('webview')

    ui.createCircle(((Math.random() * 100) / 100).toFixed(2))
    // ui.createCircle()
    // ui.destroyCircle()
    // ui.updateCircle(80)


}

// https://www.github.com


// Give some time for the DOM to load then add in the Event Listeners


// function addEventListeners() {
//     const webview = document.querySelector('webview')
//     const currentWindow = remote.getCurrentWindow()

//     // // Window
//     // $("#exit-btn").click(()=>{currentWindow.close()})
//     // $("#minimize-btn").click(()=>{currentWindow.minimize()});
//     // $("#maximize-btn").click(()=>{if (!currentWindow.isMaximized()) {currentWindow.maximize()} else {currentWindow.unmaximize()}})

//     // // Navigation
//     // $("#btn-logout").click(()=>{webview.loadURL('https://www.google.com/')})
//     // $("#btn-checkout").click(()=>{ui.setCurrentNavBtn(event.srcElement);webview.loadURL('file://C:/Users/Braden/Documents/GitHub/electronTest/assets/sections/checkout/checkout.html')})
//     // $("#btn-sort").click(()=>{ui.setCurrentNavBtn(event.srcElement);webview.loadURL('file://C:/Users/Braden/Documents/GitHub/electronTest/assets/sections/sort/sort.html')})
//     // $("#btn-edit").click(()=>{ui.setCurrentNavBtn(event.srcElement);webview.loadURL('https://www.tinymce.com/')})
//     // $("#btn-preview").click(()=>{ui.setCurrentNavBtn(event.srcElement);webview.loadURL('https://www.thepathoftruth.com/letters/am-i-eternally-lost.htm')})
//     // $("#btn-publish").click(()=>{ui.setCurrentNavBtn(event.srcElement);webview.loadURL('https://wordpress.com/')})
//     // $("#btn-settings").click(()=>{ui.setCurrentNavBtn(event.srcElement);webview.loadURL('https://demos.creative-tim.com/vue-material-dashboard/?_ga=2.46042212.1762759285.1529897635-552932777.1529897635#/dashboard')})

//     // // Admin
//     // $("#ctrl-refresh").click(()=>{location.reload()})
//     // $("#ctrl-refresh-webview").click(()=>{webview.loadURL(webview.getURL())})
//     // $("#ctrl-destroy").click(()=>{/* Code here */})
//     // $("#ctrl-destroy-webview").click(()=>{ui.test("UI Module Loaded")})





    

// // ui.setCurrentNavBTN()

//         // document.getElementsByClassName('entry-title')[0].innerHTML
//         // document.getElementsByClassName('entry-content')[0].innerHTML

// } // End of Event Listeners



// function setActive(element) {
//     console.log(element.className)
//     element.className += " active"
//     console.log(element.className)
// }




// window.module.children.forEach((child) => {console.log(child) })