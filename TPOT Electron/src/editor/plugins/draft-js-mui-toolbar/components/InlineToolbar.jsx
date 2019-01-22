import PropTypes from 'prop-types';
import React, { Component, Fragment } from "react";
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import BoldButton from './BoldButton';
import ColorButton from './ColorButton';
import HeadingButton from './HeadingButton';
import HighlightButton from './HighlightButton';
import ItalicButton from './ItalicButton';
import LinkButton from './LinkButton';
import MoreButton from './MoreButton';
import QuoteButton from './QuoteButton';
import UnderlineButton from './UnderlineButton';

const styles = theme => ({
    root: {
        position: "absolute",
        display: 'flex',
        justifyContent: 'center',
        // display: "block",
        // visibility: "hidden",
        // transform: 'scale(0)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        background: theme.palette.secondary.light,
        background: '#444861',
        background: '#373940',
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        borderRadius: 20,
        minWidth: 400,
        maxWidth: 400,
        minHeight: 40,
        maxHeight: 40,
        overflow: 'hidden',
        "& *": {
            // float: "left",
        }
    },
});

class MuiToolbar extends Component {

    render() {
        const { classes, store, childProps } = this.props;

        return (
            <Fragment>
                {store.inlineVisible &&
                    <div className={classes.root} style={store.inlineOffset} >
                        <BoldButton {...childProps} />
                        <ItalicButton {...childProps} />
                        <UnderlineButton {...childProps} />
                        <HeadingButton {...childProps} />
                        <LinkButton {...childProps} />
                        <ColorButton {...childProps} />
                        <HighlightButton {...childProps} />
                        <QuoteButton {...childProps} />
                        <MoreButton {...childProps} />
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

