// REQUIRE MODULES

// Code here




// log('popup window loaded!')

// Custom Events
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// App Enabled
document.getElementById("btn-enable").addEventListener("click", (e)=>{
    // log(chrome.storage.managed)
    call("event", "enable-app", "content")



    
    // chrome.storage.sync.get(['appEnabled'], (result)=> {
    //     if (result.appEnabled === true) {
    //         e.target.innerHTML = "Disable App"
    //         chrome.storage.sync.set({appEnabled: false}, ()=> {
    //             // log("appEnabled: " + result.appEnabled)
    //         });
    //     } else if (result.appEnabled === false) {
    //         e.target.innerHTML = "Enable App"
    //         chrome.storage.sync.set({appEnabled: true}, ()=> {
    //             // log("appEnabled: " + result.appEnabled)
    //         });
    //     } else {
    //         // chrome.storage.sync.set({appEnabled: config.getDefault(appEnabled)}, ()=> { // Default to whatever is in the startup configuraton if key is not set
    //         e.target.innerHTML = "Disable App"
    //         chrome.storage.sync.set({appEnabled: false}, ()=> { // TODO: Replace
    //             error("appEnabled key is not set, defaulting key to false on click")
    //             // log("appEnabled: " + result.appEnabled)
    //         });
    //     }
    // });

    // chrome.storage.local.get('whitelistedURLS', function (result) {
    //     // Reset whitelist before we begin
    //     // chrome.storage.local.set({whitelistedURLS: ""}, function () {
    //         chrome.storage.local.get('whitelistedURLS', function (result) {
    //             // console.log("whitelistedURLS: \n", result.whitelistedURLS)
    //             var whitelist = []
    //             whitelist.push("thepathoftruth", "facebook", "twitter", "youtube")
    //             chrome.storage.local.set({whitelistedURLS: whitelist}, function () {
    //                 chrome.storage.local.get('whitelistedURLS', function (result) {
    //                     // console.log("whitelistedURLS: \n", result.whitelistedURLS)
    //                 });
    //             });
    //         });
    //     // });
    // });


})

// Badge Location



// MESSAGING
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Caller
// Example: User action messages global port (viewable by all scripts and instances of script types), message "toggle-app"

function call(type, name, target, data) {
    var msg = {type: type, name: name, sender: "popup", target: target, data: data}
    chrome.runtime.sendMessage(msg)
    log('Sent ' + type + ' to ' + target + '.js : ' + name)
}



// Dispatcher
// Example: Port (all content scripts inlcuding this one) listens for message "toggle-app", then dispatches event "toggle-app" locally

chrome.runtime.onMessage.addListener( function (msg) {
    if (msg.target == "popup" || msg.target == "all") { // exclude logs from ourself because background is echoing our commands not only to us, but other scripts
        log('Recieved ' + msg.type + ' type from ' + msg.sender + '.js : '  + msg.name)
        // event.dispatch(msg.text) // TODO:
    } 
})



// Listener
// Example: Script (all scripts inlcuding this one) listens for event "toggle-app" and executes code to toggle the app



// Code Here



// Utilities
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let log = console.log.bind(console, '[TPOT]')
let group = console.group.bind(console, '[TPOT]')
let groupEnd = console.groupEnd.bind(console, '[TPOT]')
let error = console.error.bind(console, '[TPOT]')

// http://reload.extensions

// LOCAL FUNCTIONS






