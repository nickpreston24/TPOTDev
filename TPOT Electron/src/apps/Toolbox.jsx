// React
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import 'typeface-roboto';
import AccountItems from '../react/Components/AccountItems';
import AppItems from '../react/Components/AppItems';
import SettingsItems from '../react/Components/SettingsItems';
import Toolbar from '../react/Components/Toolbar';
import ShiftDrawer from '../react/Containers/ShiftDrawer';
import Letters from './Letters';


const ipc = window.require('electron').ipcRenderer;
const isDev = require("electron-is-dev");
// Electron
// window.require('electron-react-devtools').install() // Works, but resets
// window.require('devtron').install() // Not Working ATM
// const electron = window.require('electron')
// const remote = electron.remote;
// const app = remote.app
// const electron_process = electron.process;
// const electron_app = electron.app;
// const ipc = electron.ipcRenderer;

// // Electron
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
const Provider = React.Fragment
const store = {}

// Set up Store Here

// Initialization of Toolbox Application

// Start Task Manager / Threads

// Initilize User Preferences

// Start Theming Service
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff867c',
            main: '#ef5350',
            // dark: '#CC3333',
            medium: '#d23140',
            dark: '#b61827',
            contrastText: '#fff',
        },
        // primary: {
        //     light: '#df78ef',
        //     main: '#ab47bc',
        //     // dark: '#CC3333',
        //     dark: '#790e8b',
        //     contrastText: '#fff',
        // },
        secondary: {
            light: '#484b5b',
            main: '#343745',
            dark: '#272934',
            contrastText: '#fff',
            textLight: '#FFFFFF',
            textMain: '#A7AAB8',
            textDark: '#C2C6D7',
        },
        type: 'light',
        accent: "dodgerblue"
    },
    status: {
        danger: 'orange',
        warning: '#deb15b',
        ready: '#98C379',
    },
    // overrides: {
    //   MuiStepper: { // Name of the component ⚛️ / style sheet
    //     root: { // Name of the rule
    //       // color: "blue",
    //     },
    //   },
});

class Toolbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = { // set default state for App (single source of truth)
            menuToggled: false,
            currentApp: <Letters />,
            compactDrawer: true,
            autoUpdateModal: false,
            updateVersion: ""
        }

        // this.openAutoUpdateModal = this.openAutoUpdateModal.bind(this)

    }

    onUpdateHeader = async (headerState) => {
        await this.setState({
            menuToggled: headerState.menuToggled,
            editMode: headerState.editMode
        })
    }

    closeAutoUpdateModal = () => {
        this.setState({ autoUpdateModal: false })
    }

    // componentDidMount() {
    //     let openAutoUpdateModal = this.openAutoUpdateModal
    //     ipc.on('auto-update', function (e, msg) {
    //         console.log(msg)
    //         if (msg.event === "update-available") {
    //             openAutoUpdateModal(msg)
    //         }
    //     })
    // }

    // openAutoUpdateModal = (msg) => {
    //     this.setState({
    //         autoUpdateModal: true,
    //         updateVersion: msg.data && msg.data.version ? msg.data.version : "no version"
    //     })
    // }

    render() {
        return (
            <div id="Toolbox">
                <Provider>
                    <MuiThemeProvider theme={theme}>
                        <ShiftDrawer
                            compact={this.state.compactDrawer}
                            accountItems={<AccountItems />}
                            appItems={<AppItems />}
                            settingsItems={<SettingsItems />}
                            settingsPage={''}
                            toolbar={<Toolbar/>}
                            currentApp={this.state.currentApp}
                        >
                        </ShiftDrawer>
                    </MuiThemeProvider>
                </Provider>
            </div>
        )
    }
}

export default Toolbox

