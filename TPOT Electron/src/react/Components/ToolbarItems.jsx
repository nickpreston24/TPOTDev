import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Save from '@material-ui/icons/Save';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/SettingsRounded'
import ModalLoad from '../ModalLoad'
import ModalSettings from '../ModalSettings'

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import FolderIcon from '@material-ui/icons/Folder';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveIcon from '../../media/drive.png'
import FirebaseIcon from '../../media/firebase_icon.png'

import UpdateIcon from 'mdi-material-ui/BriefcaseDownload'

import Auth from '../Auth'




const styles = theme => ({
    root: {
    },
    settings: {
        position: "absolute",
        bottom: 8,
    },
    avatar: {
        width: 32,
        height: 32,
    },
    primaryText: {
        color: theme.palette.secondary.textLight,
    },
    secondaryText: {
        color: theme.palette.secondary.textDark,
    },
    active: {
        background: theme.palette.primary.darkS
    }
});


class DrawerMenuList extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         loadModalOpen: false,
    //         settingsModalOpen: false,
    //         secondary: true,
    //     }
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

    openSettingsModal = () => {
        this.setState({ settingsModalOpen: true })
    }

    updateSettingsModal = (bool) => {
        this.setState({ settingsModalOpen: bool })
    }

    render() {
        const { classes } = this.props;

        const accounts = [
            {
                primary: "TPOT Cloud",
                secondary: "braden.t.preston@gmail.com",
                icon: FirebaseIcon,
                active: true,
                handler: () => {
                    this.handleSelection("disk");
                }
            },
            {
                primary: "Google Drive",
                secondary: "bpfilmsinc@gmail.com",
                icon: DriveIcon,
                handler: () => {
                    this.handleSelection("google");
                }
            }
        ]

        return (
            <div className={classes.root}>
                <Button
                    className={classes.button}
                    onClick={this.openLogoutMenu}
                    color="primary"
                >
                    Victor H. <Avatar />
                </Button>
            </div>
        );
    }
}

DrawerMenuList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenuList);