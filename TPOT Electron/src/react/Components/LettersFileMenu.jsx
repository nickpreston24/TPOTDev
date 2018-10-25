import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Draft from '../Editor/Draft'
import DrawerMenuList from './DrawerMenuList';
import Button from '@material-ui/core/Button';
import PreviewIcon from '@material-ui/icons/LaptopMacTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountIcon from "@material-ui/icons/AccountBoxOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { Divider } from "@material-ui/core";

import ModalLoad from '../Modals/ModalLoad'
import DriveIcon from '../../media/drive.png'
import FirebaseIcon from '../../media/firebase_icon.png'
import LoadIcon from '@material-ui/icons/Folder';
import Save from '@material-ui/icons/Save'
import SettingsIcon from '@material-ui/icons/SettingsRounded'
import SvgIcon from '@material-ui/core/SvgIcon';


import 'typeface-roboto'

const drawerWidth = 200;

const styles = theme => ({
    drawerPaper: {
        // border: '4px solid yellow',
        overflow: 'hidden',
        position: 'relative',
        float: 'left',
        height: 'calc(100vh - 64px)',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
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
    preview: {
        position: "fixed",
        right: 20,
        bottom: 20
    },
});

class MiniDrawer extends React.Component {
    // constructor(props) {
    //         super(props);
    // }
    state = {
        loadModalOpen: false,
        settingsModalOpen: false,
        secondary: true,
    }

    openLoadModal = () => {
        this.setState({ loadModalOpen: true })
    }

    updateLoadModal = (bool) => {
        this.setState({ loadModalOpen: bool })
    }

    handleDrawerClose = () => {
        this.props.drawerOpen = false
        console.log("clicked!")
    }

    saveEditorStateToDisk = () => {
        window.postMessage({ event: "draftjs-editor-reload" }, "*") // sends to DraftJS WYSIWYG Editor
    }

    render() {
        const { classes } = this.props;

        const menus = [
            {
                name: "Load",
                secondary: "braden.t.preston@gmail.com",
                icon: <LoadIcon />,
                active: true,
                handler: () => {
                    this.openLoadModal();
                    this.props.onUpdate(false)
                }
            },
            {
                name: "Save",
                secondary: "braden.t.preston@gmail.com",
                icon: <Save />,
                active: true,
                // handler: () => {
                //     this.saveEditorStateToDisk()
                //     this.props.onUpdate(false)
                // }
            },
            {
                name: "Drafts",
                secondary: "braden.t.preston@gmail.com",
                icon: <DraftsIcon />,
                active: true,
                // handler: () => {
                //     // this.openLoadModal();
                //     this.props.onUpdate(false)
                // }
            },
            {
                name: "Publish",
                secondary: "braden.t.preston@gmail.com",
                icon: <SendIcon />,
                active: true,
                // handler: () => {
                //     // this.openLoadModal();
                //     this.props.onUpdate(false)
                // }
            },
        ]

        return (
            <React.Fragment>
                {/* <DrawerMenuList onClick={this.handleDrawerClose} /> */}

                <Menu
                    id="logout-menu"
                    anchorEl={this.props.anchorEl}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    transformOrigin={{ vertical: -64, horizontal: "left" }}
                >
                    {menus.map(menu => {
                        return (
                            <MenuItem className={classes.menuItem} onClick={menu.handler} key={menu.name}>
                                <ListItemIcon className={classes.icon}>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary={menu.name} />
                            </MenuItem>
                        );
                    })}

                    {/* <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <AccountIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Account" />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Details" />
                    </MenuItem>
                    <Divider />
                    <MenuItem className={classes.menuItem} onClick={this.handleLogout}  >
                        <ListItemIcon className={classes.icon}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                    </MenuItem> */}
                </Menu>

                <ModalLoad open={this.state.loadModalOpen} onUpdate={this.updateLoadModal} />

                {/* <Tooltip title="Preview Page" TransitionComponent={Zoom}>
                    <Button variant="fab" color="primary" aria-label="Preview" className={classes.preview}>
                        <PreviewIcon />
                    </Button>
                </Tooltip> */}
            </React.Fragment>
        )
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);



















// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from './DrawerMenuList';

// const styles = {
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// };

// class TemporaryDrawer extends React.Component {
//   state = {
//     left: true,
//   };

//   toggleDrawer = (side, open) => () => {
//     this.setState({
//       [side]: open,
//     });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <div>
//         <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
//         <Drawer hideBackdrop="false" variant="persistent" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={this.toggleDrawer('left', false)}
//             onKeyDown={this.toggleDrawer('left', false)}
//           >
//           <List>{mailFolderListItems}</List>
//           </div>
//         </Drawer>
//       </div>
//     );
//   }
// }

// TemporaryDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(TemporaryDrawer);


