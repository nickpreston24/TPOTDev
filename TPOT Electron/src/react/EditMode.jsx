import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
                        background: "yellow !important",
                        backgroundColor: "yellow !important",
                }
        },
        button: {
                margin: 0,
                padding: 0,
        },
        completed: {
                display: 'inline-block',
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
                },
                '& span': {
                        marginLeft: "3vw",
                        display: "table",
                },
                '& span span, & span svg': {
                        textAlign: "center",
                        display: "table-cell",
                        verticalAlign: "middle",
                },
                '& span span': {
                        fontSize: 14,
                },
        }
});

class EditMode extends React.Component {
        constructor(props) {
                super(props)

                this.state = {
                        currentTab: 1
                }

                this.tabs = [
                        { name: 'Original', icon: <FileIcon /> },
                        { name: 'Edited', icon: <EditIcon /> },
                        { name: 'Code', icon: <CodeIcon /> },
                ]
        }

        getValueFromTab = (currentTab) => {
                console.log(currentTab)
        }

        handleChange = (e, tab) => {
                this.setState({ currentTab: tab }); // update self
                let editMode
                switch (tab) {
                        case 0:
                                editMode = "original"
                                break;
                        case 1:
                                editMode = "edited"
                                break;
                        case 2:
                                editMode = "code"
                                break;
                        default:
                                editMode = "edited"
                                break;
                }
                this.props.onUpdate(editMode) // update parent
        };

        render() {
                const { classes } = this.props;

                return (
                        <div className={classes.root}>
                                <Tabs
                                        classes={{ root: classes.tabs, indicator: classes.indicator }}
                                        value={this.state.currentTab}
                                        onChange={this.handleChange}
                                        fullWidth
                                        indicatorColor="primary"
                                        textColor="inherit"
                                >
                                        {this.tabs.map((tab) => {
                                                return (
                                                        <Tab className={classes.tab} icon={tab.icon} label={tab.name} key={Math.random(tab.name)}/>
                                                );
                                        })}
                                </Tabs>
                        </div>
                );
        }
}

EditMode.propTypes = {
        classes: PropTypes.object,
};

export default withStyles(styles)(EditMode);