// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Menu Button Icons
import BoldIcon from 'mdi-material-ui/FormatBold'
import ItalicIcon from 'mdi-material-ui/FormatItalic'
import UnderlineIcon from 'mdi-material-ui/FormatUnderline'
import TextColorIcon from 'mdi-material-ui/FormatColorFill'
import AlignLeftIcon from 'mdi-material-ui/FormatAlignLeft'
import AlignCenterIcon from 'mdi-material-ui/FormatAlignCenter'
import NumberIcon from 'mdi-material-ui/FormatListNumbers'
import BulletIcon from 'mdi-material-ui/FormatListBulleted'
import HeadingIcon from 'mdi-material-ui/FormatFontSizeIncrease'
import HorizontalRuleIcon from 'mdi-material-ui/FormatPageBreak'
import BlockQuoteIcon from 'mdi-material-ui/FormatQuoteOpen'
import MoreMenuIcon from 'mdi-material-ui/DotsHorizontal'
import IndentIcon from 'mdi-material-ui/FormatIndentIncrease'
import HighlightIcon from 'mdi-material-ui/Marker'
import EmojiIcon from 'mdi-material-ui/EmoticonExcited'

// Draft JS
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import Immutable from 'immutable'
import { convertToHTML } from 'draft-convert'
import 'draft-js/dist/Draft.css'
import './Editor.css'

// load sample data string from disk, convert to html tags (virtualize) as blocks and create a new state
import html from '../modules/html_sample.json'


// Electron (change to import method later)
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const ipc = electron.ipcRenderer

// PLUGINS
///////////////////////////////////////////////////////////////////////////////////////////////////

const plugins = [
        // staticToolbarPlugin,
        // inlineToolbarPlugin
];


// INITIAL STATE
///////////////////////////////////////////////////////////////////////////////////////////////////

const blocksFromHtml = htmlToDraft(html)
// const blocksFromHtml = htmlToDraft(html, (nodeName, node) => {
//         if (nodeName === 'hr') {
//                 return {
//                         type: 'HORIZONTAL_RULE',
//                         mutability: 'MUTABLE',
//                         data: {}
//                 };
//         }
// })
const htmlContent = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);


// DATA TRANSFORMATION
///////////////////////////////////////////////////////////////////////////////////////////////////

const styleMap = {
        'HIGHLIGHT': {
                background: 'rgba(255, 0, 10, 0.25)',
        },
        'INDENT': {
                marginLeft: "30px",
        },
        'superFancyBlockquote': {
                textDecoration: 'line-through',
        }
};

function myBlockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        if (type === 'blockquote') {
                return 'superFancyBlockquote';
        }
}

const blockRenderMap = Immutable.Map({
        'unstyled': { element: 'p' },
        'header-one': { element: 'h1' },
        'header-two': { element: 'h1' },
        'header-three': { element: 'h4' },
        'header-four': { element: 'h4' },
        'header-five': { element: 'h4' },
        'header-six': { element: 'h4' },
        'blockquote': { element: 'blockquote' },
        'codeblock': { element: 'blockquote' },
});

// THEMING AND CSS 
///////////////////////////////////////////////////////////////////////////////////////////////////

const styles = theme => ({
        root: {
                display: 'flex',
                flexWrap: 'wrap',
                flexGrow: 1,
                // padding: "32px",
                // '& span, h1, div': {
                //         lineHeight: "30.6px",
                //         fontFamily: "Helvetica",
                //         // fontSize: "18px",
                //         marginBottom: "21.6px"
                // },
        },
});


// CLASSES
///////////////////////////////////////////////////////////////////////////////////////////////////

//     WYSIWYG     //

class Wysiwyg extends React.Component {

        // We may just have the IPC or Window.OnMessage recieve the new conversion data from the File2HTML Module
        // Once it recieves it, this WYSIWYG component would save it down to the local user directory.
        // Once it is saved down, clear the memory, then reinitialize this.state(editorState) with the contents from the local backup file (original.html)
        // During the editing process, this.state.editorState frequently changes. On save or autosave, save down a dirty file to local directory (edited.html)
        // Concurrently, whenever the tab is switched to edit, the current this.state.editorState content is converted with a utility to view it as raw HTML
        // This raw HTML should be saved periodically to a local directory (in code.html). This final code is what is sent to the Wordpress API
        // Either the (code.html) or (edited.html) can be sent via the Wordpress API. Edited has to be run through a utility to clean up the code.
        // Eventually the Preview button in the bottom right will want to request a new preview environment. It could prompt the Editor to get its current code.
        
