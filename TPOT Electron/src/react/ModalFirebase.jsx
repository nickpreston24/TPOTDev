import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import FireBaseLogo from '../media/firebase.png'
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    width: 300,
    height: 450,
  },
  logo: {
    marginTop: 32,
    marginBottom: 32,
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    display: "block",
    // width: 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    // position: "relative",
    // left: "50%",
    // transform: "translateX(-50%)",
    // display: "block",
    flexBasis: 200,
  },
});

// THIS IS GOODstestS

class SignIn extends React.Component {
  state = {
    // open: false,
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  openModal = (e) => {
    this.props.onUpdate(false)
  };

  closeModal = (e) => {
    if (e.target.innerHTML == "Login") {
      this.props.onUpdate(true)
    } else {
      this.props.onUpdate(false)
    }
  };

  clickAwayModal = (e) => {
    console.log(e.srcElement, e.target, e)
  }

  render() {
    const { classes } = this.props

    return (
      <Dialog
        open={this.props.open}
        // open={true}
        TransitionComponent={Transition}
        keepMounted
        onBackdropClick={this.closeModal}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle id="alert-dialog-slide-title">Sign In</DialogTitle> */}
        <DialogContent
          color="primary"
          className={classes.paper}
        >
          {/* <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="../media/firebase.png"
              title="Contemplative Reptile"
            />
          </Card> */}
          <img className={classes.logo} src={FireBaseLogo}/>
          <TextField
          id="username-input"
          label="Username"
          className={classes.textField}
          type="text"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          />
          <TextField
          id="password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          />
          {/* <Divider/> */}


          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="primary">
            Exit
          </Button>
          <Button onClick={this.closeModal} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);