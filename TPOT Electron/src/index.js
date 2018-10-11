// React
import React from 'react';
import ReactDOM from 'react-dom';
import Toolbox from './apps/Toolbox';
import './index.css';

// Electron
const IPC = window.require('electron').ipcRenderer;

// Initialization of React Toolbox Application into Index.js Render Process Browser Window
ReactDOM.render(<Toolbox />, document.getElementById('root'));

// Initialize Auto Update Service
IPC.send('toolbox-initialized')