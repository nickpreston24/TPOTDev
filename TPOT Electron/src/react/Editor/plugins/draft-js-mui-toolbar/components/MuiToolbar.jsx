// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// React
import { Component } from 'react';
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
// Other
import { withStyles } from '@material-ui/core/styles';
import { getVisibleSelectionRect } from 'draft-js';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        // zIndex: 9999,
        position: "absolute",
        display: "block",
        visibility: "hidden",
        // transition: "top 0.5s ease-in-out 0s, left 0.5s ease-in-out 0s"
    },
});

class MuiToolbar extends React.Component {

    state = {
        isVisible: true,
        position: {},
        inlineStyle: {},
        blockStyle: {}
    }

    handleToolbarRef = (currentBlockNode) => {
        this.toolbar = currentBlockNode;
    };

    componentWillMount() {
        this.props.store.subscribeToItem('selection', this.onSelectionChanged); // Listen to parent plugin's onChange event which updates 'selection' in the store
    }

    componentWillUnmount() {
        this.props.store.unsubscribeFromItem('selection', this.onSelectionChanged); // Unsubscribe from parent plugin's store and cease tracking selection changes
    }

    onSelectionChanged = () => {
        // need to wait a tick for window.getSelection() to be accurate
        // when focusing editor with already present selection
        setTimeout(() => {
            // Get the Store from the Parent plugin script (which passes props to this component)
            const { store } = this.props;
            //  Check ref to make sure we are talking about the toolbar wrapper element
            if (!this.toolbar) return;
            const editorRef = store.getItem('getEditorRef')();
            if (!editorRef) return;
            // this keeps backwards-compatibility with react 15
            let editorRoot = editorRef.refs && editorRef.refs.editor
                ? editorRef.refs.editor : editorRef.editor;
            while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
                editorRoot = editorRoot.parentNode;
            }
            // Get Dimensions to Calculate Position
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
            const extraTopOffset = -5;
            if (!selectionRect) return;
            // Create new Position(s) (Inline &&/|| Block)
            const inlinePosition = {
                top: (editorRoot.offsetTop - this.toolbar.offsetHeight)
                    + (selectionRect.top - editorRootRect.top)
                    + extraTopOffset,
                left: editorRoot.offsetLeft
                    + (selectionRect.left - editorRootRect.left)
                    + (selectionRect.width / 2)
            };

            const blockPosition = {
                top: (currentBlockNode.offsetTop
                    + (currentBlockNode.offsetHeight / 2)
                    - (this.toolbar.offsetHeight / 2)),
                left: editorRoot.offsetLeft
                    - (this.toolbar.offsetLeft / 2)
            };
            // this.setState({ position });
            // Calculate Inline Style(s) based on Selection State
            // const { overrideContent, position } = this.state;
            const inlineVisible = (!selection.isCollapsed() && selection.getHasFocus());
            const blockVisible = (selection.isCollapsed());
            const inlineStyle = { ...inlinePosition };
            const blockStyle = { ...blockPosition };

            if (inlineVisible) {
                inlineStyle.visibility = 'visible'
                inlineStyle.transform = 'translate(-50%) scale(1)';
                inlineStyle.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
                blockStyle.visibility = 'hidden'
                blockStyle.transform = 'translate(-50%) scale(0)';
                blockStyle.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
            }
            if (blockVisible) {
                blockStyle.visibility = 'visible'
                blockStyle.transform = 'translate(-50%) scale(1)';
                blockStyle.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
                inlineStyle.visibility = 'hidden'
                inlineStyle.transform = 'translate(-50%) scale(0)';
                inlineStyle.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
            }



            // if (isVisible) {
            //     style.visibility = 'visible';
            //     style.transform = 'translate(-50%) scale(1)';
            //     style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
            // } else {
            //     style.transform = 'translate(-50%) scale(0)';
            //     style.visibility = 'hidden';
            // }

            this.setState({ inlineStyle, blockStyle })


            // this.getStyle()
        });
    };

    // getStyle = () => {
    //     // Editor hasn't rendered yet, so we need to wait a tick to get the first style
    //     setTimeout(() => {
    //         const { store } = this.props;
    //         const { overrideContent, position } = this.state;
    //         const selection = store.getItem('getEditorState')().getSelection();
    //         const isVisible = (selection && !selection.isCollapsed() && selection.getHasFocus()) || overrideContent;
    //         const style = { ...position };

    //         if (isVisible) {
    //             style.visibility = 'visible';
    //             style.transform = 'translate(-50%) scale(1)';
    //             style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
    //         } else {
    //             style.transform = 'translate(-50%) scale(0)';
    //             style.visibility = 'hidden';
    //         }

    //         this.setState({ style })

    //         return style;
    //     })
    // }

    render() {
        const { classes, store } = this.props;

        return (
            <React.Fragment>
                <div
                    className={classes.root}
                    ref={this.handleToolbarRef}
                    style={this.state.inlineStyle}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                    >{`Inline Toolbar`}</Button>
                </div>
                <div
                    className={classes.root}
                    ref={this.handleToolbarRef}
                    style={this.state.blockStyle}
                >
                    <Button
                        variant="contained"
                        color="primary"
                    >{`Block`}</Button>
                </div>
            </React.Fragment>
        )
    }

}

// MuiToolbar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(MuiToolbar);
