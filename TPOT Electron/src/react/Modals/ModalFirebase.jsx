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
import { auth } from '../../firebase';

const electron = window.require("electron");
const remote = electron.remote;
const app = remote.app;
const fs = remote.require("fs");

const loginFile = app.getAppPath() + "/src/config/tokens.txt";



function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

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
        email: '',
        password: ''
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

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password, } = this.state;
        const { history, } = this.props;
        console.log(email, password)
        auth.signIn(email, password)
            .then((authUser) => {
                console.log(authUser)
                console.log("Signed into Firebase")
                this.setState({ ...this.state });
                this.closeModal()
                // history.push(routes.DASHBOARD);
            })
            .catch(error => { 
                console.log(error)
                this.setState(byPropKey('error', error));
            });
    }

    render() {
        const { classes } = this.props;
        const { email, password, error, submit } = this.state;

        return (
            <Dialog
                id="FIREBASE"
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
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            className={classes.textField}
                            // autoComplete="username"
                            fullWidth
                            label="Email"
                            type="email"
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            value={email}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            // autoComplete="password"
                            fullWidth
                            // id="outlined-adornment-password"
                            // className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={password}
                            // onChange={this.handleChange('password')}
                            onChange={event => this.setState(byPropKey('password', event.target.value))}
                        />
                        {/* <Divider/> */}
                    </form>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending
                        anonymous location data to Google, even when no apps are running.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeModal} color="primary">
                        Exit
          </Button>
                    <Button
                        onClick={this.onSubmit}
                        color="primary"
                        type="submit">
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
