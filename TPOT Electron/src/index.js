// React
import React from 'react';
import ReactDOM from 'react-dom';
import Toolbox from './apps/Toolbox';
import './index.css';

// Electron
const electron = window.require('electron')
const IPC = electron.ipcRenderer;
const remote = electron.remote;
const app = remote.app;
const fs = remote.require('fs');

const loginFile = app.getAppPath() + "/src/config/tokens.txt";
const token = fs.readFile(loginFile);
const url = `https://tpot-toolbox.firebaseio.com/users/ada/name.json?access_token=${token}`
console.log('db url: ', url);

// Initialization of React Toolbox Application into Index.js Render Process Browser Window
ReactDOM.render( < Toolbox / > , document.getElementById('root'));

// Initialize Auto Update Service
IPC.send('toolbox-initialized')