//////////////////////////////
//      WebView Manager     //
//////////////////////////////

var status = {
    "appState": "open", // open/closed/compact
    "currentWindow": "Sort",
    "sideBar": "open", // open/compact/closed
    "loader": false,
    "openWindows": [
        "checkout",
        "sort"
    ],
}

const test = (msg) => {
    console.log(msg)
}

module.exports = {
    status,

    test
}