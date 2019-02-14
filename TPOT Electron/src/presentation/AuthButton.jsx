import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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

const styles = {
    root: {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: "auto",
        marginRight: 12
    },
};

class Auth extends Component {

    state = {
        anchorEl: null,
    };

    setRef = element => {
        console.log(element)
        this.setState({ anchorEl: element })
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state
        const { currentModal, setCurrentModal } = this.props.lettersStore
        const { signOut, authUser } = this.props.sessionStore

        return (
            <div
                className={classes.root}
                ref={this.setRef}
            >
                {authUser && (
                    <div>
                        <Slide direction="left" in={true} timeout={{ enter: 700 }}>
                            <Button
                                className={classes.button}
                                aria-owns={anchorEl ? "logout-menu" : null}
                                aria-haspopup="true"
                                onClick={() => setCurrentModal('Firebase Dropdown')}
                                color="inherit"
                                varient="contained"
                            >
                                {authUser.email}
                                <Avatar />
                            </Button>
                        </Slide>
                        <Menu
                            id="logout-menu"
                            anchorEl={anchorEl}
                            open={'Firebase Dropdown' === currentModal}
                            onClose={() => setCurrentModal(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
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
                            <Divider />
                            <MenuItem className={classes.menuItem} onClick={() => signOut(setCurrentModal)}  >
                                <ListItemIcon className={classes.icon}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                            </MenuItem>
                        </Menu>
                    </div>
                )}
                {!authUser && (
                    <Grow in={true} timeout={{ enter: 400 }}>
                        <Button color="inherit" onClick={() => setCurrentModal('Firebase Modal')}>
                            Log In
                        </Button>
                    </Grow>
                )}
           
            </div>
        );
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    inject("lettersStore", "sessionStore"),
    withStyles(styles),
    observer
)(Auth);