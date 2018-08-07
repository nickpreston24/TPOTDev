import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

import CloudDownload from '@material-ui/icons/CloudDownload';
import Save from '@material-ui/icons/Save';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import ColorLens from '@material-ui/icons/ColorLens';
// import Settings from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/SettingsRounded'
import ModalLoad from './ModalLoad'


const styles = theme => ({
  root: {
    paddingTop: 8,
  },
  settings: {
    position: "absolute",
    bottom: 8,
  },
});


class DrawerMenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadModalOpen: false,
    }
  }
  
  openLoadModal = ()=> {
    this.setState({ loadModalOpen: true })
  }

  updateLoadModal = (b)=> {
    this.setState({ loadModalOpen: b })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ListItem button onClick={this.openLoadModal}>
          <ListItemIcon>
            <CloudDownload />
          </ListItemIcon>
          <ListItemText primary="Load" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Save />
          </ListItemIcon>
          <ListItemText primary="Save" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Publish" />
        </ListItem>
        <ListItem button className={classes.settings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ModalLoad open={this.state.loadModalOpen} onUpdate={this.updateLoadModal}/>
      </div>
    );
  }
}

DrawerMenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenuList);


// export const otherMailFolderListItems = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <MailIcon />
//       </ListItemIcon>
//       <ListItemText primary="All mail" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <DeleteIcon />
//       </ListItemIcon>
//       <ListItemText primary="Trash" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <ReportIcon />
//       </ListItemIcon>
//       <ListItemText primary="Spam" />
//     </ListItem>
//   </div>
// );