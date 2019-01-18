import PropTypes from 'prop-types';
import React, { Component, Fragment } from "react";
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import AlignCenterButton from './AlignCenterButton';
import AlignLeftButton from './AlignLeftButton';
import PageBreakButton from './PageBreakButton';

const styles = theme => ({
    root: {
        position: "absolute",
        // display: "block",
        // visibility: "visible",
        // transform: 'translate(-50%) scale(0)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        background: theme.palette.secondary.light,
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        borderRadius: 20,
        minWidth: 30,
        maxWidth: 30,
        minHeight: 30,
        maxHeight: 30,
        overflow: 'hidden',
    },
});

class MuiToolbar extends Component {

    render() {
        const { classes, store, childProps } = this.props;

        return (
            <Fragment>
                {store.blockVisible &&
                    <div className={classes.root} ref={this.handleToolbarRef} style={store.blockOffset} >
                        {/* <AlignLeftButton {...childProps} />
                        <AlignCenterButton {...childProps} />
                        <PageBreakButton {...childProps} /> */}

                        {/*<OrderedListButton {...childProps} />
                        <UnorderedListButton {...childProps} />
                        <CheckListButton {...childProps} /> */}

                    </div>
                }
            </Fragment>
        )
    }

}

MuiToolbar.propTypes = {
    store: PropTypes.object.isRequired,
};

export default compose(
    inject('store'),
    withStyles(styles),
    observer
)(MuiToolbar)

