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
import Tune from 'mdi-material-ui/Tune'
import Palette from 'mdi-material-ui/Palette'
import ProfilePic from '../media/avatar.jpg'
// import TabContainer from '@material-ui/core/'

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  avatar: {
    height: 80,
    width: 80,
    display: "block",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: 32,
    marginBottom: 32,
  }

});

class ThemeEditor extends React.Component {

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
    
    // const tabs = [
    //   {
    //     name: "Account",
    //     icon: <Account/>,
    //   },
    //   {
    //     name: "Prefrences",
    //     icon: <Tune/>,
    //   },
    //   {
    //     name: "Theme",
    //     icon: <Palette/>,
    //   }
    // ]

    return (
      <div className={classes.root}>
        <Avatar src={ProfilePic} className={classes.avatar}/>
        <Typography align="center">Victor Hafichuk</Typography>
        
        {/* {this.state.value === 0 && <div>Item One</div>} */}
      </div>
    );
  }
}

ThemeEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThemeEditor)