import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { compose } from 'recompose';

const styles = theme => ({
    root: {
        height: 21,
        width: '100%',
        background: '#3e4552',
        borderBottom: '1px solid #282d35',
        WebkitAppRegion: 'drag',
    },
    macButtons: {
        height: 'inherit',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& > div':{
            display: 'flex',
            marginLeft: 8,
            height: 10,
            width: 10,
            borderRadius: 10,
        }
    },
    osxRed: {
        border: '1px solid #e33e41',
        background: '#ff5c5c',
    },
    osxYellow: {
        border: '1px solid #e09e3e',
        background: '#ffbd4c',
    },
    osxGreen: {
        border: '1px solid #14ae46',
        background: '#00ca56',
    },
})

class OSTitleBar extends Component {

    render() {
        const { classes } = this.props

        return (
            <div id="OS Toolbar" className={classes.root}>
                <MacButtons classes={classes} />
            </div>
        )
    }
}

const MacButtons = observer(({classes}) => {
    return (
        <div className={classes.macButtons}>
            <div className={classes.osxRed} onClick={() => { console.log('Close') }}></div>
            <div className={classes.osxYellow} onClick={() => { console.log('Minimize') }}></div>
            <div className={classes.osxGreen} onClick={() => { console.log('Maximize') }}></div>
        </div>
    )
})

export default compose(
    withStyles(styles),
    // inject('settingsStore'),
    observer
)(OSTitleBar)