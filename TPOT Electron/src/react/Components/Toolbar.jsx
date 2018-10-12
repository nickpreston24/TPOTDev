import Badge from '@material-ui/core/Badge';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import ChatIcon from 'mdi-material-ui/Forum';
import HelpIcon from 'mdi-material-ui/HelpCircle';
import PropTypes from 'prop-types';
import React from 'react';
import DriveIcon from '../../media/drive.png';
import FirebaseIcon from '../../media/firebase_icon.png';
import UpdatesButton from './UpdatesButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import DownloadIcon from 'mdi-material-ui/Download';
import UpdateIcon from 'mdi-material-ui/CloudDownload';



const ipc = window.require('electron').ipcRenderer;
const isDev = require("electron-is-dev");




const styles = theme => ({
    root: {
        color: theme.palette.secondary.textDark
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
    },
    toolbar: {
        background: theme.palette.secondary.light,
        maxHeight: 48,
        paddingRight: 12
    },
    logBar: {
        color: "#a0da7c",
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
        autoUpdateModal: false,
        secondary: true,

        updateAvailable: false,
        updateVersion: "uknown version",
        updateDownloadProgress: {}
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

    componentDidMount() {
        // let setUpdateAvailable = this.setUpdateAvailable
        // let setUpdateDownloadProgress = this.setUpdateDownloadProgress
        // ipc.on('auto-update', function (e, msg) {
        //     console.log(msg)
        //     if (msg.event === "update-available") {
        //         console.log(msg)
        //         setUpdateAvailable(msg)
        //     }
        //     if (msg.event === "update-download-progress" && msg.data) {
        //         setUpdateDownloadProgress(msg)
        //     }
        // })
    }

    setUpdateAvailable = (msg) => {
        this.setState({
            updateAvailable: true,
            updateVersion: msg.data && msg.data.version ? msg.data.version : "unknown version"
        })
    }

    setUpdateDownloadProgress = (msg) => {
        this.setState({ updateDownloadProgress: msg.data })
    }

    openUpdateModal = () => {
        this.setState({
            autoUpdateModal: true,
        })
    }

    closeUpdateModal = () => {
        this.setState({ autoUpdateModal: false })
    }

    handleUpdateConfirmDownloadAndRestart = () => {
        ipc.send('update-confirm-download-and-restart')
    }

    handleUpdateConfirmDownload = () => {
        ipc.send('update-confirm-download')
    }

    handleUpdateConfirmRestart = () => {
        ipc.send('update-confirm-restart')
    }

    render() {
        const { classes } = this.props;
        const visible = true

        const progressString = this.state.updateDownloadProgress != null ? `Downloading Update: ${this.state.updateDownloadProgress.percent}% (${this.state.updateDownloadProgress.transferred}/${this.state.updateDownloadProgress.total}) - Download speed: ${this.state.updateDownloadProgress.bytesPerSecond}` : `Unknown Progress`

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
                <div id="rename" className={classes.toolSet}>
                    <Button id="Welcome" color="inherit" className={classes.button}>{`Welcome, ${"Victor H."}`}<AccountCircle className={classes.rightIcon} /></Button>
                    <UpdatesButton />
                    <Badge color="primary" badgeContent={`5`} classes={{ root: classes.margin, badge: false ? classes.badgeVisible : classes.badgeInvisible }}>
                        <Button color="inherit" className={classes.button}>{`Chat`}<ChatIcon className={classes.rightIcon} /></Button>
                    </Badge>
                    <Badge color="primary" badgeContent={`2`} classes={{ root: classes.margin, badge: false ? classes.badgeVisible : classes.badgeInvisible }}>
                        <Button color="inherit" className={classes.button}>{`Help!`}<HelpIcon className={classes.rightIcon} /></Button>
                    </Badge>
                </div>

                {/* <Dialog
                    open={this.state.autoUpdateModal}
                    onClose={this.closeUpdateModal}
                >
                    <DialogTitle id="responsive-dialog-title">{"TPOT Cloud Updates"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{`There is a new update available for download: Toolbox ${!isDev ? this.state.updateVersion : "[dev]"}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleUpdateConfirmDownloadAndRestart} id='Update All' color="primary">{`Update & Restart`}</Button>
                        <Button onClick={this.handleUpdateConfirmDownload} id='Update Download' color="primary" autoFocus>{`Download`}</Button>
                        <Button onClick={this.handleUpdateConfirmRestart} id='Update Restart' color="primary" autoFocus>{`Restart`}</Button>
                    </DialogActions>
                </Dialog> */}

            </div>
        );
    }
}

DrawerMenuList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenuList);