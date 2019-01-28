import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomStyleButton from '../utils/CustomStyleButton';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Popover } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = theme => ({
    root: {
        // padding: 0,
        color: `4px solid ${theme.palette.accent}`
    },
    fake: {
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#f5f5f5',
        height: 80,
        width: 80,
        display: 'block',
        zIndex: 30,
    }
});

class Palette extends Component {

    state = {
        open: this.props.open
    }

    handleClickAway = () => {
        this.props.store.setStyleProp('menuOpen', false)
    };

    render() {

        // console.log(store.inlineOffset)
        let style = {}
        // !!store.inlineOffset
        if (!!this.props.anchorEl) {
            style = {
                left: this.props.anchorEl.offsetLeft + (this.props.anchorEl.offsetWidth / 2),
                top: this.props.anchorEl.offsetHeight,
                height: this.props.height,
                width: this.props.width,
            }
        }
        console.log(style)

        // this.props.anchorEl && console.log(this.props.anchorEl.offsetHeight)
        return (
            <Fragment>
                {this.props.store.menuOpen &&
                    <ClickAwayListener onClickAway={this.handleClickAway} >
                    <div className={this.props.classes.fake} style={style}>
                            {this.props.children}
                            <button onClick={this.handleClickAway}>Click Me</button>
                        </div>
                        </ClickAwayListener>
                    }
            </Fragment>

        )
    }
}

export default compose(
    inject('store'),
    withStyles(styles),
    observer
)(Palette)
