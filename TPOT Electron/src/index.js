// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/App';
import './index.css';

// Electron
// window.require('electron-react-devtools').install() // Works, but resets
// window.require('devtron').install() // Not Working ATM
// const electron = window.require('electron')
// const remote = electron.remote;
// const app = remote.app
// const electron_process = electron.process;
// const electron_app = electron.app;
// const ipc = electron.ipcRenderer;
// const dialog = remote.dialog;

// Node Built-In
// const builtinModules = remote.require('builtin-modules')
// const fs = remote.require('fs')
// const path = remote.require('path') 

// Custom/Community


// Set up Store Here (if needed)
    // Code Here

// Initialization of React App
ReactDOM.render(<App />, document.getElementById('root'));

// Initialize other tasks that aren't immediately important


// //[MP] - psuedocode (put inside a class, if possible, else just use inside editor.html)
// async function ConvertDocument(filename) {
//         await converter.convert(filename)
//                 .then((response) => {
//                         //1.  run conversion
//                         //2.  fire event UI or other class can pick up via event listener 
//                         //    & pair that event listener with a handler function (outside this function and promise!)
//                         //pack the event with the new file's location within this promise or this function
//                         window.dispatchEvent('conversionCompleteEvent')

//                 }).then((error) => {
//                         //rethrow error to an event the UI can pick up
//                 });
// }