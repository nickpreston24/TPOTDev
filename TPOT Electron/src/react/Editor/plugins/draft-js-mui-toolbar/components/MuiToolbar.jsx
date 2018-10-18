// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// React
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Other
import { withStyles } from '@material-ui/core/styles';
import { getVisibleSelectionRect } from 'draft-js';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import Button from '@material-ui/core/Button';
import BoldButton from './BoldButton'
import ItalicButton from './ItalicButton'
import UnderlineButton from './UnderlineButton'
import HeadingButton from './HeadingButton'
import LinkButton from './LinkButton'
import ColorButton from './ColorButton'
import HighlightButton from './HighlightButton'
import MoreButton from './MoreButton'
import AlignLeftButton from './AlignLeftButton'
import AlignCenterButton from './AlignCenterButton'
import AlignRightButton from './AlignRightButton'
import OrderedListButton from './OrderedListButton'
import UnorderedListButton from './UnorderedListButton'
import CheckListButton from './CheckListButton'

import QuoteButton from './QuoteButton'

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
    inlineToolbar: {
        padding: `${0}px ${8}px`,
        "& *": {
            float: "left",
        }
    },
    blockToolbar: {
        // padding: `${0}px ${8}px`,
        // "& *": {
        //     float: "left",
        // }
    }
});

class MuiToolbar extends Component {

    state = {
        inlineVisible: true,
        inlineStyle: {},
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
            const { store } = this.props; // Get the Store from the Parent plugin script (which passes DraftJS props to this component)
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
            const editorRootRect = editorRoot.getBoundingClientRect();
            const editorParentFrame = editorRoot.parentElement
            const editorTopPadding = window.getComputedStyle(editorParentFrame).getPropertyValue('padding-top')
            const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
            const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
            const currentBlockNode = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
            const selectionRect = getVisibleSelectionRect(window);
            const extraTopOffset = -7;
            if (!selectionRect) return;
            // Create new Positions (Inline and Block Toolbars)
            const inlinePosition = {
                top: (editorRoot.offsetTop - this.toolbar.offsetHeight)
                    + (selectionRect.top - editorRootRect.top)
                    + extraTopOffset,
                left: editorRoot.offsetLeft
                    + (selectionRect.left - editorRootRect.left)
                    + (selectionRect.width / 2)
            };
            const blockPosition = {
                top: currentBlockNode.offsetTop
                    + (currentBlockNode.offsetHeight / 2)
                    - (this.toolbar.offsetHeight / 2), 
                left: editorRoot.offsetLeft
                    - (this.toolbar.offsetWidth / 2)
            };
            // Calculate Inline Style(s) based on Selection State
            const inlineVisible = (!selection.isCollapsed() && selection.getHasFocus());
            const blockVisible = (selection.isCollapsed());
            const inlineStyle = { ...inlinePosition };
            const blockStyle = { ...blockPosition };
            if (inlineVisible) {
                inlineStyle.visibility = 'visible'
                inlineStyle.transform = 'translate(-50%) scale(1)';
                blockStyle.visibility = 'hidden'
                blockStyle.transform = 'translate(-50%) scale(0)';
            }
            if (blockVisible) {
                blockStyle.visibility = 'visible'
                blockStyle.transform = 'translate(-50%) scale(1)';
                inlineStyle.visibility = 'hidden'
                inlineStyle.transform = 'translate(-50%) scale(0)';
            }
            // Push final style to render
            this.setState({ inlineStyle, blockStyle, inlineVisible })
        });
    };

    render() {
        const { classes, store} = this.props;
        const childrenProps = {
            getEditorState: store.getItem('getEditorState'),
            setEditorState: store.getItem('setEditorState'),
            getEditorRef: store.getItem('getEditorRef'),
            getEditorProps: store.getItem('getEditorProps'),
            customStylePrefix: store.getItem('customStylePrefix'),
            customStyleFunctions: store.getItem('customStyleFunctions'),
        };

        return (
            <React.Fragment>
                <div id={"MUI Inline Toolbar"} className={classNames(classes.root, classes.inlineToolbar)} ref={this.handleToolbarRef} style={this.state.inlineStyle} >
                    <BoldButton {...childrenProps} />
                    <ItalicButton {...childrenProps} />
                    <UnderlineButton {...childrenProps} />
                    <HeadingButton {...childrenProps} />
                    <LinkButton {...childrenProps} />
                    <ColorButton {...childrenProps} />
                    <HighlightButton {...childrenProps} />
                    <QuoteButton {...childrenProps} />
                    <MoreButton {...childrenProps} />

                    {/* <AlignLeftButton {...childrenProps} />
                    <AlignCenterButton {...childrenProps} />
                    <AlignRightButton {...childrenProps} />
                    <OrderedListButton {...childrenProps} />
                    <UnorderedListButton {...childrenProps} />
                    <CheckListButton {...childrenProps} /> */}

                </div>
                <div id={"MUI Block Toolbar"} className={classes.root} ref={this.handleToolbarRef} style={this.state.blockStyle}>
                    <Button variant="contained" color="secondary"></Button>
                </div>
            </React.Fragment>
        )
    }

}

// MuiToolbar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(MuiToolbar);
