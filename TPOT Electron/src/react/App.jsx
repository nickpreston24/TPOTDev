// React
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from './Drawer'
import Header from './Header'
import './App.css'
import 'typeface-roboto'

// Electron

// Node Built-In

// Custom/Community

const theme = createMuiTheme({
    palette: {
        // primary: {
        //     light: '#ff867c',
        //     main: '#ef5350',
        //     // dark: '#CC3333',
        //     dark: '#b61827',
        //     contrastText: '#fff',
        // },
                primary: {
                    light: '#df78ef',
                    main: '#ab47bc',
                        // dark: '#CC3333',
                    dark: '#790e8b',
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

class App extends React.Component {

        constructor(props) {
                super(props);

                this.state = { // set default state for App (single source of truth)
                        menuToggled: false, 
                        editMode: "edited"
                }
        }

        onUpdateHeader = async (headerState) => {
                await this.setState({
                        menuToggled: headerState.menuToggled,
                        editMode: headerState.editMode
                })
        }

        render() {
                return (
                        <div className="App">
                                <MuiThemeProvider theme={theme}>
                                        <Header color="primary" onUpdate={this.onUpdateHeader} editMode={this.state.editMode}/> {/* TOP BAR WITH BURGER, TABS, & AUTH */}
                                        <Drawer color="primary" drawerOpen={this.state.menuToggled} editMode={this.state.editMode}/> {/* MAIN SECTION WITH MENU AND DOCUMENT AREA */}
                                </MuiThemeProvider>
                        </div>
                )
        }

}

export default App

