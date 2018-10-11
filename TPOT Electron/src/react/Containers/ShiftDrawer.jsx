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
import Badge from '@material-ui/core/Badge';

import DownloadIcon from 'mdi-material-ui/Download'


import 'typeface-roboto'

import Auth from '../Auth'

import DeleteIcon from '@material-ui/icons/Delete';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import PlusIcon from '@material-ui/icons/Add'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import UpdateIcon from 'mdi-material-ui/CloudDownload'
import ChatIcon from 'mdi-material-ui/Forum'
import HelpIcon from 'mdi-material-ui/HelpCircle'

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
        background: theme.palette.secondary.light,
        color: "#a0da7c",
        maxHeight: 48,
        paddingRight: 12
    },
    logBar: {
        width: "100%",
        fontStyle: "italic"
    },
    toolSet: {
        minWidth: 600,
        float: "right",
        "&*": {
            display: "inline-block",
        }
    },
    accounts: {
        width: "100%",
        position: "relative",
        // background: "grey",
    },
    apps: {
        width: "100%",
        position: "absolute",
        bottom: 64,
        // background: "navy",
    },
    settings: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: 64,
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
    button: {
        color: theme.palette.secondary.textDark,
        // color: "dodgerblue",
    },
    rightIcon: {
        marginLeft: 10
    },
    badgeVisible: {
        position: "absolute",
        right: 0,
        top: 0,
        height: 18,
        width: 18,
        opacity: 100,
        background: "dodgerblue"
    },
    badgeInvisible: {
        height: 0,
        width: 0,
        opacity: 0,
        transition: "all 1s ease-in-out 0s",
    },
    margin: {
        float: "right",
    },
    downloadSvg: {
        fontSize: 14,
        color: theme.palette.primary.contrastText
    },
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
        const visible = true

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
                        {this.props.settingsItems && (
                            this.props.settingsItems
                        )}
                    </div>
                </Drawer>
                <Toolbar id="Toolbar" className={classes.toolbar} variant="dense">
                    <div id="Log" className={classes.logBar}>{`[Letters] File saved to Disk`}</div>
                    <div id="Tools" className={classes.toolSet}>
                        <Button id="Welcome" color="inherit" className={classes.button}>{`Welcome, ${"Victor H."}`}<AccountCircle className={classes.rightIcon} /></Button>

                        <Badge color="primary" visible="false" badgeContent={<DownloadIcon className={classes.downloadSvg} />} classes={{ root: classes.margin, badge: visible ? classes.badgeVisible : classes.badgeInvisible }}>
                            <Button color="inherit" className={classes.button}>{`Updates`}<UpdateIcon className={classes.rightIcon} /></Button>
                        </Badge>
                        <Badge color="primary" badgeContent={`5`} classes={{ root: classes.margin, badge: visible ? classes.badgeVisible : classes.badgeInvisible }}>
                            <Button color="inherit" className={classes.button}>{`Chat`}<ChatIcon className={classes.rightIcon} /></Button>
                        </Badge>
                        <Badge color="primary" badgeContent={`2`} classes={{ root: classes.margin, badge: visible ? classes.badgeVisible : classes.badgeInvisible }}>
                            <Button color="inherit" className={classes.button}>{`Help!`}<HelpIcon className={classes.rightIcon} /></Button>
                        </Badge>
                    </div>
                    {/* {this.props.toolbarItems && (
                        this.props.toolbarItems
                    )} */}
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