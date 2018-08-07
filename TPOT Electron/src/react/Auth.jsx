import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { IconButton, Divider } from '@material-ui/core';
import CenteredTabs from './CenteredTabs'
import Progression from './Progression'

import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

import Avatar from '@material-ui/icons/AccountCircleRounded';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountBoxOutlined'
import SettingsIcon from '@material-ui/icons/SettingsRounded'
import InfoIcon from '@material-ui/icons/InfoOutlined';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ModalFirebase from './ModalFirebase'



const styles = {
  root: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "auto",
    marginRight: 12
  },
  login: {
    // marginRight: +12,
  },
  button: {
    '& span *': {
        marginLeft: 16
    }
  }
};

class Auth extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      authorized: false,
      anchorEl: null,
      username: null,
      modal: false
    }
  } 

  openLogoutMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeLogoutMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ 
        authorized: false,
        anchorEl: null 
    });
  };

  openModal = () => {
    this.setState({
        modal: true,
    })
    // this.handleLogin
  }

  updateModal = (loggedin) => {
      console.log(loggedin)
    if (loggedin) {
        this.setState({
            authorized: true,
            modal: false,
        })
    } else if (!loggedin) {
        this.setState({
            authorized: false,
            modal: false,
        })
    } else {
        this.setState({
            modal: false,
        })
    }
  }

//   handleLogin = () => {
//     this.setState({
//         authorized: true,
//     })
//   }

  auth = (e) => {
    let booleanVariable = !booleanVariable
    this.props.onUpdate(true); // update parent
    // this.setState({menuToggled: booleanVariable}); // update self
  };

  deauth = (e) => {
    let booleanVariable = !booleanVariable
    this.props.onUpdate(true); // update parent
    // this.setState({menuToggled: booleanVariable}); // update self
  };
  

  render() {

    const { classes } = this.props
    const { anchorEl } = this.state

    // console.log(this.state.authorized)

    return (
        <div className={classes.root}>
            {/* Is Authorized! Show Logout Button */}
            {this.state.authorized && 
                <div>
                    {/* <Typography color="inherit">Victor H.</Typography> */}
                    <Slide direction="left" in={true} timeout={{ enter: 700 }}>
                        <Button
                            className={classes.button}
                            aria-owns={anchorEl ? 'logout-menu' : null}
                            aria-haspopup="true"
                            onClick={this.openLogoutMenu}
                            color="inherit"
                            varient="contained"
                        >
                            Victor H.
                            <Avatar />
                            {/* <Avatar /> */}
                        </Button>
                    </Slide>
                    <Menu
                        id="logout-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.closeLogoutMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem className={classes.menuItem}>
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
                        <Divider/>
                        <MenuItem className={classes.menuItem} onClick={this.handleLogout}>
                            <ListItemIcon className={classes.icon}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                        </MenuItem>
                    </Menu>
                </div>
            }
            {/* Not Authorized, Show Login Button */}
            {!this.state.authorized && 
                <Grow in={true} timeout={{ enter: 400 }}>
                    <Button color="inherit" onClick={this.openModal}>Log In</Button>
                </Grow>
            }
            {/* Not Authorized, Show Firebase SignIn Modal */}
            {this.state.modal && 
               <ModalFirebase open={this.state.modal} onUpdate={this.updateModal}/>
            }
        </div>
    )
  }
} 


Auth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auth);