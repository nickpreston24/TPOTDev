import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomStyleButton from './CustomStyleButton';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        padding: 0,
        minWidth: 40,
        maxWidth: 40,
        minHeight: 40,
        maxHeight: 40,
        overflow: 'visible',
        color: `4px solid ${theme.palette.accent}`
    }
});

const ButtonPlus = (props) => {
    // console.log(props)
    return (
        <Button {...props}>
            {/* {props.palette && (
                <p>{props.palette}</p>
            )} */}
            {props.children}
        </Button>
    )
}

export default compose(
    // inject('store'),
    withStyles(styles),
    observer
)(ButtonPlus)
