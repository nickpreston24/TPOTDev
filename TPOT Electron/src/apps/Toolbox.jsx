import React, { Component, Fragment } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import OSTitleBar from '../container/OSTitleBar'
import AccountItems from '../presentation/AccountItems';
import AppItems from '../presentation/AppItems';
import SettingsItems from '../presentation/SettingsItems';
import Toolbar from '../presentation/Toolbar';
import ShiftDrawer from '../container/ShiftDrawer';
import Letters from './Letters';
import { firebase, db } from '../firebase'
import { wp } from '../wordpress'
import Notifier from '../container/Notifier';
import ModalFirebase from '../presentation/ModalFirebase'
import 'typeface-roboto';

// Electron
window.require('electron-react-devtools').install() // Works, but resets (IS IT SLOWING THINGS DOWN!!!!)
// window.require('devtron').install() // Not Working ATM

// Start Theming Service

const styles = theme => ({
    root: {
        color: "red",
        // css atrributes
    },
})

class Toolbox extends Component {

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
        // firebase.auth.onAuthStateChanged(async (authUser) => {
        //     // Set Authorized State
        //     // console.log("AuthUser", authUser)
        //     authUser
        //         ? await this.setState({ authUser })
        //         : await this.setState({ authUser: null, wordpressCredentials: null });
        //     // Set Create User Profile from authUser Object Data
        //     authUser && await db.addUser(
        //         authUser.uid,
        //         authUser.firstname,
        //         authUser.lastname,
        //         authUser.email,
        //         authUser.provider,
        //         authUser.displayName,
        //     )
        //     // Pull down Wordpress Credentials from Auth'd Database
        //     // const wordpressCredentials = await db.wordpressCredentials
        //     // wordpressCredentials
        //     //     ? await this.setState({ wordpressCredentials })
        //     //     : await this.setState({ wordpressCredentials: null });
        //     // Use Wordpress Credentials to Create a Page
        //     // wp.createPage(this.state.wordpressCredentials, {/*DraftState*/}, {
        //     //     slug: 'wordpress-test-page-toolbox',
        //     //     title: 'WP Toolbox Test Page',
        //     //     excerpt: "This is a test page for wordpress, don't do anything with it!",
        //     // })
        // })
    }

    render() {
        const childProps = { authUser: this.state.authUser }
        const { classes } = this.props
        const { theme, setThemeData } = this.props.settingsStore

        return (
            <div id="Toolbox" classname={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <OSTitleBar />
                    <div id="Dashboard">
                        {/* <button onClick={() => setThemeData('primary', {
                        light: '#ff867c',
                        main: '#ef5350',
                        medium: '#d23140',
                        dark: '#b61827',
                        contrastText: '#fff',
                    })}>Change Color</button> */}
                        <ShiftDrawer
                            compact={this.state.compactDrawer}
                            accountItems={<AccountItems />}
                            appItems={<AppItems />}
                            settingsItems={<SettingsItems />}
                            settingsPage={''}
                            toolbar={<Toolbar />}
                            currentApp={<Letters {...childProps} />}
                        />
                        <Notifier />
                        <ModalFirebase />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default compose(
    withStyles(styles),
    inject('settingsStore'),
    observer
)(Toolbox);

