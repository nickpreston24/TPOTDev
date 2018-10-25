import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Save from '@material-ui/icons/Save';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/SettingsRounded'
import ModalLoad from '../Modals/ModalLoad'
import ModalSettings from '../Modals/ModalSettings'

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveIcon from '../../media/drive.png'
import FirebaseIcon from '../../media/firebase_icon.png'
import LettersIcon from '../../media/letters_icon.png'


const styles = theme => ({
    root: {
        paddingTop: 4,
        // paddingBottom: 8,
        // marginBottom: 8,
        borderTop: `1px solid ${theme.palette.secondary.light}`,
    },
    settings: {
        // position: "absolute",
        // bottom: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 0,
    },
    primaryText: {
        color: theme.palette.secondary.textLight,
    },
    secondaryText: {
        color: theme.palette.secondary.textDark,
    },
    letter: {
        fontSize: 32,
        color: theme.palette.secondary.textMain,
    },
    active: {
    }
});


class DrawerMenuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadModalOpen: false,
            settingsModalOpen: false,
            secondary: true,
        }
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

        return (
            <div className={classes.root}>
                <ListItem button className={classes.active} onClick={this.openSettingsModal}>
                    <ListItemIcon className={classes.letter}>
                        <SettingsIcon  />
                    </ListItemIcon>
                    <ListItemText
                        primary="Settings"
                        classes={{ primary: classes.secondaryText, secondary: classes.secondaryText }}
                        primaryTypographyProps={{ noWrap: true }}
                    />
                </ListItem>
                <ModalLoad open={this.state.loadModalOpen} onUpdate={this.updateLoadModal} />
                <ModalSettings open={this.state.settingsModalOpen} onUpdate={this.updateSettingsModal} value={1} />
            </div>
        );
    }
}

DrawerMenuList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenuList);