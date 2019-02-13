import React, { Component } from "react";
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

class SignIn extends Component {

    render() {
        const { classes } = this.props;
        const { currentModal, setCurrentModal, notify } = this.props.lettersStore
        const { signIn, setLoginData, loginData } = this.props.sessionStore

        return (
            <Dialog
                id="Firebase Modal"
                open={"Firebase Modal" === currentModal}
                TransitionComponent={Transition}
                onBackdropClick={() => setCurrentModal(null)}
            >
                <DialogContent color="primary" className={classes.paper}>
                    <img className={classes.logo} src={FireBaseLogo} alt="FirebaseLogo" />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        type="email"
                        margin="normal"
                        value={loginData.email}
                        className={classes.textField}
                        onChange={e => { setLoginData('email', e.target.value) }}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        type={'password'}
                        value={loginData.password}
                        className={classes.textField}
                        onChange={e => { setLoginData('password', e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" type="submit" onClick={() => signIn(notify, setCurrentModal)} >
                        Login
                    </Button>
                </DialogActions>
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
