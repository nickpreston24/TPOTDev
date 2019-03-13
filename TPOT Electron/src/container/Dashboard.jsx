import PropTypes from "prop-types";
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import Toolbar from "@material-ui/core/Toolbar";
import PlusIcon from '@material-ui/icons/Add';
import Letters from '../apps/Letters';
import { firebase, db } from '../firebase'
import { wp } from '../wordpress'
import Notifier from '../container/Notifier';
import ModalFirebase from '../presentation/ModalFirebase'

import { compose } from 'recompose'
import OSTitleBar from '../container/OSTitleBar'
import AccountItems from '../presentation/AccountItems';
import AppItems from '../presentation/AppItems';
import SettingsItems from '../presentation/SettingsItems';
import Header from '../presentation/Header';
import { BrowserRouter, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Sidebar from './Sidebar'
import { SidebarBadge } from "./SidebarBadge";

const styles = theme => ({
    root: {
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        flexFlow: 'row nowrap',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        justifyContent: 'flex-start',
        flexFlow: 'column nowrap',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
    },
    currentApp: {
        // border: '4px solid red !important',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
    },
    // root: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     flexWrap: 'nowrap',
    //     justifyContent: 'flex-end',
    //     '& > *': {
    //         border: '1px solid red !important'
    //     } 
    //     // flexGrow: 1
    //     // alignItems: 'stretch',
    //     // maxHeight: '100vh',
    // },
    // currentApp: {
    //     // flex: 1,
    //     overflow: 'visible',
    // },
    // header: {
    //     border: '4px solid yellow'
    // }
});

class Dashboard extends Component {
    // constructor(props) {
    //         super(props);
    // }
    handleDrawerClose = () => {
        this.props.drawerOpen = false
        console.log("clicked!")
    }

    render() {
        const { classes } = this.props;
        // const visible = true

        return (
            <div className={classes.root}>
                <Sidebar variant={'compact'} />
                <div id="Content" className={classes.content}>
                    {/* <Toolbar id="Header" style={{maxHeight: '10px !important', overflow: 'hidden'}} /> */}
                    <Header id="Header" style={{ background: '#3e4552 !important' }} />
                    <div id="Current App" className={classes.currentApp}>
                        <Letters />
                        <Notifier />
                    </div>
                </div>
                {/* <button onClick={() => setThemeData('primary', {
                    light: '#ff867c',
                    main: '#ef5350',
                    medium: '#d23140',
                    dark: '#b61827',
                    contrastText: '#fff',
                })}>Change Color</button> */}
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);