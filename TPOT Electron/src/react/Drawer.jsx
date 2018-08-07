import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DrawerMenuList from './DrawerMenuList';
import Header from './Header'
import Button from '@material-ui/core/Button';
import PreviewIcon from '@material-ui/icons/LaptopMacTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper'

import 'typeface-roboto'

const convert = require('../modules/converter')

const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  preview: {
    position: "fixed",
    right: 20,
    bottom: 20
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    overflowX: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  contentFrame: {
    padding: 16,
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: "absolute",
    top: (64),
    left: "50%",
    transform: "translateX(-50%)",
    width: 800,
    height: "calc(100vh - 48px)",
  },
  contentPaper: {
    overflowY: 'scroll',
    marginTop: 32,
    marginBottom: 128,
    // minHeight: 500,
    minHeight: 500,
    WebkitScrollbarClass: {
      width: "1em"
    },
    WebkitScrollbarTrackClass: {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)"
    },
    WebkitScrollbarThumbClass: {
      backgroundColor: "darkgrey",
      outline: "1px solid slategrey"
    }
  },
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  } 

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        {/* MENU DRAWER */}
        <Drawer variant="permanent" open={true}
          classes={{
            paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
          }}
        >
          <div className={classes.toolbar}/>
          <DrawerMenuList/>
        </Drawer>

        {/* DOCUMENT */}
        <main className={classes.content}>
          <div className={classes.toolbar}/> 

          {/* Main Content */}
          <div className={classes.contentFrame}>
            <Paper className={classes.contentPaper}>
              <Typography color="inherit" varient="display4">
                You think water moves fast? You should see ice.
              </Typography>
            </Paper>
          </div>

          {/* Preview Button */}
          <Tooltip title="Preview Page" TransitionComponent={Zoom}>
            <Button variant="fab" color="primary" aria-label="Preview" className={classes.preview}>
              <PreviewIcon />
            </Button>
          </Tooltip>
        </main>

      </div>
    )
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);



















// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from './DrawerMenuList';

// const styles = {
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// };

// class TemporaryDrawer extends React.Component {
//   state = {
//     left: true,
//   };

//   toggleDrawer = (side, open) => () => {
//     this.setState({
//       [side]: open,
//     });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <div>
//         <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
//         <Drawer hideBackdrop="false" variant="persistent" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={this.toggleDrawer('left', false)}
//             onKeyDown={this.toggleDrawer('left', false)}
//           >
//           <List>{mailFolderListItems}</List>
//           </div>
//         </Drawer>
//       </div>
//     );
//   }
// }

// TemporaryDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(TemporaryDrawer);


