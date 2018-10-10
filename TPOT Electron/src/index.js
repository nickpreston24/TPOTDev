// React
import React from 'react';
import ReactDOM from 'react-dom';
import Toolbox from './apps/Toolbox';
import './index.css';

// Electron
window.require('electron-react-devtools').install() // Works, but resets
window.require('devtron').install() // Not Working ATM
const electron = window.require('electron')
const remote = electron.remote;
const app = remote.app
const electron_process = electron.process;
const electron_app = electron.app;
const ipc = electron.ipcRenderer;

ipc.on('message', function (event, text) {
    console.log(event, text)
})

// ipc.on('test', function (event, text) {
//     console.log("TEST-R")
// })

ipc.send('render')

// ipc.on('render', function (event, text) {
//     console.log("RENDER- M")
// })

// // wait for an updateReady message
// ipc.on('updateReady', function (event, text) {
//     // changes the text of the button
//     var container = document.getElementById('ready');
//     container.innerHTML = "new version ready!";
// })



// Initialization of React Toolbox Application into Index.js Render Process Browser Window
ReactDOM.render(<Toolbox />, document.getElementById('root'));