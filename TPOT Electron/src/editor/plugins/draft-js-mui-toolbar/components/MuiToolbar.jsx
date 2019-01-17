import PropTypes from 'prop-types';
import React, { Component, Fragment } from "react";
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { getVisibleSelectionRect } from 'draft-js';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import BlockToolbar from './BlockToolbar';
import InlineToolbar from './InlineToolbar';
import { toJS } from 'mobx';

const styles = theme => ({
    root: {
        position: "absolute",
        display: "block",
        visibility: "visible",
        // transform: 'translate(-50%) scale(0)',
        // transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        // background: theme.palette.secondary.light,
        // boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        // borderRadius: 20,
    },
});

class MuiToolbar extends Component {

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
            // if (!this.inlineToolbar || !this.blockToolbar) return;
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
            const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
            const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
            const currentBlockNode = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
            const selectionRect = getVisibleSelectionRect(window);
            const extraTopOffset = -7;
            if (!selectionRect) return;
            if (!currentBlockNode) return;
            // Create new Positions (Inline and Block Toolbars)
            const inlinePosition = {
                top: (editorRoot.offsetTop)
                    // - this.inlineToolbar.offsetHeight
                    + (selectionRect.top - editorRootRect.top)
                    + extraTopOffset,
                left: editorRoot.offsetLeft
                    + (selectionRect.left - editorRootRect.left)
                    + (selectionRect.width / 2)
            };
            const blockPosition = {
                top: currentBlockNode.offsetTop
                    + (currentBlockNode.offsetHeight / 2),
                // - (this.blockToolbar.offsetHeight / 2),
                left: editorRoot.offsetLeft
                    // - (this.blockToolbar.offsetWidth / 2)
                    - 40
            };
            // Calculate Inline Style(s) based on Selection State
            const inlineVisible = (!selection.isCollapsed() && selection.getHasFocus());
            const blockVisible = (selection.isCollapsed());
            // Push Store Updates
            store.setStyleProp('inlineOrigin', inlinePosition)
            store.setStyleProp('blockOrigin', blockPosition)
            store.setStyleProp('inlineVisible', inlineVisible)
            store.setStyleProp('blockVisible', blockVisible)
            // this.setState({ inlineStyle, blockStyle, inlineVisible })
        }, 200); // Necessary delay between inline and block toolbar switching. (prevents double-tap highlight render flickering)
    };

    render() {
        const { classes, store } = this.props;

        const childProps = {
            getEditorState: store.getItem('getEditorState'),
            setEditorState: store.getItem('setEditorState'),
            getEditorRef: store.getItem('getEditorRef'),
            getEditorProps: store.getItem('getEditorProps'),
            customStylePrefix: store.getItem('customStylePrefix'),
            customStyleFunctions: store.getItem('customStyleFunctions'),
        };

        return (
            <Fragment>
                <div id={"MUI Inline Toolbar"} className={classes.root} style={toJS(store.inlineOrigin)} ref={(element) => { this.props.store.setStyleProp('inlineRef', element) }} >
                    <InlineToolbar childProps={childProps} />
                </div>
                <div id={"MUI Block Toolbar"} className={classes.root} style={toJS(store.blockOrigin)} ref={(element) => { this.props.store.setStyleProp('blockRef', element) }}>
                    <BlockToolbar childProps={childProps} />
                </div>
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

