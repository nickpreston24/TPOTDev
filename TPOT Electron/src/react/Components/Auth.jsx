import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/icons/AccountCircleRounded";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountIcon from "@material-ui/icons/AccountBoxOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ModalFirebase from "../Modals/ModalFirebase";

import { auth } from '../../firebase';

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
        "& span *": {
            marginLeft: 16
        }
    }
};

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: false,
            anchorEl: null,
            username: null,
            modalVisible: false
        };
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

    handleLogout = (event) => {
        event.preventDefault();

        auth.signOut()
            .then(() => {
                this.setState({
                    authorized: false,
                    anchorEl: null
                });
            })
    }

    openModal = () => {
        this.setState({ modalVisible: true });
        // this.handleLogin
    };

    updateModal = loggedin => {
        this.setState(
            loggedin
                ? { authorized: true, modalVisible: false }
                : { authorized: false, modalVisible: false }
        );
    };

    //   handleLogin = () => {
    //     this.setState({
    //       authorized: true
    //     });
    //   };

    auth = e => {
        let booleanVariable = !booleanVariable;
        this.props.onUpdate(true); // update parent
        // this.setState({menuToggled: booleanVariable}); // update self
    };

    deauth = e => {
        let booleanVariable = !booleanVariable;
        this.props.onUpdate(true); // update parent
        // this.setState({menuToggled: booleanVariable}); // update self
    };

    render() {
        const { classes, authUser } = this.props;
        const { anchorEl } = this.state;
        // console.log(this.state.authorized)

        return (
            <div className={classes.root}>
                {/* Is Authorized! Show Logout Button */}
                {authUser && (
                    <div>
                        {/* <Typography color="inherit">Victor H.</Typography> */}
                        <Slide direction="left" in={true} timeout={{ enter: 700 }}>
                            <Button
                                className={classes.button}
                                aria-owns={anchorEl ? "logout-menu" : null}
                                aria-haspopup="true"
                                onClick={this.openLogoutMenu}
                                color="inherit"
                                varient="contained"
                            >
                                Victor H.
                                <Avatar />
                            </Button>
                        </Slide>
                        <Menu
                            id="logout-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.closeLogoutMenu}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                            <Divider />
                            <MenuItem className={classes.menuItem} onClick={this.handleLogout}  >
                                <ListItemIcon className={classes.icon}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                            </MenuItem>
                        </Menu>
                    </div>
                )}
                {/* Not Authorized, Show Login Button */}
                {!authUser && (
                    <Grow in={true} timeout={{ enter: 400 }}>
                        <Button color="inherit" onClick={this.openModal}>
                            {/* Preview */}
                            Log In
                        </Button>
                    </Grow>
                )}
                {/* Not Authorized, Show Firebase SignIn Modal */}
                {this.state.modalVisible && (
                    <ModalFirebase
                        open={this.state.modalVisible}
                        onUpdate={this.updateModal}

                    />
                )}
            </div>
        );
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Auth);
