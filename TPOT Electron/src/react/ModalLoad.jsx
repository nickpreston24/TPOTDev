import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  root: {

  },
  content: {
    width: 570,
    height: 270,
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class ModalLoad extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  handleClose = () => {
    this.props.onUpdate(false);
  };

  // handleListItemClick = value => {
  //   this.props.onClose(value);
  // };

  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="simple-dialog-title">
        <DialogContent className={classes.content}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            // fullWidth
          />
        </DialogContent>
      </Dialog>
    );
  }
}

ModalLoad.propTypes = {
  classes: PropTypes.object.isRequired,
//   onClose: PropTypes.func,
//   selectedValue: PropTypes.string,
};

export default withStyles(styles)(ModalLoad)