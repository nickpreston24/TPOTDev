import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomStyleButton from '../utils/CustomStyleButton';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import Palette from '../utils/Palette'
import ButtonPlus from '../utils/ButtonPlus';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    root: {
        // padding: 0,
        color: `4px solid ${theme.palette.accent}`,
        maxWidth: 200,
        // border: '1px solid red',
        '& button': {
            borderRadius: 20,
            margin: 4,
            padding: 0,
            minWidth: 30,
            maxWidth: 30,
            minHeight: 30,
            maxHeight: 30,
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.2)",
        }
    }
});

// Determines how to render children from parent style button and how it should look inside a palette.

const ColorPalette = (props) => (
    <Palette
        open={props.open}
        anchorEl={props.anchorEl}
        height={180}
        width={200}
        >
        {/* <h1>Title</h1> */}
        {/* <h6>caption</h6> */}
        <Grid
            className={props.classes.root}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
        // xs={3}
        >
            {props.children.map((item, index) => (
                <Grid item key={index}>{item}</Grid>
            ))}
        </Grid>
    </Palette>
)

export default compose(
    // inject('store'),
    withStyles(styles),
    observer
)(ColorPalette)
