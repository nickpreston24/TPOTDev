import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

const styles = theme => ({
    root: {
        height: 21,
        background: '#3e4552',
        borderBottom: '1px solid #282d35',
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
        border: '1px solid #d83638',
        background: '#ff5d5b',
    },
    osxYellow: {
        border: '1px solid #d59335',
        background: '#ffbc4d',
    },
    osxGreen: {
        border: '1px solid #05a03a',
        background: '#00c901',
    },
})

class OSTitleBar extends Component {

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
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