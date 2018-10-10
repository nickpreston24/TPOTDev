// React
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ShiftDrawer from '../react/Containers/ShiftDrawer'
import AccountItems from '../react/Components/AccountItems'
import AppItems from '../react/Components/AppItems'
import SettingsItems from '../react/Components/SettingsItems'
import Letters from './Letters'
import 'typeface-roboto'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


const ipc = window.require('electron').ipcRenderer;
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
        type: 'light'
    },
    status: {
        danger: 'orange',
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

    confirmAutoUpdateCommand = (event) => {
        console.log(event.currentTarget.id)
        ipc.send(event.currentTarget.id)
        this.setState({ autoUpdateModal: true })
    }

    componentDidMount() {
        let openAutoUpdateModal = this.openAutoUpdateModal
        ipc.on('auto-update', function (e, msg) {
            console.log(msg)
            if (msg.event === "update-available") {
                openAutoUpdateModal(msg)
            }
        })
    }

    openAutoUpdateModal = (msg) => {
        this.setState({
            autoUpdateModal: true,
            updateVersion: msg.data && msg.data.version ? msg.data.version : "no version"
        })
    }

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
                            currentApp={this.state.currentApp}
                        >
                        </ShiftDrawer>
                    </MuiThemeProvider>

                    <Dialog
                        open={this.state.autoUpdateModal}
                        onClose={this.closeAutoUpdateModal}
                    >
                        <DialogTitle id="responsive-dialog-title">{"TPOT Cloud Updates"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{`
                            There is a new update available for download: Toolbox ${this.state.updateVersion}
                            `}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={this.confirmAutoUpdateCommand} id='update-confirm-download-and-restart'color="primary">
                                Install
                            </Button> */}
                            <Button onClick={this.confirmAutoUpdateCommand} id='update-confirm-download-and-restart'color="primary">
                                Install
                            </Button>
                            <Button onClick={this.confirmAutoUpdateCommand} id='update-confirm-download' color="primary" autoFocus>
                                Download
                             </Button>
                            <Button onClick={this.confirmAutoUpdateCommand} id='update-confirm-restart' color="primary" autoFocus>
                                Reload
                             </Button>
                        </DialogActions>
                    </Dialog>

                </Provider>
            </div>
        )
    }
}

export default Toolbox

