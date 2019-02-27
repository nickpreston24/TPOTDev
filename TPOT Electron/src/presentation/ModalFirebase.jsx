import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FireBaseLogo from "../media/firebase.png";
import FirebaseAuth from 'react-firebaseui/FirebaseAuth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebase, auth } from '../firebase';
import { Typography, Grid } from "@material-ui/core";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    root: {
        width: 300,
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: theme.spacing.unit * 3,
    },
    logo: {
        width: 267,
        height: 66,
        margin: theme.spacing.unit * 3
        // display: "flex",
        // marginTop: 32,
        // marginBottom: 32,
        // position: "relative",
        // left: "50%",
        // transform: "translateX(-50%)",
    },
    margin: {
        margin: theme.spacing.unit
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3
    },
    confirm: {
        minWidth: 150,
        background: '#509eef',
        margin: theme.spacing.unit * 3
    },
    textField: {
        marginTop: theme.spacing.unit * 2
        // flexBasis: 200
    },
    link: {
        // marginTop: theme.spacing.unit * 2,
        display: 'inline',
        color: '#509eef',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    }
});

class SignIn extends Component {

    render() {
        const { classes } = this.props;
        const { currentModal, setCurrentModal, notify } = this.props.lettersStore
        const { signIn, register, setLoginData, loginData, loginMode, setKey } = this.props.sessionStore

        return (
            <Dialog
                id="Firebase Modal"
                open={"Firebase Modal" === currentModal}
                TransitionComponent={Transition}
                onBackdropClick={() => {
                    setCurrentModal(null)
                    setKey('loginMode', 'login')
                }}
            >
                <div color="secondary" className={classes.root}>
                    <img className={classes.logo} src={FireBaseLogo} alt="FirebaseLogo" />
                    {(loginMode === 'login' || loginMode === 'signup') && (
                        <Fragment>
                            {loginMode === 'signup' && (
                                <Fragment>
                                    <Grid container spacing={16}>
                                        <Grid item item xs={6} >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Firstname"
                                                autoComplete="name"
                                                value={loginData.firstName}
                                                className={classes.textField}
                                                onChange={e => { setLoginData('firstName', e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item item xs={6} >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Lastname"
                                                autoComplete="family-name"
                                                value={loginData.lastName}
                                                className={classes.textField}
                                                onChange={e => { setLoginData('lastName', e.target.value) }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Fragment>
                            )}
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                type="email"
                                autoComplete="email"
                                value={loginData.email}
                                className={classes.textField}
                                onChange={e => { setLoginData('email', e.target.value) }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password"
                                type={'password'}
                                autoComplete="password"
                                value={loginData.password}
                                className={classes.textField}
                                onChange={e => { setLoginData('password', e.target.value) }}
                            />
                        </Fragment>
                    )}
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                        className={classes.confirm}
                        onClick={() => {
                            switch (loginMode) {
                                case 'signup':
                                    register(notify, setCurrentModal)
                                    break;
                                case 'login':
                                    signIn(notify, setCurrentModal)
                                    break;
                                default:
                                    signIn(notify, setCurrentModal)
                            }
                        }}
                    >
                        {loginMode === 'login' ? 'Login' : loginMode === 'signup' ? 'Sign Up' : 'Request'}
                    </Button>
                    {loginMode === 'login' && (
                        <Fragment>
                            <Typography className={classes.link} variant="body2">Forgot Your Password?</Typography>
                            <Typography variant="body2">
                                {`Not a member yet?  `}
                                <Typography className={classes.link} variant="body2" onClick={() => setKey('loginMode', 'signup')}>Create an Account</Typography>
                            </Typography>
                        </Fragment>
                    )}
                    {loginMode === 'signup' && (
                        <Typography variant="body2">
                            {`Already Have an Account?  `}
                            <Typography className={classes.link} variant="body2" onClick={() => setKey('loginMode', 'login')}>Log In</Typography>
                        </Typography>
                    )}
                </div>
            </Dialog>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    sessionStore: PropTypes.object.isRequired,
    lettersStore: PropTypes.object.isRequired,
};

export default compose(
    inject("lettersStore", "sessionStore"),
    withStyles(styles),
    observer
)(SignIn);
