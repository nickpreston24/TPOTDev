import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CodeIcon from '@material-ui/icons/Code'
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined'
import EditIcon from '@material-ui/icons/Edit'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    tabsRoot: {
        position: "absolute",
        left: "50%",
        top: 0,
        transform: "translateX(-50%)",
        width: '50%',
        // border: '1px solid lime'
        // '& div:nth-first-child(0)': {
        //     background: "yellow !important",
        //     backgroundColor: "yellow !important",
        // }
    },
    button: {
        margin: 0,
        padding: 0,
    },
    completed: {
        display: 'inline-block',
    },

    indicator: {
        top: 46,
        background: theme.palette.primary.contrastText,
    },
    tabRoot: {
        // height: "40px !important",
        minHeight: 48,
        color: theme.palette.primary.dark,
        // border: '1px solid magenta',
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
    },
    selected: {
        color: "lime",
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

    getCodeFromEditor = () => {
        console.log("GET CODE")
        // Send Data
        let message = {
            event: 'draftjs-editor-get-code',
        }
        window.postMessage(message, "*") // sends to DraftJS WYSIWYG Editor
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

                <Tabs
                    classes={{ root: classes.tabsRoot, indicator: classes.indicator }}
                    value={this.state.currentTab}
                    onChange={this.handleChange}
                    onClick={this.getCodeFromEditor}
                    fullWidth
                    indicatorColor="primary"
                    textColor="inherit"
                >
                    {this.tabs.map((tab) => {
                        return (
                            <Tab classes={{ root: classes.tabRoot, selected: classes.selected }} icon={tab.icon} label={tab.name} key={Math.random(tab.name)} />
                        );
                    })}
                </Tabs>
        );
    }
}

EditMode.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(EditMode);