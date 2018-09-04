import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import SvgIcon from '@material-ui/core/SvgIcon'
import ClipBoard from '../media/clipboard.png'
import HardDrive from '../media/hdd.png'
import GoogleDrive from '../media/drive.png'
import Slider from '@material-ui/lab/Slider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tune from 'mdi-material-ui/Tune'
import DownloadIcon from 'mdi-material-ui/Download'
import Palette from 'mdi-material-ui/Palette'
import ProfilePic from '../media/avatar.jpg'
import PackageIcon from '../media/package.png'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import DrawerExpandIcon from 'mdi-material-ui/TableColumnPlusAfter'
import FullScreenIcon from 'mdi-material-ui/TelevisionGuide'
import InlineEditIcon from 'mdi-material-ui/FormatAlignTop'
import AutosaveIcon from 'mdi-material-ui/ContentSaveOutline'
// import TabContainer from '@material-ui/core/'


const app = window.require('electron').remote.app
const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = theme => ({
        root: {
                display: 'flex',
                flexWrap: 'wrap',
                flexGrow: 1,
                // overflowY: "hidd",
        },
        card: {
                width: "100%",
                overflowY: "scroll",
                '&::-webkit-scrollbar': {
                        width: '0 !important'
                },
                borderRadius: 0,
        },
        updatesarea: {
                paddingBottom: 0,
        },
        togglearea: {
                padding: 8,
                paddingRight: 8,
        },
        icon: {
                height: 128,
                width: 128,
                display: "block",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 0,
                marginBottom: 24,
        },
        chip: {
                marginLeft: 4,
                borderRadius: 4,
                height: 20,
                color: theme.palette.primary.main,
                background: "#eee",
                '& *': {
                        padding: 4,
                }
        },
        divider: {
                marginTop: 24,
                marginBottom: 0,
        },
        centerButton: {
                marginTop: 12,
        },
        downloadSvg: {
                fontSize: 16,
                color: theme.palette.primary.contrastText
        },
        buttonNew: {
                // color: "#555",
                disabled: {
                        color: "green",
                        background: "green",
                },
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
        },
});

class Preferences extends React.Component {

        constructor(props) {
                super(props);

                this.state = {
                        value: 0,
                        updateAvailable: true,
                        checked: ['wifi'],
                }
        }

        handleClose = () => {
                this.props.onUpdate(false);
        };

        handleChange = (event, value) => {
                this.setState({ value: value });
        };

        handleToggle = value => () => {
                const { checked } = this.state;
                const currentIndex = checked.indexOf(value);
                const newChecked = [...checked];

                if (currentIndex === -1) {
                        newChecked.push(value);
                } else {
                        newChecked.splice(currentIndex, 1);
                }

                this.setState({
                        checked: newChecked,
                });
        };

        render() {
                const { classes } = this.props;

                const settings = [
                        {
                                name: "User Interface",
                                options: [
                                        {
                                                description: "Compact Menu",
                                                icon: <DrawerExpandIcon />,
                                                config: "test1-1",
                                                type: true,
                                                handler: "this.props.update()"
                                        },
                                        {
                                                description: "Start Fullscreen",
                                                icon: <FullScreenIcon />,
                                                config: "test1-2",
                                                type: false,
                                                handler: "this.props.update()"
                                        }
                                ]
                        },
                        {
                                name: "Editing Documents",
                                options: [
                                        {
                                                description: "Use Inline Editor",
                                                icon: <InlineEditIcon />,
                                                config: "test2-1",
                                                type: false,
                                                handler: "this.props.update()"
                                        },
                                        {
                                                description: "Autosave",
                                                icon: <AutosaveIcon />,
                                                config: "test2-2",
                                                type: false,
                                                handler: "this.props.update()"
                                        }
                                ]
                        },
                ]

                return (
                        <Card className={classes.card}>
                                <CardContent className={classes.updatesarea}>
                                        <img src={PackageIcon} className={classes.icon} />
                                        <Typography variant="title" component="h2" align="center">
                                                TPOT Letters
              </Typography>
                                        <Typography gutterBottom variant="body2" component="h6" align="center">
                                                Version <Chip label={app.getVersion()} className={classes.chip} />
                                        </Typography>
                                        <center className={classes.centerButton}>
                                                {this.state.updateAvailable &&
                                                        <Badge color="primary" badgeContent={<DownloadIcon className={classes.downloadSvg} />} className={classes.margin}>
                                                                <Button variant="contained" color="inherit" className={classes.buttonNew}>Update Available!</Button>
                                                        </Badge>}
                                                {!this.state.updateAvailable && <Button variant="outlined" disabled={true} className={classes.buttonNew}>Up to Date</Button>}
                                        </center>
                                        <Divider light classes={{ root: classes.divider }} />
                                </CardContent>
                                <CardContent className={classes.togglearea}>
                                        {settings.map((section, index) => {
                                                return (
                                                        <List subheader={<ListSubheader disableSticky color="primary">{section.name}</ListSubheader>} key={"option_" + index}>
                                                                {section.options.map((option, el) => {
                                                                        return (
                                                                                <ListItem key={"option_" + index + "_" + el}>
                                                                                        <ListItemIcon>
                                                                                                {option.icon}
                                                                                        </ListItemIcon>
                                                                                        <ListItemText primary={option.description} />
                                                                                        <ListItemSecondaryAction>
                                                                                                {/* <Switch onChange={this.handleToggle('wifi')} checked={this.state.checked.indexOf('wifi') !== -1} /> */}
                                                                                                <Switch onChange={this.handleToggle('wifi')} checked={option.type} />
                                                                                        </ListItemSecondaryAction>
                                                                                </ListItem>
                                                                        );
                                                                })}
                                                        </List>
                                                );
                                        })}
                                        <Divider light className={classes.divider} />
                                        <List>
                                                <ListItem>
                                                        <Button variant="outlined" color="primary" className={classes.buttonNew}>Export Settings</Button>
                                                </ListItem>
                                                <ListItem dense>
                                                        <Button variant="contained" color="primary" className={classes.buttonNew}>Reset to Default</Button>
                                                </ListItem>
                                        </List>
                                </CardContent>
                        </Card>
                );
        }
}

Preferences.propTypes = {
        classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Preferences)