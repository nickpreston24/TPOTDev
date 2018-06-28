/////////////////////////////////////////
//           background.js             //
/////////////////////////////////////////
//  • Loaded on install/startup        //
//  • Primary back-end service         //
//  • Communicates with other files    //
//  • Saves/Synces preferences config  //
//  •                                  //
//  •                                  //
/////////////////////////////////////////

var appEnabled = true;
var currentTab = null;
var startWithChrome = true;
var sidebarEnabled = true;

/////////////////////////////////////////
//            Installation             //
/////////////////////////////////////////

// Extention was Installed!
chrome.runtime.onInstalled.addListener(function installed() {
  var msg = "Sucessfully installed version: ";
  msg += chrome.runtime.getManifest().version;
  msg += "\n\nGood Work!"
  console.log(msg);
  // window.confirm(msg);
  initialize();
});

/////////////////////////////////////////
//           Tab Managment             //
/////////////////////////////////////////



/////////////////////////////////////////
//     Messages to Content Scripts     //
/////////////////////////////////////////

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle");
  })
});

// Iniitialize everything and inject app into every tab
function initialize() {
  injectAppIntoAllTabs()
  // Get all windows and all tabs
  // Inject App
  // Open Sidebar
}


// Get Active Tabs as you Switch to Them
chrome.tabs.onActivated.addListener(getActiveTab());
// Get Initial Active Tab
function getActiveTab() {
  chrome.tabs.getCurrent(function() {
    if (isAppInjected() != true) {
      injectApp();
    }
  });
}


// Get ALL Tabs across all windows
function injectAppIntoAllTabs() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      if (isAppInjected() != true) {
        injectApp();
      }
    });
  });
}

// Inject App into a single tab and enable sidebar if toggled
function injectApp() {
  // alert('Injected');
  // get DOM of tab
  // add iFrame
  // add sidbar
}

// Obliterate every trace of code
function removeApp() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      if (isAppInjected() == true) {
        // get DOM of tab
        // remove iframe
        // remove sidebar
      }
    });
  });
}



// var CurrentTab = chrome.tabs.query({
//   currentWindow: true,
//   active: true
// }, function() {
//   return tabs[0];
// });;


// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });



// {  "content_scripts": [{
//     "run_at": "document_end",
//     "matches": [
//           "https://*/*",
//           "http://*/*"
//       ],
//     "js": ["content.js"]
//   }],}
