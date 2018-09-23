import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import FireBaseLogo from "../media/firebase.png";
import FirebaseCredentials from "../modules/firebase/firebaseAuth"

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    width: 300,
    height: 450
  },
  logo: {
    marginTop: 32,
    marginBottom: 32,
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    display: "block"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});

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

  //   openModal = e => {
  //     console.log("opened modal");
  //     this.props.onUpdate(false);
  //   };

  async login() {
    let success = false;
    let email = "michael.n.preston@gmail.com";
    let password = "Mercury10";

    var x = 1;
    var y = 2;

    var fb = new FirebaseCredentials(email, password);
    // console.log(await fb.login());
    // console.log(fb);
    // console.log(fb.token);
    await fb.login();
    console.log(x);
  }

  closeModal = e => {
    if (e.target.innerHTML === "Login") {
      this.props.onUpdate(true);
    } else {
      this.props.onUpdate(false);
    }

    // console.log("captured data login");
  };

  clickAwayModal = e => {
    console.log(e.srcElement, e.target, e);
  };

  render() {
    const { classes } = this.props;

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
        <DialogContent color="primary" className={classes.paper}>
          {/* <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="../media/firebase.png"
              title="Contemplative Reptile"
            />
          </Card> */}
          <img className={classes.logo} src={FireBaseLogo} alt="FirebaseLogo" />
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
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="primary">
            Exit
          </Button>
          <Button onClick={this.login} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
