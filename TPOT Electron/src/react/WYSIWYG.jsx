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
import { EditorState, RichUtils, ContentState, Modifier, convertFromHTML } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import Immutable from 'immutable'
import { convertToHTML } from 'draft-convert'
import 'draft-js/dist/Draft.css'
import './Editor.css'

// Virtual IFrame
import Frame from 'react-frame-component'

// load sample data string from disk, convert to html tags (virtualize) as blocks and create a new state
import html from '../modules/html_sample.json'
import htmlNew from '../modules/html_sample_new.json'

// Electron (change to import method later)
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const ipc = electron.ipcRenderer

// RESTfull APIs
var WPAPI = require('wpapi');
// var wp = new WPAPI({
//         endpoint: 'http://www.thepathoftruth.com/wp-json',
//         // This assumes you are using basic auth, as described further below
//         username: 'Braden',
//         password: 'Mercury18'
// });

// PLUGINS
///////////////////////////////////////////////////////////////////////////////////////////////////

const plugins = [
        // staticToolbarPlugin,
        // inlineToolbarPlugin
];


// INITIAL STATE
///////////////////////////////////////////////////////////////////////////////////////////////////

const blocksFromHtml = convertFromHTML(htmlNew)
// console.log(htmlNew, blocksFromHtml)
// const blocksFromHtml = htmlToDraft(html, (nodeName, node) => {
//         if (nodeName === 'br') {
//                 return {
//                         type: 'HORIZONTAL_RULE',
//                         mutability: 'MUTABLE',
//                         data: {}
//                 };
//         }
// })
const htmlContent2 = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);


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
                return '.superFancyBlockquote {color: red !important;}';
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

// function myBlockRenderer(contentBlock, editorState) {
//         // console.log(contentBlock, editorState)
//         const type = contentBlock.getType();
//         if (!contentBlock.getText()) {
//                 // let EditorState = editorState
//                 // console.log(EditorState.getCurrentContent())
//                 // Modifier.removeRange(EditorState.getCurrentContent())
//                 // console.log(contentBlock, editorState)

//                 // console.log(editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getAnchorKey()).getText().slice(editorState.getSelection().getStartOffset(), editorState.getSelection().getEndOffset()))
//                 // console.log("Type", contentBlock.getType(), "Key", contentBlock.getKey(), "Text", contentBlock.getText(), "Chars", contentBlock.getCharacterList(), "Length", contentBlock.getLength(), "Data", contentBlock.getData())
//         }
//         if (type === 'atomic') {
//                 return {
//                         component: 'paragraph',
//                         editable: false,
//                         props: {
//                                 foo: 'bar',
//                         },
//                 };
//         }
// }

// THEMING AND CSS 
///////////////////////////////////////////////////////////////////////////////////////////////////

