import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import MobxStore from './stores'
import { Toolbox } from "./apps/Toolbox";
import "./index.css";

// Set up Store Here
const store = new MobxStore()

// Start Task Manager / Threads

// Initialization of Toolbox Application
ReactDOM.render(
    <Provider { ...store }>
        <Toolbox />
    </Provider>
    , document.getElementById("root"));
    
// Initialize Auto Update Service
const IPC = window.require("electron").ipcRenderer;
IPC.send("toolbox-initialized");
