import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import CenteredTabs from "./CenteredTabs";
import EditMode from "./EditMode";
import Auth from "./Auth";

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1201,
    position: "fixed"
  },
  flex: {
    flexGrow: 1,
    border: "1px solid blue"
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
};

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
      <div className={classes.root}>
        <AppBar
          className={classes.root}
          position="static"
          color="primary"
          aria-label="AppBar"
        >
          <Toolbar>
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
