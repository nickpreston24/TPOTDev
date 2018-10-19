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
import ModalLoad from '../ModalLoad'
import ModalSettings from '../ModalSettings'

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveIcon from '../../media/drive.png'
import FirebaseIcon from '../../media/firebase_icon.png'
import LettersIcon from '../../media/letters_icon.png'
import ReorderIcon from '../../media/reorder_icon.png'


const styles = theme => ({
    root: {
        // borderRight: '4px solid #1E90FF'
    },
    settings: {
        position: "absolute",
        bottom: 8,
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
        color: "#91ce34",
    },
    active: {
        background: theme.palette.secondary.dark,
        borderRight: `4px solid ${theme.palette.accent}`
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

        const accounts = [
            {
                primary: "Ember",
                secondary: "edit letters & translations",
                icon: LettersIcon,
                active: true,
                // handler: () => {
                //     this.handleSelection("disk");
                // }
            },
            // {
            //     primary: "Pidgeon",
            //     secondary: "reorder emails by date",
            //     icon: ReorderIcon,
            //     active: false,
            //     handler: () => {
            //         this.handleSelection("disk");
            //     }
            // },
        ]

        return (
            <div className={classes.root}>
                {accounts.map(account => {
                    return (
                        <ListItem button className={account.active ? classes.active : null}  key={account.primary}>
                            <ListItemAvatar>
                                {/* <SvgIcon component={account.icon} className={classes.letter} /> */}
                                <Avatar src={account.icon} className={classes.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={account.primary}
                                secondary={account.secondary ? account.secondary : null}
                                classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
                                primaryTypographyProps={{ noWrap: true }}
                                secondaryTypographyProps={{ noWrap: false }}
                            />
                            {/* <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction> */}
                        </ListItem>
                    );
                })}
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