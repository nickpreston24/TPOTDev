import React from 'react';
import PropTypes, { func } from 'prop-types';
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
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import SvgIcon from '@material-ui/core/SvgIcon'
import ClipBoard from '../media/clipboard.png'
import HardDrive from '../media/hdd.png'
import GoogleDrive from '../media/drive.png'
import { CardContent, CircularProgress } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { get } from 'https';

///File Import Strategies:
// import { DiskFileLoader } from '../modules/docxLoaders/DiskFileLoader.ts'
// import { GoogleFileLoader } from '../modules/docxLoaders/GoogleFileLoader.ts'
// import { Clipboard } from '../modules/docxLoaders/Clipboard.ts'

// import * as Loaders from '../modules/docxLoaders/Loaders.ts'
// import { Loaders } from '../modules/docxLoaders/Loaders.ts'

import DiskFileLoader from '../modules/docxLoaders_js/DiskFileLoader'

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = theme => ({
  root: {
    paddingTop: 64,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    maxWidth: 800,
    width: 600,
    // height: ,
  },
  icon: {
    display: "block",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    height: 64,
    fontSize: 80,
    paddingTop: 64,
    paddingBottom: 32,
  },
  grid: {
    '& button': {
      color: "#555",
      transition: "all 0s linear 0s !important",
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)",
    },
    '&:hover': {
      '& button': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        transition: "all 0s linear 0s !important",
      },
    },
    // border: "1px solid blue",
    width: "32.9999%"
  },
  textbox: {
    marginTop: 32,
    marginBottom: 48,
  }
});

class ModalLoad extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      description: "select a file from your computer to edit",
    }
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onUpdate(false)
  };

  handleSelection = (type) => {
    console.log(type)

    //todo: Have the type-selected Loader retrive the file, regardless of its implementation
    // let loader = Loaders.getLoader(type)

    let loader = new DiskFileLoader();
    if (!loader) throw Error('disk file loader not initialized!');

    //Good:
    loader.load()
      .then((result) => {
        console.log('result:\n', result);
      });

    //Also good:
    // loader.getFilePath()
    //   .then(result => console.log(result));

    console.log('test'); //runs async
  }

  // handleListItemClick = value => {
  //   this.props.onClose(value);
  // };

  render() {
    const { classes } = this.props;
    const cards = [
      {
        name: "From Disk",
        description: "Open a file from your computer's hard drive",
        icon: HardDrive,
        handler: () => { this.handleSelection('disk') }
      },
      {
        name: "Google Drive",
        description: "Open a file from your linked Google Drive folder",
        icon: GoogleDrive,
        handler: () => { this.handleSelection('google') }
      },
      {
        name: "Clipboard",
        description: "Opens a window where you can paste in the content of a word document",
        icon: ClipBoard,
        handler: () => { this.handleSelection('clipboard') }
      }
    ]

    return (
      <Dialog
        classes={{
          root: classes.root,
          paper: classes.paper,
        }}
        open={this.props.open}
        onClose={this.handleClose}
        onBackdropClick={this.handleClose}
      >
        <Grid
          container
          className={classes.demo}
          spacing={0}
          justify="space-evenly"
          alignItems="center"
        >
          {cards.map((card) => {
            return (
              <Grid key={card.name.toLocaleLowerCase()} item className={classes.grid} onClick={card.handler}>
                <img src={card.icon} className={classes.icon} />
                <Button variant="contained" color="inherit">{card.name}</Button>
              </Grid>
            );
          })}

        </Grid>
        <DialogContentText align="center" className={classes.textbox}>{this.state.description}</DialogContentText>
      </Dialog>
    );
  }
}

ModalLoad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalLoad)