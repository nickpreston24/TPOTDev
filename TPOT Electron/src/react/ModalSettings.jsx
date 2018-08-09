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
import { CardContent } from '../../node_modules/@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PreferencesIcon from 'mdi-material-ui/Tune'
import AccountIcon from 'mdi-material-ui/Account'
import ThemeIcon from 'mdi-material-ui/Palette'
import SettingsAccount from './SettingsAccount'
import SettingsPreferences from './SettingsPreferences'
// import TabContainer from '@material-ui/core/'

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = theme => ({
  root: {
    paddingTop: 64,
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  paper: {
    // maxWidth: 600,
    width: 325,
    height: 500,
  },
  tabsRoot: {
    // maxwidth: 300,
    // background: "#eee",
  },
  tabsIndicator: {
    background: theme.palette.primary.main
  },
  tabRoot: {
    color: "rgba(0, 0, 0, 0.9)",
    textTransform: 'initial',
    minWidth: "33%",
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$tabSelected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      background: '#fff',
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  tabSelected: {},
});

class ModalSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  handleClose = () => {
    this.props.onUpdate(false);
  };

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  render() {
    const { classes } = this.props;
    
    const tabs = [
      {
        name: "Account",
        icon: <AccountIcon/>,
      },
      {
        name: "Prefrences",
        icon: <PreferencesIcon/>,
      },
      {
        name: "Theme",
        icon: <ThemeIcon/>,
      }
    ]

    return (
      <Dialog
        classes={{
          root: classes.root,
          paper: classes.paper,
        }}
        open={this.props.open}
        onClose={this.handleClose}
      >
        <div>
          <Tabs value={this.state.value} onChange={this.handleChange} fullWidth classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
            {tabs.map((tab)=>{
              return (
                <Tab key={tab.name} icon={tab.icon} classes={{ root: classes.tabRoot, selected: classes.tabSelected }}/>
              );
            })}
          </Tabs>
        </div>
        {this.state.value === 0 && <SettingsAccount/>}
        {this.state.value === 1 && <SettingsPreferences/>}
        {this.state.value === 2 && <div>Item Three</div>}
      </Dialog>
    );
  }
}

ModalSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalSettings)