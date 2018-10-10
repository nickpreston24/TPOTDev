// React
import React from 'react';
import ReactDOM from 'react-dom';
import Toolbox from './apps/Toolbox';
import './index.css';

// Initialization of React Toolbox Application into Index.js Render Process Browser Window
ReactDOM.render(<Toolbox />, document.getElementById('root'));

// Initialize Auto Update Service
const ipc = window.require('electron').ipcRenderer;
ipc.send('toolbox-initialized')