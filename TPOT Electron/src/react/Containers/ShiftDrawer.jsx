import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Draft from '../Editor/Draft'
import DrawerMenuList from '../DrawerMenuList';
import Button from '@material-ui/core/Button';
import PreviewIcon from '@material-ui/icons/LaptopMacTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import PlusIcon from '@material-ui/icons/Add'

const drawerWidth = 250;

const styles = theme => ({
    drawer: {
        // border: '4px solid yellow',
        overflow: 'hidden',
        position: 'relative',
        float: 'left',
        height: '100vh',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        background: theme.palette.secondary.main,
        boxShadow: '1.5px 0px 4px 0px rgba(0,0,0,0.2)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        // width: theme.spacing.unit * 7,
        // [theme.breakpoints.up('sm')]: {
        //     width: theme.spacing.unit * 9,
        // },
    },
    toolbar: {
        background: theme.palette.secondary.light
    },
    accounts: {
        width: "100%",
        position: "relative",
        // background: "grey",
    },
    apps: {
        width: "100%",
        position: "absolute",
        bottom: 48,
        // background: "navy",
    },
    settings: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: 48,
        // background: "lightgrey",
    },
    primaryText: {
        fontSize: 15,
        textTransform: "uppercase",
        // letterSpacing: 5,
        color: theme.palette.secondary.textMain,
    },
    secondaryText: {
        color: theme.palette.secondary.textMain,
    },
    icon: {
        color: theme.palette.secondary.textMain,
    },
    // preview: {
    //     position: "fixed",
    //     right: 20,
    //     bottom: 20
    // },
});

class ShiftDrawer extends React.Component {
    // constructor(props) {
    //         super(props);
    // }
    handleDrawerClose = () => {
        this.props.drawerOpen = false
        console.log("clicked!")
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Drawer variant="permanent" open={!this.props.compact} id="Drawer" classes={{ paper: classNames(classes.drawer, !this.props.compact && classes.drawerClose), }} >
                    {/* <DrawerMenuList onClick={this.handleDrawerClose}/> */}
                    <div id="Accounts" className={classes.accounts}>
                        <Toolbar variant="dense">
                            <Typography variant="body2" className={classes.primaryText}>
                                Accounts
                             </Typography>
                        </Toolbar>
                        {this.props.accountItems && (
                            this.props.accountItems
                        )}
                        <ListItem button>
                            <ListItemIcon className={classes.icon}>
                                <PlusIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Account" primaryTypographyProps={{ classes: { root: classes.secondaryText } }} />
                        </ListItem>
                    </div>
                    <div id="Apps" className={classes.apps}>
                        <Toolbar variant="dense">
                            <Typography variant="body2" className={classes.primaryText}>
                                Apps
                             </Typography>
                        </Toolbar>
                        {this.props.appItems && (
                            this.props.appItems
                        )}
                        <ListItem button>
                            <ListItemIcon className={classes.icon}>
                                <PlusIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add App" primaryTypographyProps={{ classes: { root: classes.secondaryText } }} />
                        </ListItem>
                    </div>
                    <div id="Settings" className={classes.settings}>
                        Settings
                    </div>
                </Drawer>
                <Toolbar className={classes.toolbar} variant="dense">
                </Toolbar>
                {this.props.currentApp && (
                    this.props.currentApp
                )}

            </React.Fragment>
        )
    }
}

// MiniDrawer.propTypes = {
//     classes: PropTypes.object.isRequired,
//     theme: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ShiftDrawer);