import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import PlusIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import React from 'react';
import 'typeface-roboto';


const drawerWidth = 250;

const styles = theme => ({
    drawer: {
        // border: '4px solid yellow',
        overflow: 'hidden',
        position: 'relative',
        float: 'left',
        height: '100vh',
        whiteSpace: 'nowrap',
        width: 78,
        // width: 250,
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
        // width: drawerWidth,
        width: 0,
        // width: theme.spacing.unit * 7,
        // [theme.breakpoints.up('sm')]: {
        //     width: theme.spacing.unit * 9,
        // },
    },
    toolbar: {
        background: theme.palette.secondary.light,
        maxHeight: 48,
        paddingRight: 12
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
        // color: theme.palette.accent,
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
        // const visible = true

        return (
            <React.Fragment>
                <Drawer variant="permanent" open={!this.props.compact} id="Drawer" classes={{ paper: classNames(classes.drawer, !this.props.compact && classes.drawerClose), }} >
                    {/* <DrawerMenuList onClick={this.handleDrawerClose}/> */}
                    <div id="Accounts" className={classes.accounts}>
                        {/* <Toolbar variant="dense">
                            <Typography variant="body2" className={classes.primaryText}>
                                Accounts
                             </Typography>
                        </Toolbar> */}
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
                        {/* <Toolbar variant="dense">
                            <Typography variant="body2" className={classes.primaryText}>
                                Apps
                             </Typography>
                        </Toolbar> */}
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
                    {this.props.toolbar && (
                        this.props.toolbar
                    )}
                </Toolbar>
                <React.Fragment>
                    {this.props.currentApp && (
                        this.props.currentApp
                    )}
                </React.Fragment>

            </React.Fragment>
        )
    }
}

// MiniDrawer.propTypes = {
//     classes: PropTypes.object.isRequired,
//     theme: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ShiftDrawer);