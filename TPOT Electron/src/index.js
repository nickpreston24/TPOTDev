// React
import React from 'react';
import ReactDOM from 'react-dom';
import Toolbox from './apps/Toolbox';
import './index.css';

// Electron
const electron = window.require('electron')
const IPC = electron.ipcRenderer;
const remote = electron.remote
const app = remote.app

// Initialization of React Toolbox Application into Index.js Render Process Browser Window
ReactDOM.render(<Toolbox />, document.getElementById('root'));

// Initialize Auto Update Service
IPC.send('toolbox-initialized')
