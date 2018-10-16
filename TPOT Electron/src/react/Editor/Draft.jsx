// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Draft JS Vanilla
import { EditorState, RichUtils, Modifier, convertToRaw, DraftInlineStyleType } from 'draft-js';
// import 'draft-js/dist/Draft.css'
// import './config/Draft.css'

// Draft JS Utiliites
import { stateFromElement } from 'draft-js-import-element'
import createStyles from 'draft-js-custom-styles';
import { getSelectedBlocksMap, getSelectedBlocksList, getSelectedBlock, getBlockBeforeSelectedBlock, getAllBlocks, getSelectedBlocksType, removeSelectedBlocksStyle, getSelectionText, addLineBreakRemovingSelection, insertNewUnstyledBlock, clearEditorContent, getSelectionInlineStyle, setBlockData, getSelectedBlocksMetadata, getSelectionEntity, getEntityRange, handleNewLine, isListBlock, changeDepth, getSelectionCustomInlineStyle, } from 'draftjs-utils'

// Custom DraftJS Architecture
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { plugins, InlineToolbar, SideToolbar, MuiToolbar } from './plugins/plugins'
import { rest } from './utils/helpers'
import { stateFromElementConfig, styles, exporter, customStyleFn, baseStyleMap, myBlockStyleFn, blockRenderMap, draftContentFromHtml, draftContentToHtml } from './utils/transforms'


import JSONPretty from 'react-json-pretty';
import htmlBeautify from 'html-beautify'

// Electron (change to import method later)
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const fs = remote.require('fs')
const path = remote.require('path')

// Custom/Community



// THEMING AND CSS 
///////////////////////////////////////////////////////////////////////////////////////////////////

const MUIstyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        background: "white",
        height: 'calc(100vh - 104px)',
        boxShadow: '0px',
        overflow: 'hidden',
        // border: '4px solid red',
    },
    editorFrame: {
        padding: 80,
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
    }
});



// MAIN EDITOR CLASS
///////////////////////////////////////////////////////////////////////////////////////////////////

