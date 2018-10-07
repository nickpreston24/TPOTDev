import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import EditMode from "./EditMode";
import Auth from "./Auth";

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        position: "relative",
    },
    flex: {
        flexGrow: 1,
        border: "1px solid blue"
    },
    contrastBar: {
        minHeight: 16,
        background: theme.palette.primary.medium
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    authButton: {
        position: "absolute",
        right: 0,
        top: 0,
        border: "1px solid blue"
    }
});

class SimpleAppBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuToggled: false,
            editMode: this.props.editMode // Set the initial state with value passed by parent
        };
    }

    toggleMenu = () => {
        let menuToggled = !this.state.menuToggled; // toggle opposite of previous state
        this.setState({ menuToggled: menuToggled }); // update self
        this.props.onUpdate({
            menuToggled: menuToggled,
            editMode: this.state.editMode
        }); // update parent
    };

    updateEditMode = mode => {
        this.setState({ editMode: mode }); // update self
        this.props.onUpdate({
            menuToggled: this.state.menuToggled,
            editMode: mode
        }); // update parent
    };

    render() {
        const { classes } = this.props;

        return (
            <div id="Header" className={classes.root}>
                <AppBar
                    className={classes.root}
                    position="static"
                    color="primary"
                    aria-label="AppBar"
                >
                    <Toolbar
                        variant="dense"
                        classes={{ root: classes.contrastBar, dense: classes.contrastBar }}
                    // className={classes.contrastBar}
                    >
                    {/* <span>Test</span> */}
                    </Toolbar>
                    <Toolbar
                        // variant="dense"
                    >
                        <IconButton
                            onClick={this.toggleMenu}
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="DrawerToggle"
                        >
                            <MenuIcon />{" "}
                        </IconButton>
                        <EditMode
                            currentTab={this.state.editMode}
                            onUpdate={this.updateEditMode}
                            editMode={this.state.editMode}
                        />
                        <Auth authorized={true} className={classes.authButton} />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
