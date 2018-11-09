import { withStyles } from '@material-ui/core/styles';
import { convertToRaw, EditorState } from 'draft-js';
// Custom DraftJS Architecture
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import JSONPretty from 'react-json-pretty';
import { MuiToolbar, plugins } from './plugins/plugins';
import { rest } from './utils/helpers';
import { baseBlockStyleFn, baseStyleMap, blockRenderer, blockRenderMap, draftContentFromHtml, draftContentToHtml, stateFromElementConfig } from './utils/transforms';
import PublishScreenContainer from '../../container/PublishScreenContainer';


import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

// Electron (change to import method later)
// const electron = window.require('electron')
// const remote = electron.remote
// const app = remote.app
// const fs = remote.require('fs')
// const path = remote.require('path')


const MUIstyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        background: "white",
        height: 'calc(100vh - 104px)',
        boxShadow: '0px',
        overflow: 'hidden',
        // border: '4px solid lime',
    },
    editorFrame: {
        padding: 80,
        paddingLeft: 160,
        paddingRight: 160,
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: 700,
        width: "70vw",
        maxWidth: 1000,
        overflowX: 'hidden',
        overflowY: 'scroll',
        // backgroundColor: '#f0f0f0',
        // border: '4px solid blue !important',
    },
    modal: {
        paddingTop: '400px !important',
    }
});

class Wysiwyg extends React.Component {

    state = {
        originalState: "I am Original",
        editorState: createEditorStateWithText("This is some starter text. Start typing!"),
        codeState: "I am Code",
        baseStyleMap: baseStyleMap
    };

    focus = (event) => {
        event.preventDefault();
        if (this.editor) {
            // console.log(this.editor)
            this.editor.focus();
        }
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    setStyleMap = (customStyleMap) => {
        this.setState({
            baseStyleMap: customStyleMap
        })
    }

    componentDidMount() {
        // Load Editor's Initial State from File

        window.addEventListener("message", (msg) => {
            if (msg.data.event === "draftjs-editor-reload") {
                this.reloadEditor(msg.data.html)
            }
            if (msg.data.event === "draftjs-editor-get-code") {
                this.getCode()
            }
        })
    }

    getData(e) {
        // console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
        console.group("DATA")
        console.log("Editor State", this.state.editorState)
        console.log("Block Map", convertToRaw(this.state.editorState.getCurrentContent()).blocks)
        console.log("Entity Map", convertToRaw(this.state.editorState.getCurrentContent()).entityMap)
        console.groupEnd()
        // console.log(block.key + '\n', block.text + '\n', block.type + '\n', block.depth + '\n', block.data)
    }

    async reloadEditor(html) {
        await rest(0)
        const newContentState = draftContentFromHtml(html, stateFromElementConfig, this.state.baseStyleMap)
        // const newOriginalState = createNode(html)
        const newEditorState = EditorState.createWithContent(newContentState)
        // const rawStateAsText = convertToRaw(newContentState).blocks
        // const rawStateAsText = convertToRaw(newContentState)
        // console.log(newContentState)
        const rawHTML = draftContentToHtml(newEditorState, newContentState)
        const rawHTMLPretty = rawHTML

        this.props.lettersStore.setEditorContent(rawHTML)

        // console.log(rawHTMLPretty)
        this.setState({
            originalState: html,
            editorState: newEditorState,
            codeState: rawHTMLPretty,
            // codeState: rawStateAsText,
        })
    }

    async getCode() {
        const codeState = draftContentToHtml(this.state.editorState, this.state.editorState.getCurrentContent())
        // console.log(codeState)
        // const codeState = convertToRaw(this.state.editorState.getCurrentContent())
        // this.setState({ codeState })
    }

    // After the class is constructed and its data is mounted to the React DOM, render() is fired, which takes displays the elements with data from the instance's current state.
    render() {
        const { lettersStore: store, classes, editMode } = this.props
        return (
            <div id="Editor" className={classes.root}>
                <div id="Frame" className={classes.editorFrame} onClick={this.focus}>
                    {editMode === "edited" &&
                        <React.Fragment >
                            <Editor
                                id={'DraftJS'}
                                ref={(element) => { this.editor = element; }}
                                placeholder="The editor is empty."
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                setStyleMap={this.setStyleMap}
                                customStyleMap={this.state.baseStyleMap} // STYLE MAP TO TYPE
                                blockRenderMap={blockRenderMap} // BLOCK MAP MAP TO TYPE
                                // customStyleFn={customStyleFn} // STYLE & ENTITY CLASS FUNCTION
                                blockStyleFn={baseBlockStyleFn} // BLOCK & ATOMIC CLASS FUNCTION
                                blockRendererFn={blockRenderer} // BLOCK ?/& ATOMIC PROPS=>COMP RENDERER
                                plugins={plugins}
                                spellCheck={true}
                            />
                            <MuiToolbar />
                        </React.Fragment>
                    }
                    {editMode === "original" &&
                        <React.Fragment>
                            {/* {this.state.originalState} */}
                            {ReactHtmlParser(this.state.originalState)}
                        </React.Fragment>
                    }
                    {editMode === "code" &&
                        <React.Fragment>
                            {/* <div>
                                {this.state.codeState}
                            </div> */}
                            <JSONPretty id="json-pretty" json={this.state.codeState}></JSONPretty>
                        </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

Wysiwyg.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    inject('lettersStore'),
    withStyles(MUIstyles),
    observer
)(Wysiwyg);
    
    // export default withStyles(MUIstyles)(Wysiwyg)