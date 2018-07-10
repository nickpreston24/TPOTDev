// REQUIRE MODULES

// MESSAGING
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Caller
// Example: User action messages global port (viewable by all scripts and instances of script types), message "toggle-app"
function call(type, name, target, data) {
    var msg = {type: type, name: name, sender: "background", target: target, data: data}
    chrome.runtime.sendMessage(msg)
    log('Sent ' + type + ' to ' + target + '.js : ' + name)
}

// Dispatcher
// Example: Port (all content scripts inlcuding this one) listens for message "toggle-app", then dispatches event "toggle-app" locally
chrome.runtime.onMessage.addListener( function (msg) {
    if (msg.target != "background" || msg.target == "all") {
        // Echo message back to all scripts and tabs so they can decide what to do with it if anything
        chrome.tabs.query({}, function(tabs) {
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, msg); // To tags
            }
            log('Sent ' + msg.type + ' to ' + msg.target + '.js : '  + msg.name)
        });
        // chrome.runtime.sendMessage(msg) // To scripts
    }

    if (msg.target == "background" || msg.target == "all") {
        log('Recieved ' + msg.type + ' from ' + msg.sender + '.js : '  + msg.name)
        // event.dispatch(msg.text) // TODO:
    }
})


// Background Tasks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+

chrome.runtime.onStartup.addListener(()=>{
    console.log('Started Extension') // Doesn't work just yet.
})

chrome.runtime.onInstalled.addListener(()=>{
    alert('Installed Extension')
    
    console.log('Installed Extension')
})

chrome.browserAction.onClicked.addListener((tab)=>{
    // alert('Extension button pressed')
    console.log('browserAction pressed')
    window.open('http://reload.extensions')
    // chrome.tabs.sendMessage(tab.id, { action: 'toggle' }, function() {})
})


// UTILITIES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let log = console.log.bind(console, '[TPOT]')
let group = console.group.bind(console, '[TPOT]')
let groupEnd = console.groupEnd.bind(console, '[TPOT]')
let error = console.error.bind(console, '[TPOT]')

// http://reload.extensions

// LOCAL FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////














