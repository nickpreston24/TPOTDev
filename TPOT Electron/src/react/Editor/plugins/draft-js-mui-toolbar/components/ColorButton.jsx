import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InlineStyleButton from '../utils/InlineStyleButton';
import Icon from 'mdi-material-ui/FormatBold'

const styles = theme => ({
    root: {
        padding: 0,
        color: `4px solid ${theme.palette.accent}`
    }
});

class ColorButton extends Component {
    render() {
        return (
            <InlineStyleButton {...this.props} styleType={'COLOR'} name={'Color Button'} className={this.props.classes.root} >
                <svg width="24" height="22" xmlns="http://www.w3.org/2000/svg">
                    <path id="drop" fill={'#C2C6D7'} d="M19,17c1.1,0,2-0.9,2-2c0-1.3-2-3.5-2-3.5s-2,2.2-2,3.5C17,16.1,17.9,17,19,17z"/>
                    <path id="fill" fill={'#3c3c3c'} d="M13.4,11.4c-1.9-1.7-4.8-0.3-7.1-1L5.2,10l4.8,4.7L13.4,11.4z"/>
                    <path id="main" fill={'#C2C6D7'}  d="M16.6,8.9L7.6,0L6.2,1.4l2.4,2.4L3.4,8.9c-0.6,0.6-0.6,1.5,0,2.1l5.5,5.5C9.2,16.8,9.6,17,10,17s0.8-0.2,1.1-0.4l5.5-5.5C17.2,10.5,17.2,9.5,16.6,8.9z M10,14.7L5.2,10L10,5.2l4.8,4.8L10,14.7z"/>
                    <rect id="splash" fill={'url(#gradient)'} x="3" y="20" width="16" height="2" />
                    <defs>
                        <linearGradient id="gradient">
                            <stop offset="33%" stopColor={"#FF2B64"} />
                            <stop offset="34%" stopColor={"#FFCE0F"} />
                            <stop offset="66%" stopColor={"#FFCE0F"} />
                            <stop offset="67%" stopColor={"#07A8FF"} />
                        </linearGradient>
                    </defs>
                </svg>
            </InlineStyleButton>
        );
    }
}

export default withStyles(styles)(ColorButton);
