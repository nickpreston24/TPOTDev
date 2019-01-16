// React
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import 'typeface-roboto';
import AccountItems from '../presentation/AccountItems';
import AppItems from '../presentation/AppItems';
import SettingsItems from '../presentation/SettingsItems';
import Toolbar from '../presentation/Toolbar';
import ShiftDrawer from '../container/ShiftDrawer';
import Letters from './Letters';
import { firebase, db } from '../firebase'
import { wp } from '../wordpress'

// const ipc = window.require('electron').ipcRenderer;
// const isDev = require("electron-is-dev");

// Electron
// window.require('electron-react-devtools').install() // Works, but resets (IS IT SLOWING THINGS DOWN!!!!)
// window.require('devtron').install() // Not Working ATM

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
    typography: {
        useNextVariants: true,
    },
});

class Toolbox extends React.Component {

    state = { // set default state for App (single source of truth)
        menuToggled: false,
        currentApp: <Letters />,
        compactDrawer: true,
        autoUpdateModal: false,
        updateVersion: "",
        authUser: null,
        wordpressCredentials: null,
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

    componentDidMount() {

        // Authenticate and get WP Credentials
        firebase.auth.onAuthStateChanged(async (authUser) => {
            // Set Authorized State
            // console.log("AuthUser", authUser)
            authUser
                ? await this.setState({ authUser })
                : await this.setState({ authUser: null, wordpressCredentials: null });
            // Set Create User Profile from authUser Object Data
            authUser && await db.addUser(
                authUser.uid,
                authUser.firstname,
                authUser.lastname,
                authUser.email,
                authUser.provider,
                authUser.displayName,
            )
            // Pull down Wordpress Credentials from Auth'd Database
            // const wordpressCredentials = await db.wordpressCredentials
            // wordpressCredentials
            //     ? await this.setState({ wordpressCredentials })
            //     : await this.setState({ wordpressCredentials: null });
            // Use Wordpress Credentials to Create a Page
            // wp.createPage(this.state.wordpressCredentials, {/*DraftState*/}, {
            //     slug: 'wordpress-test-page-toolbox',
            //     title: 'WP Toolbox Test Page',
            //     excerpt: "This is a test page for wordpress, don't do anything with it!",
            // })
        })
    }

    render() {
        const childProps = { authUser: this.state.authUser }
        return (
                <div id="Toolbox">
                    <MuiThemeProvider theme={theme}>
                        
                        <ShiftDrawer
                            compact={this.state.compactDrawer}
                            accountItems={<AccountItems />}
                            appItems={<AppItems />}
                            settingsItems={<SettingsItems />}
                            settingsPage={''}
                            toolbar={<Toolbar />}
                            currentApp={<Letters {...childProps} />}
                        />
                    </MuiThemeProvider>
                </div>
        )
    }
}

export default Toolbox