const styles = theme => ({
        root: {
                display: 'flex',
                flexWrap: 'wrap',
                flexGrow: 1,
                height: '100%',
                // padding: "32px",
                // '& span, h1, div': {
                //         lineHeight: "30.6px",
                //         fontFamily: "Helvetica",
                //         fontSize: "18px",
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
                        // editorState: EditorState.createWithContent(htmlContent2),
                        editorState: EditorState.createEmpty(),
                        editMode: this.props.editMode
                };
                this.focus = () => this.refs.editor.focus();
                this.blur = () => this.refs.editor.blur()
                this.onChange = (editorState) => this.setState({ editorState });
                this.toggleStyle = this._toggleStyle.bind(this);
                this.myBlockRenderer = this._myBlockRenderer.bind(this);
        }

        componentDidMount() {
                console.log(this.state.editMode)

                // Getting Converted Data Using Browser Window, Update State
                window.addEventListener("message", (msg) => {
                        if (msg.data.channel === "editor") {
                                let cleanHtml = msg.data.html
                                        .toString()
                                        .replace(/<br\s*[\/]?>/gi, "</p><p>")
                                        .trim()
                                let blocksFromHtml = htmlToDraft(msg.data.html)
                                let htmlContent = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);
                                this.setState({ editorState: EditorState.createWithContent(htmlContent) })
                                // console.log(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap)
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

        _myBlockRenderer(contentBlock, editorState) {
                // console.log(contentBlock, editorState)
                const type = contentBlock.getType();
                if (!contentBlock.getText()) {
                        // let EditorState = editorState
                        // console.log()
                        // console.log(EditorState.getCurrentContent())
                        Modifier.removeRange(this.state.editorState.getCurrentContent(), this.state.editorState.getSelection(), "backward")
                        // console.log(contentBlock, editorState)
                        // console.log(this.state.editorState)
                        // console.log("Type", contentBlock.getType(), "Key", contentBlock.getKey(), "Text", contentBlock.getText(), "Chars", contentBlock.getCharacterList(), "Length", contentBlock.getLength(), "Data", contentBlock.getData())
                }
                // if (type === 'atomic') {
                //         return {
                //                 component: 'paragraph',
                //                 editable: false,
                //                 props: {
                //                         foo: 'bar',
                //                 },
                //         };
                // }
        }

        render() {
                const { classes } = this.props
                const editMode = this.props.editMode

                // var css = {
                //         border: '0px',
                //         width: '100%',
                //         height: '100%'
                // };


                return (
                        <div id="WYSIWYG" className={classes.root} onClick={this.focus}>
                                {/* Original */}
                                {editMode == "original" &&
                                        <Frame style={{ border: '0px', width: '100%', height: '100%', border: '0px solid red' }} head={<React.Fragment><style>{'html{height: 100%}'}</style><style>{VCLASS}</style></React.Fragment> }>
                                        {VHTML}
                                        </Frame>
                                }
                                {/* Edited */}
                                {editMode == "edited" &&
                                        <React.Fragment>
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
                                                        blockRendererFn={this.myBlockRenderer}
                                                        spellCheck={true}
                                                />
                                        </React.Fragment>
                                }
                                {/* Code */}
                                {editMode == "code" &&
                                        <p>Code</p>
                                }
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

const VCLASS = `.Heading2 .r,.Heading2Char,.element-38,.element-45 .r,.element-46,.element-47 .r,.element-48{font-style:italic}.Hyperlink,.element-10,.element-13,.element-2,.element-21,.element-22 .r,.element-23,.element-26 .r,.element-40,.element-41 .r,.element-42,.element-45 .r,.element-46,.element-47 .r,.element-48,.element-8{text-decoration:underline}.tbl{border-collapse:collapse}.r{font-family:Calibri}.Heading1 .r,.Heading1Char,.Heading2 .r,.Heading2Char{font-family:Calibri Light;font-weight:700}.Normal{line-height:1.0791666666666666;margin-bottom:10px}.Heading1,.Heading2{margin-top:16px;margin-bottom:4px}.Normal .r{font-size:14px}.Heading1 .r{font-size:21px}.element-0,.element-1,.element-12,.element-14,.element-15,.element-17,.element-18,.element-20,.element-3,.element-4,.element-6,.element-7{line-height:1;margin-bottom:0}.Heading2 .r{font-size:18px}.TableNormal{margin-left:0}.Hyperlink{color:#0563C1}.UnresolvedMention{color:#605E5C;background-color:#E1DFDD}.element-1 .r,.element-2{color:#00F}.Heading1Char{font-size:21px}.Heading2Char{font-size:18px}.element-0 .r,.element-1 .r,.element-2,.element-3 .r{font-size:16px;font-family:Trebuchet MS}.element-4 .r,.element-5{font-family:Trebuchet MS;color:red;font-size:16px}.element-10,.element-11,.element-12 .r,.element-13,.element-7 .r,.element-8,.element-9 .r{color:#00F;font-size:16px;font-family:Trebuchet MS}.element-6 .r{font-family:Trebuchet MS;font-size:16px}.element-7 .r{font-weight:700}.element-9{line-height:1;margin-bottom:0}.element-10,.element-11,.element-9 .r{font-weight:700}.element-12 .r{font-weight:700}.element-14 .r{font-family:Trebuchet MS;font-size:16px}.element-15 .r,.element-16{font-family:Trebuchet MS;color:#00B050;font-size:16px}.element-18 .r,.element-19,.element-20 .r,.element-21,.element-22 .r,.element-23,.element-26 .r{font-family:Trebuchet MS;color:#00F;font-size:16px}.element-17 .r{font-family:Trebuchet MS;font-size:16px}.element-18 .r{font-weight:700}.element-19{text-decoration:underline}.element-20 .r{font-weight:700}.element-24 .r,.element-25{font-family:Trebuchet MS;font-size:16px}.element-35{font-weight:700}.element-41 .r,.element-42{font-weight:700}.element-43 .r,.element-44{font-weight:700;font-style:italic}.element-47 .r,.element-48{font-weight:700}`
const VHTML = <div> <p class="p element-0"></p><p class="p element-1"><span class="r element-2">The Case for Coming Out &lt;http://www.thepathoftruth.com/teachings/case-for-coming-out-church-system-churches.htm&gt;</span></p><p class="p element-3"></p><p class="p element-4"><span class="r element-5">Also read the following:</span></p><p class="p element-6"></p><p class="p element-7"><span class="r element-8">The Origin and Identity of Satan &lt;http://www.thepathoftruth.com/teachings/origin-identity-satan.htm&gt;</span></p><p class="p element-9"><span class="r element-10">'</span><span class="r element-11">Satans Redemption &lt;http://www.thepathoftruth.com/false-teachers/derek-prince.htm&gt;</span></p><p class="p element-12"><span class="r element-13">Giants Who Bring Humanity Down &lt;http://www.thepathoftruth.com/false-teachers/douglas-hamp.htm&gt;</span></p><p class="p element-14"></p><p class="p element-15"><span class="r element-16">And more about our salvation and living the life of faith in Christ:</span></p><p class="p element-17"></p><p class="p element-18"><span class="r element-19">Obedience &lt;http://www.thepathoftruth.com/teachings/obedience.htm&gt;</span></p><p class="p element-20"><span class="r element-21">How One Is Saved &lt;http://www.thepathoftruth.com/teachings/how-one-is-saved.htm&gt;</span></p><p class="p element-22"><span class="r element-23">The Cross - Only the Death Sentence Will Avail &lt;http://www.thepathoftruth.com/teachings/the-cross-only-death-sentence-will-avail.htm&gt;</span></p><p class="p element-24"><a><span class="r element-25 Hyperlink">The Cross</span></a></p><p class="p element-26"><a name="_GoBack"></a></p><p class="p element-27"></p><p class="p element-28"></p><p class="p element-29"><span class="r element-30"></span></p><p class="p element-31"></p><p class="p element-32"><span class="r element-33">Styles:</span></p><p class="p element-34"><span class="r element-35">Bold</span><span class="r element-36">,</span></p><p class="p element-37"><span class="r element-38">Italic</span></p><p class="p element-39"><span class="r element-40">Underline</span></p><p class="p element-41"><span class="r element-42">Bold underline</span></p><p class="p element-43"><span class="r element-44">Bold italic</span></p><p class="p element-45"><span class="r element-46">Italic underlined</span></p><p class="p element-47"><span class="r element-48">Bold italic underlined</span></p><p class="p element-49 Heading1"><span class="r element-50">Heading1</span></p><p class="p element-51 Heading2"><span class="r element-52">Heading2</span></p><p class="p element-53"></p></div>
