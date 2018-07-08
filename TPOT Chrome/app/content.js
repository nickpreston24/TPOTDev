// BEFORE DOM LOADS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // REQUIRE MODULES

    // MESSAGING
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Caller
    // Example: User action messages global port (viewable by all scripts and instances of script types), message "toggle-app"
    function call(type, name, target, data) {
        var msg = {type: type, name: name, sender: "content", target: target, data: data}
        chrome.runtime.sendMessage(msg)
        log('Sent ' + type + ' to ' + target + '.js : ' + name)
    }

    // Dispatcher
    // Example: Port (all content scripts inlcuding this one) listens for message "toggle-app", then dispatches event "toggle-app" locally
    chrome.runtime.onMessage.addListener( function (msg) {
        // if event is meant for app.js or for all, echo message to all apps

        if (msg.target == "content" || msg.target == "all") { // exclude logs from ourself because background is echoing our commands not only to us, but other scripts
            log('Recieved ' + msg.type + ' from ' + msg.sender + '.js : '  + msg.name)
            // dispatch(msg.name) // Example: events.dispatch('toggle-app')
        }
    })
    //////////////

    // Load up default config file and set Chrome Sync immediately
    // initialize()


// AFTER DOM LOADED
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", (event)=> {

    // Check if app is enabled from Chrome sync.

    // Construct a new App from Class
    chrome.storage.sync.get(['appEnabled'], (result)=> {
        // if (result.appEnabled === true) { // if app is enabled and app doesnt exist on the page, create an app and append to page
            var x = document.createElement("iframe")
            x.id = "tpot-app"
            // x.src = "app.html"
            x.src = chrome.runtime.getURL('app.html')
            // x.innerHTML = "<h3>Main App</h3>"
            // x.style.cssText = "background: #dc4a37; display: block; position: fixed; top: 50%; right: 8px; z-index: 999; border-radius: 24px; height: 48px; width: 48px; transition: all 0.5s ease-in; -webkit-user-drag: element"
            x.style.cssText = "top: calc((100vh - 30px) / 2); left: 50%; transform: translate(-50%, -50%); box-sizing: border-box; border: 1px solid transparent; height: 482px; width: 332px; overflow: hidden; background: transparent; display: block; position: fixed; z-index: 999; transition: all 0.5s ease-in; -webkit-user-drag: element"
            document.body.prepend(x)


        // }
    });

});


// AFTER WINDOW LOADED
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = (event)=> {

    // Lazy Load Other Injection Routines for App Elements?
    chrome.storage.sync.get(['appEnabled'], function(result) {
        console.log('Value currently is ' + result.appEnabled);
    });


};


// UTILITIES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let log = console.log.bind(console, '[TPOT]')
let group = console.group.bind(console, '[TPOT]')
let groupEnd = console.groupEnd.bind(console, '[TPOT]')
let error = console.error.bind(console, '[TPOT]')

// http://reload.extensions

// LOCAL FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////++



