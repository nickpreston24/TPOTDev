import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = theme => ({
    root: {
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

    handleClickAway = () => {
        this.props.store.setStyleProp('menuOpen', false)
    };

    isVisible = () => {
        if (!!this.props.anchorEl && !!this.props.store.menuCurrent) {
            return this.props.anchorEl.id === this.props.store.menuCurrent.id
        } else {
            return false
        }
    }

    getStyle = () => {
        if (!!this.props.anchorEl) {
            return {
                left: this.props.anchorEl.offsetLeft + (this.props.anchorEl.offsetWidth / 2),
                top: this.props.anchorEl.offsetHeight,
                height: this.props.height,
                width: this.props.width,
            }
        }
    }

    render() {
        const { handleClickAway } = this
        const { classes, children } = this.props
        const { menuOpen } = this.props.store
        return (
            <Fragment>
                {(menuOpen && this.isVisible()) &&
                    <ClickAwayListener onClickAway={handleClickAway} >
                        <div className={classes.root} style={this.getStyle()}>
                            {children}
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
