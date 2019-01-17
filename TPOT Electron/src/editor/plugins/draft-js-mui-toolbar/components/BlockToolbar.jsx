// MobX
// Other
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getVisibleSelectionRect } from 'draft-js';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
// React
import React, { Component, Fragment } from "react";
import AlignCenterButton from './AlignCenterButton';
import AlignLeftButton from './AlignLeftButton';
import BoldButton from './BoldButton';
import ColorButton from './ColorButton';
import HeadingButton from './HeadingButton';
import HighlightButton from './HighlightButton';
import ItalicButton from './ItalicButton';
import LinkButton from './LinkButton';
import MoreButton from './MoreButton';
import PageBreakButton from './PageBreakButton';
import QuoteButton from './QuoteButton';
import UnderlineButton from './UnderlineButton';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';


const styles = theme => ({
    root: {
        position: "absolute",
        display: "block",
        visibility: "hidden",
        transform: 'translate(-50%) scale(0)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        background: theme.palette.secondary.light,
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        borderRadius: 20,
    },
    blockToolbar: {
        // padding: `${0}px ${8}px`,
        "& *": {
            float: "left",
        }
    }
});

class MuiToolbar extends Component {

    state = {
        blockStyle: {}
    }

    handleToolbarRef = (element) => {
        this.toolbar = element;
    };

    componentWillMount() {
        this.props.store.subscribeToItem('selection', this.onSelectionChanged); // Listen to parent plugin's onChange event which updates 'selection' in the store
    }

    componentWillUnmount() {
        this.props.store.unsubscribeFromItem('selection', this.onSelectionChanged); // Unsubscribe from parent plugin's store and cease tracking selection changes
    }

    onSelectionChanged = () => {
        // need to wait a tick for window.getSelection() to be accurate when focusing editor with already present selection
        setTimeout(() => {
            const { store } = this.props;
            if (!this.toolbar) return;
            const editorRef = store.getItem('getEditorRef')();
            if (!editorRef) return;
            // this keeps backwards-compatibility with react 15
            let editorRoot = editorRef.refs && editorRef.refs.editor
                ? editorRef.refs.editor : editorRef.editor;
            while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
                editorRoot = editorRoot.parentNode;
            }
            // Get Dimensions to Calculate Positions
            const editorState = store.getItem('getEditorState')();
            const selection = editorState.getSelection();
            const currentContent = editorState.getCurrentContent();
            const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
            const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
            const currentBlockNode = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
            const selectionRect = getVisibleSelectionRect(window);
            if (!selectionRect) return;
            const blockPosition = {
                top: currentBlockNode.offsetTop
                    + (currentBlockNode.offsetHeight / 2)
                    - (this.toolbar.offsetHeight / 2), 
                left: editorRoot.offsetLeft
                    - (this.toolbar.offsetWidth / 2)
                    + 40
            };
            // Calculate Block Style(s) based on Selection State
            const blockVisible = (selection.isCollapsed());
            const blockStyle = { ...blockPosition };
            if (blockVisible) {
                blockStyle.visibility = 'visible'
                blockStyle.transform = 'translate(-50%) scale(1)';
            } else {
                blockStyle.visibility = 'hidden'
                blockStyle.transform = 'translate(-50%) scale(0)';
            }
            // Push final style to render
            this.setState({ blockStyle })
        });
    };

    render() {
        const { classes, store, childProps } = this.props;
        // console.log(toolbarStore.getItem('getEditorState')())

        // const childProps = {
        //     getEditorState: store.getItem('getEditorState'),
        //     setEditorState: store.getItem('setEditorState'),
        //     getEditorRef: store.getItem('getEditorRef'),
        //     getEditorProps: store.getItem('getEditorProps'),
        //     customStylePrefix: store.getItem('customStylePrefix'),
        //     customStyleFunctions: store.getItem('customStyleFunctions'),
        // };

        // console.log('PROPS', this.props)

        return (
            <Fragment>
                <div id={"MUI Block Toolbar"} className={classNames(classes.root, classes.blockToolbar)} ref={this.handleToolbarRef} style={this.state.blockStyle} >
                    <AlignLeftButton {...childProps} />
                    <AlignCenterButton {...childProps} />
                    <PageBreakButton {...childProps} />

                    {/* <AlignLeftButton {...childProps} />
                    <AlignCenterButton {...childProps} />
                    <AlignRightButton {...childProps} />
                    <OrderedListButton {...childProps} />
                    <UnorderedListButton {...childProps} />
                    <CheckListButton {...childProps} /> */}

                </div>
                {/* <div id={"MUI Block Toolbar"} className={classNames(classes.root, classes.blockToolbar)} ref={this.handleToolbarRef} style={this.state.blockStyle} >
                    <Button variant="contained" color="secondary"></Button>
                    <AlignLeftButton {...childProps} />
                    <AlignCenterButton {...childProps} />
                    <PageBreakButton {...childProps} />
                    <AlignRightButton {...childProps} />
                    <OrderedListButton {...childProps} />
                    <UnorderedListButton {...childProps} />
                    <CheckListButton {...childProps} /> 
                </div> */}
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