class Wysiwyg extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         editMode: this.props.editMode,
    //         // editorState: EditorState.createWithContent(htmlContent2),
    //         editorState: EditorState.createEmpty(),
    //     };

    //     this.focus = () => this.refs.editor.focus();
    //     this.blur = () => this.refs.editor.blur()
    //     this.onChange = (editorState) => this.setState({ editorState });

    //     this.toggleStyle = this.toggleStyle.bind(this);
    //     this.getData = this.getData.bind(this)
    //     this.myBlockRenderer = this.myBlockRenderer.bind(this);
    // }

    state = {
        originalState: "I am Original",
        editorState: createEditorStateWithText("This is some starter text. Start typing!"),
        codeState: "I am Code",
    };

    focus = () => {
        if (this.editor)
            this.editor.focus();
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    // ComponentDidMount is an event that is fired off as soon as this react component is added to the dom (but not rendered immediately)
    // This is the best place to attach listeners, load an initial configuration for the class, and start timed services.
    componentDidMount() {

        // Load Editor's Initial State from File or Create Empty
        this.loadEditorInitialState()

        // Start Autosave Service

        // Listen For Save Commands

        // Listen for Editor Reload Data
        window.addEventListener("message", (msg) => {
            if (msg.data.event === "draftjs-editor-reload") {
                this.reloadEditor(msg.data.html)
                    .then(e => {
                        this.saveEditorStateToFile()
                    })
                    .catch(err => {
                        alert(err);
                    })
            }
            if (msg.data.event === "draftjs-editor-save") {
                this.saveEditorStateToFile()
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

    //   EDITOR STATE MANAGEMENT FUNCTIONS   //

    loadEditorInitialState() {
        if (false) {
            // If there IS an in-progress letter from the last session
            this.loadEditorStateFromFile()
        } else {
            // If  there IS NOT in-progress letter from the last session
            this.loadEditorStateEmptyDefault()
        }
    }

    loadEditorStateFromFile() {
        console.log("Editor Loaded with Previous Session Letter State")
    }

    loadEditorStateEmptyDefault() {
        // console.clear() // temp
        let originalState = <h4>This is the original</h4>
        let codeState = <h4>This is the code</h4>
        this.setState({
            originalState: originalState,
            codeState: codeState,
        })
        console.log("Empty Editor Loaded")
    }

    async reloadEditor(html) {

        await rest(0)
        // await this.loadOriginalState(content)
        // await this.loadEditedState(content)
        // await this.loadCodeState(content)
        // console.log("Editor Reloaded with Content")
        // await this.saveEditorStateToFile()
        // console.log(newContentState)
        const newContentState = draftContentFromHtml(html, stateFromElementConfig, baseStyleMap)
        const newEditorState = EditorState.createWithContent(newContentState)
        const rawStateAsText = convertToRaw(newContentState).blocks
        console.log(newContentState)
        const rawHTML = draftContentToHtml(newContentState)
        const rawHTMLPretty = rawHTML
        // console.log(rawHTMLPretty)
        this.setState({
            originalState: html,
            editorState: newEditorState,
            codeState: rawHTMLPretty,
            // codeState: rawStateAsText,
        })

    }

    async saveEditorStateToFile() {
        await rest(0)
        await this.saveOriginalState()
        await this.saveEditedState()
        await this.saveCodeState()
        console.log("Editor State Saved to File")
        // throw new Error("Saving Editor State to Disk Failed; ERROR: 145");
    }

    loadOriginalState(content) {
        this.loadStateFromFile("Original", this.state.criginalState)
        console.log("Loaded Original State")
    }

    loadEditedState(content) {
        this.loadStateFromFile("Editor", this.state.editorState)
        console.log("Loaded Edited State")
    }

    loadCodeState(content) {
        this.loadStateFromFile("Code", this.state.codeState)
        console.log("Loaded Code State")
    }

    loadStateFromFile(stateName, state) {
        let content = "test"
        // fs.writeFile(path.join(path.join(app.getAppPath(), './src/config'), "state" + stateName + ".json"), JSON.stringify(state), (err) => {
        //         if (err) throw err
        // })
        this.setState({ state: content })
    }

    saveOriginalState(content) {
        this.saveStateToFile(this.state.originalState, "Original")
        console.log("Saved Original State")
    }

    saveEditedState() {
        this.saveStateToFile(this.state.editorState, "Edited")
        console.log("Saved Edited State")
    }

    saveCodeState() {
        this.saveStateToFile(this.state.codeState, "Code")
        console.log("Saved Code State")
    }

    saveStateToFile(state, stateName) {
        fs.writeFile(`${app.getAppPath()}/src/config/state${stateName}.json`, JSON.stringify(state), (err) => {
            // fs.writeFile(path.join(path.join(app.getAppPath(), './src/config'), "state" + stateName + ".json"), JSON.stringify(state), (err) => {
            if (err) throw err
        })
    }


    //  EDITOR STYLING AND DATA TRANSFORMATION FUNCTIONS  //

    toggleStyle(type, style) {
        if (type === 'inline') {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
        } else if (type === 'block') {
            this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
        } else { throw Error('Unknown Type of Style Operation on Toggle Button') }
        // Kind of weird, but this is a one-liner to get the current text from the  selection (IKR!)
        // console.log(this.state.editorState.getCurrentContent().getBlockForKey(this.state.editorState.getSelection().getAnchorKey()).getText().slice(this.state.editorState.getSelection().getStartOffset(), this.state.editorState.getSelection().getEndOffset()))
    }

    toggleColor = color => {
        console.log(color)
        const newEditorState = styles.color.toggle(this.state.editorState, color);
        this.setState({ editorState: newEditorState })
    };

    toggleFontSize = fontSize => {
        const newEditorState = styles.fontSize.toggle(this.state.editorState, fontSize);
        this.setState({ editorState: newEditorState })
    };



    //   UTILITY FUNCTIONS   //

    getData = () => {
        const editorState = this.state.editorState
        console.log("BLOCKS", convertToRaw(editorState.getCurrentContent()).blocks)

        let blockKey = this.state.editorState.getSelection().getFocusKey()
        let block = this.state.editorState.getCurrentContent().getBlockForKey(blockKey)
        let style = block.getInlineStyleAt(57)
        console.log(style)
        console.log(getSelectionInlineStyle(this.state.editorState))
        console.log(getSelectedBlocksMetadata(this.state.editorState))
        console.log(getSelectionEntity(this.state.editorState))
        console.log(getSelectionCustomInlineStyle(this.state.editorState))
        // console.log(getSelectedBlock(),
        //     getSelectedBlocksType(),
        //     getSelectionText(),
        //     getSelectionInlineStyle())
    }


    // RENDER
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // After the class is constructed and its data is mounted to the React DOM, render() is fired, which takes displays the elements with data from the instance's current state.
    render() {
        const { classes, editMode } = this.props
        const editorState = this.state.editorState

        return (
            <div id="Editor" className={classes.root} onClick={this.focus}>
                <div id="Frame" className={classes.editorFrame}>
                    {editMode === "original" &&
                        <React.Fragment>
                            {this.state.originalState}
                        </React.Fragment>
                    }
                    {editMode === "code" &&
                        <React.Fragment>
                            <div>
                                {this.state.codeState}
                            </div>
                            {/* <JSONPretty id="json-pretty" json={this.state.codeState}></JSONPretty> */}
                        </React.Fragment>
                    }
                    {editMode === "edited" &&
                        <React.Fragment>
                            <MuiToolbar />
                            <Editor
                                id={'Editor'}
                                ref={(element) => { this.editor = element; }}
                                placeholder="The editor is empty."
                                editorState={this.state.editorState}
                                onChange={this.onChange}

                                customStyleMap={baseStyleMap} // STYLE MAP TO TYPE
                                blockRenderMap={blockRenderMap} // BLOCK MAP MAP TO TYPE

                                // customStyleFn={customStyleFn} // STYLE & ENTITY CLASS FUNCTION
                                // blockStyleFn={CustomBlock} // BLOCK & ATOMIC CLASS FUNCTION

                                // blockRendererFn={} // BLOCK ?/& ATOMIC PROPS=>COMP RENDERER

                                plugins={plugins}
                                spellCheck={true}
                            />
                            {/* <InlineToolbar /> */}
                            <SideToolbar />
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

export default withStyles(MUIstyles)(Wysiwyg)


const CustomInline = (draftInlineStyle, contentBlock, editor) => {
    console.group()
    console.log(draftInlineStyle)
    console.log(contentBlock.text)
    console.log(editor.getProps())
    console.groupEnd()
}

const CustomBlock = (contentBlock, editor) => {
    console.group()
    console.log(contentBlock)
    console.log(editor)
    console.groupEnd()
}