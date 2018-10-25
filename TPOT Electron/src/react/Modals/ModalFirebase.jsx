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
import FireBaseLogo from "../../media/firebase.png";
import FirebaseCredentials from "../../modules/firebase/firebaseAuth";

const electron = window.require("electron");
const remote = electron.remote;
const app = remote.app;
const fs = remote.require("fs");

const loginFile = app.getAppPath() + "/src/config/tokens.txt";

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
    email: null,
    password: null
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

  login = async () => {
    let email = this.state.email;
    let password = this.state.password;

    var fb = new FirebaseCredentials(email, password);
    var response = await fb.login();

    let refreshToken = response.user.refreshToken;
    console.log("refresh token: ", refreshToken);
    // console.log("path: ", loginFile);

    fs.writeFile(loginFile, refreshToken, function(error) {
      if (error) return console.log(error);
    });
  };

  closeModal = e => {
    if (e.target.innerHTML === "Login") {
      this.props.onUpdate(true);
    } else {
      this.props.onUpdate(false);
    }
  };

  clickAwayModal = e => {
    console.log(e.srcElement, e.target, e);
  };

  handleFieldChange = event => {
    let type = event.target.type;
    this.setState({ [`${type}`]: event.target.value });
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
            type="email"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            value={this.state.email}
            onChange={this.handleFieldChange}
          />
          <TextField
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            value={this.state.password}
            onChange={this.handleFieldChange}
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