        constructor(props) {
                super(props);
                this.state = {
                        // for now load the generated state from disk here (created above)
                        // editorState: EditorState.createWithContent(htmlContent),
                        editorState: EditorState.createEmpty(),
                        // load the current data from parent or single source of truth (App.jsx fits both criteria).
                        htmlContent: this.props.htmlContent, // Get data from Drawer.jsx, who could get it from App.jsx. I prefer IPC or Window.PostMessage instead.
                };
                this.focus = () => this.refs.editor.focus();
                this.blur = () => this.refs.editor.blur()
                this.onChange = (editorState) => this.setState({ editorState });
                this.toggleStyle = this._toggleStyle.bind(this);
        }

        componentDidMount() {
                // Getting Converted Data Using Browser Window, Update State
                window.addEventListener("message", (msg) => {
                        if (msg.data.channel === "editor") {
                                let blocksFromHtml = htmlToDraft(msg.data.html)
                                let htmlContent = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);
                                this.setState({ editorState: EditorState.createWithContent(htmlContent) })
                        }
                })
        }

        _toggleStyle(type, style) {
                if (type === 'inline') {
                        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
                } else if (type === 'block') {
                        this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
                } else { throw Error('Unknown Type of Style Operation on Toggle Button') }
                // Kind of weird, but this is a one-liner to get the current text from the selcton (IKR!)
                // console.log(this.state.editorState.getCurrentContent().getBlockForKey(this.state.editorState.getSelection().getAnchorKey()).getText().slice(this.state.editorState.getSelection().getStartOffset(), this.state.editorState.getSelection().getEndOffset()))
        }

        render() {
                const { classes } = this.props
                
                return (
                        <div id="WYSIWYG" className={classes.root} onClick={this.focus}>
                                <div
                                        id={'Toolbar'}
                                        className="RichEditor-controls">
                                                {BUTTONS.map((button) =>
                                                        <StyleButton
                                                                key={button.label}
                                                                // active={currentStyle.has(type.style)}
                                                                label={button.label}
                                                                onToggle={this.toggleStyle}
                                                                type={button.type}
                                                                style={button.style}
                                                                icon={button.icon}
                                                        />
                                                )}
                                </div>
                                <Editor
                                        id={'Editor'}
                                        ref="editor"
                                        placeholder="The editor is empty."
                                        editorState={this.state.editorState}
                                        onChange={this.onChange.bind(this)}
                                        customStyleMap={styleMap}
                                        blockStyleFn={myBlockStyleFn}
                                        blockRenderMap={blockRenderMap}
                                        spellCheck={true}
                                />
                        </div>
                );
        }
}

Wysiwyg.propTypes = {
        classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wysiwyg)


//     STYLE BUTTON     //

class StyleButton extends React.Component {
        constructor() {
                super();
                this.onToggle = (e) => {
                        e.preventDefault();
                        this.props.onToggle(this.props.type, this.props.style);
                }
        }
        render() {
                //  FOR LATER (buttons know if they are active or not)
                // let className = 'RichEditor-styleButton';
                // if (this.props.active) {
                //         className += ' RichEditor-activeButton';
                // }
                return (
                        <IconButton aria-label={this.props.label} onMouseDown={this.onToggle}>
                                {this.props.icon}
                        </IconButton>
                )
        }
}

//     INLINE / SIDEBAR MENU     //

// FOR LATER 
// Replaces < div id = { 'Toolbar'} ></div >; Will have props to transform between inline and sidebar menu versions based on the preference option.
// Dynamic with the same button data, just different functionality, maximize flexibility.



// CONFIG DATA
///////////////////////////////////////

const BUTTONS = [
        { type: 'inline', label: 'Bold', style: 'BOLD', icon: <BoldIcon /> },
        { type: 'inline', label: 'Italic', style: 'ITALIC', icon: <ItalicIcon /> },
        { type: 'inline', label: 'Underline', style: 'UNDERLINE', icon: <UnderlineIcon /> },
        { type: 'block', label: 'Divider', style: 'blockquote', icon: <HorizontalRuleIcon /> },
        { type: 'inline', label: 'Left', style: 'BOLD', icon: <AlignLeftIcon /> },
        { type: 'inline', label: 'Center', style: 'ITALIC', icon: <AlignCenterIcon /> },
        { type: 'block', label: 'Number', style: 'ordered-list-item', icon: <NumberIcon /> },
        { type: 'block', label: 'Bullet', style: 'unordered-list-item', icon: <BulletIcon /> },
        { type: 'block', label: 'Heading', style: 'header-four', icon: <HeadingIcon /> },
        { type: 'inline', label: 'Color', style: 'COLOR', icon: <TextColorIcon /> },
        { type: 'block', label: 'Quote', style: 'blockquote', icon: <BlockQuoteIcon /> },
        { type: 'inline', label: 'More Options', style: null, icon: <MoreMenuIcon /> },
        // { type: 'inline', label: 'Indent', style: 'INDENT', icon: <IndentIcon /> },
        // { type: 'inline', label: 'Highlight', style: 'HIGHLIGHT', icon: <HighlightIcon /> },
        // { type: 'inline', label: 'Emoji', style: 'EMOJI', icon: <EmojiIcon /> },
]