import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";
import { auth } from '../firebase';
import FireBaseLogo from "../media/firebase.png";

import { inject, observer } from "mobx-react";
import { observable, action, computed, decorate, autorun } from 'mobx'
import { compose } from "recompose";

// const electron = window.require("electron");
// const remote = electron.remote;
// const app = remote.app;
// const fs = remote.require("fs");

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

        this.props.lettersStore.signOut()
        // if (e.target.innerHTML === "Login") {
        //     this.props.onUpdate(true);
        // } else {
        //     this.props.onUpdate(false);
        // }
    };

    clickAwayModal = e => {
        console.log(e.srcElement, e.target, e);
    };

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password, } = this.state;
        // const { history, } = this.props;
        console.log(email, password)
        this.props.lettersStore.signIn(email, password)
    }

    render() {
        const { classes } = this.props;
        const {
            email,
            password,
            // error,
            // submit
        } = this.state;

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

export default compose(
    inject("lettersStore"),
    withStyles(styles),
    observer
)(SignIn);
