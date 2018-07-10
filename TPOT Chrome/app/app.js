// BEFORE DOM LOADS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // REQUIRE MODULES

    // WIP Event Module to be exported
    var events = {
        build: build, //storing a reference to the build function
        tester: tester,
        apps: apps
    }
    function checkout () {
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function(arg) {
            window.addEventListener(arg, events[arg]);
        });
    }
    function dispatch(name) {
        console.log("Dispatched Event: ", name)
        window.dispatchEvent(new Event(name))
    }
    //////////////

    // MESSAGING
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Caller
    // Example: User action messages global port (viewable by all scripts and instances of script types), message "toggle-app"
    function call(type, name, target, data) {
        var msg = {type: type, name: name, sender: "app", target: target, data: data}
        chrome.runtime.sendMessage(msg)
        log('Sent ' + type + ' to ' + target + '.js : ' + name)
    }

    // Dispatcher
    // Example: Port (all content scripts inlcuding this one) listens for message "toggle-app", then dispatches event "toggle-app" locally
    chrome.runtime.onMessage.addListener( function (msg) {
        // if event is meant for app.js or for all, echo message to all apps

        if (msg.target == "app" || msg.target == "all") { // exclude logs from ourself because background is echoing our commands not only to us, but other scripts
            log('Recieved ' + msg.type + ' from ' + msg.sender + '.js : '  + msg.name)
            dispatch(msg.name) // Example: events.dispatch('toggle-app')
        }
    })
    //////////////

    // Load up default config file and set Chrome Sync immediately
    // initialize()


// AFTER DOM LOADED
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", (event)=> {


    // Code Here

    // Checkout events from module and add them to the current window
    checkout('build', 'tester', 'apps')

    // Add Event Listeners here, so they are ready when the page finishes loading. They only use the call function, to pass events to the event manager
    document.getElementById("title").addEventListener("click", ()=>{call("event", "apps", "all")})


});


// AFTER WINDOW LOADED
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = ()=> {

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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// UI Functions

function build() {
    alert('event build listen')
}

function tester() {
    alert('event tester listen')
}

function apps() {
    alert('event apps listen')
}