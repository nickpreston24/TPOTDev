// React
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from './Drawer'
import Header from './Header'
import './App.css'
import 'typeface-roboto'


// Electron
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const ipc = electron.ipcRenderer

// Node Built-In
// Code Here

// Custom/Community
// Code Here

const theme = createMuiTheme({
        palette: {
                primary: {
                        light: '#ff867c',
                        main: '#ef5350',
                        // dark: '#CC3333',
                        dark: '#b61827',
                        contrastText: '#fff',
                },
                secondary: {
                        light: '#ff867c',
                        main: '#ef5350',
                        dark: '#b61827',
                        contrastText: '#fff',
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
        //       background: 'grey', // Some CSS
        //     },
        //   },
        //   MuiStep: { // Name of the component ⚛️ / style sheet
        //     root: { // Name of the rule
        //       // color: "blue",
        //       background: 'magenta', // Some CSS
        //     },
        //   },
        //   MuiStepButton: { // Name of the component ⚛️ / style sheet
        //     root: { // Name of the rule
        //       // color: "blue",
        //       background: 'green', // Some CSS
        //     },
        //   },
        // },
});

const config = {
        headerTitle: 'This is Header Title 🐫',
        headerName: 'Braden'
}

class App extends React.Component {

        constructor(props) {
                super(props);

                this.state = {
                        menuToggled: false // set default toggle state
                }
        }

        componentDidMount() {
                console.log("app mounted")
                window.postMessage("This is  a Message", "*")
                //         ipc.send('cat', 'ping')
        }

        toggleMenu = () => {
                this.setState(prevState => ({
                        menuToggled: !prevState.menuToggled // toggle between states
                }))
        }

        btnConvert = (e) => {
                e.preventDefault()
                alert('sample.docx')
        }

        render() {
                return (
                        <div className="App">
                                <MuiThemeProvider theme={theme}>
                                        <Header color="primary" onUpdate={this.toggleMenu} /> {/* TOP BAR WITH BURGER, TABS, & AUTH */}
                                        <Drawer color="primary" open={this.state.menuToggled} /> {/* MAIN SECTION WITH MENU AND DOCUMENT AREA */}
                                </MuiThemeProvider>
                        </div>
                )
        }

}

export default App

