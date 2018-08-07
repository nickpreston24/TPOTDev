import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import StepIcon from '@material-ui/core/StepIcon';
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code'
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined'
import EditIcon from '@material-ui/icons/Edit'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    position: "absolute",
    left: "50%",
    top: -2,
    transform: "translateX(-50%)",
    width: '50%',
    '& div:nth-first-child(0)': {
      // color: "yellow !important",
      // height: "12px !important",
      background: "yellow !important",
      backgroundColor: "yellow !important",
    }
  },
  button: {
    margin: 0,
    padding: 0,
    // marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  tabs: {
    // height: "40px !important",
    // '& span': {
    //   color: "yellow !important",
    //   height: "12px !important",
    //   background: "yellow !important",
    //   backgroundColor: "yellow !important",
    // }
  },
  indicator: {
    top: 64,
    background: theme.palette.primary.contrastText
  },
  tab: {
    height: "40px !important",
    color: theme.palette.primary.dark,
    '&[aria-selected="true"]': {
      color: theme.palette.primary.contrastText,
      // background: "grey !important",
    },
    '& span': {
      // textAlign: "center",
      // display: "inline !important",
      marginLeft: "3vw",
      display: "table",
    },
    '& span span, & span svg': {
      textAlign: "center",
      display: "table-cell",
      verticalAlign: "middle",
      // margin: "0px !important",
    },
    '& span span': {
      fontSize: 14,
    },



    // '& span:first-child': {
    //   color: "grey",
    //   // display: "inline-flex !important",
    // },
    // '& span:first-child *': {
    //   margin: 0,
    //   left: 0,
    // },
    // '& span:first-child svg': {
    //   margin: "auto",
    //   // margin: 0,
    //   // left: 0,
    //   // top: "50%",
    //   // left: "50%",
    //   // transform: "translate(-50%, -50%)",
    //   // display: "inline !important",
    //   // position: "relative",
    //   // display: "inline !important",
    //   position: "relative !important",
    //   // float: "left !important",
    //   color: "green !important",
    //   // background: "green !important",
    // },
    // '& span:first-child span': {
    //   margin: "auto",
    //   // margin: 0,
    //   // left: 0,
    //   // top: "50%",
    //   // left: "50%",
    //   // transform: "translate(-50%, -50%)",
    //   // display: "inline !important",
    //   // position: "relative",
    //   display: "inline !important",
    //   // display: "inline !important",
    //   position: "relative !important",
    //   float: "left !important",
    //   color: "green !important",
    //   zIndex: 1,
    // },
  },
  selectedTab: {

  }
    // background: "grey",

  // stepper: {
  //   maxHeight: 64,
  //   // background: theme.palette.primary.main,
  //   overflow: "hidden"
  // },
  // stepperButton: {
  //   // color: theme.palette.primary.dark,
  // },

});

class Progression extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 1,
      value: 1,
    }
  } 

  handleStep = step => () => {
    console.log(step)
    this.setState({
      activeStep: step,
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const { value } = this.state;

    const steps = [
        'Original',
        'Edited',
        'Code'
    ]
    const icons = [
        <FileIcon/>,
        <EditIcon/>,
        <CodeIcon/>
    ]

    return (
      <div className={classes.root}>
        <Tabs
          classes={{root: classes.tabs, indicator: classes.indicator}}
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="inherit"
        >
          <Tab className={classes.tab} icon={<FileIcon />} label="Original" />
          <Tab className={classes.tab} icon={<EditIcon />} label="Edited" />
          <Tab className={classes.tab} icon={<CodeIcon />} label="Code" />
        </Tabs>
        {/* <Stepper className={classes.stepper} nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  // className={classes.stepperButton}
                  onClick={this.handleStep(index)}
                  icon={icons[index]}
                //   completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper> */}
      </div>
    );
  }
}

Progression.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Progression);