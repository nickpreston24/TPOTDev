import { withStyles } from "@material-ui/core/styles";
import { convertToRaw, getDefaultKeyBinding, KeyBindingUtil, EditorState } from "draft-js";
// Custom DraftJS Architecture
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import JSONPretty from "react-json-pretty";
import { MuiToolbar, plugins } from "./plugins/plugins";
import { rest } from "./utils/helpers";
import {
	baseBlockStyleFn,
	baseStyleMap,
	blockRenderer,
	blockRenderMap,
	draftContentFromHtml,
	draftContentToHtml,
	stateFromElementConfig
} from "./utils/transforms";
import PublishScreenContainer from "../container/PublishScreenContainer";
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljs from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { inject, observer } from "mobx-react";
import { observable, action, computed, decorate, autorun } from 'mobx'
import { compose } from "recompose";

// Electron (change to import method later)
const electron = window.require("electron");
const remote = electron.remote;
const app = remote.app;
const fs = remote.require("fs");
const path = remote.require("path");

const MUIstyles = theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		flexGrow: 1,
		background: "white",
		height: "calc(100vh - 104px)",
		boxShadow: "0px",
		overflow: "hidden"
		// border: '4px solid lime',
	},
	editorFrame: {
		padding: 80,
		paddingLeft: 160,
		paddingRight: 160,
		position: "relative",
		left: "50%",
		transform: "translateX(-50%)",
		minWidth: 700,
		width: "70vw",
		maxWidth: 1000,
		overflowX: "hidden",
		overflowY: "scroll"
		// backgroundColor: '#f0f0f0',
		// border: '4px solid blue !important',
	},
	modal: {
		paddingTop: "400px !important"
	}
});

class Wysiwyg extends React.Component {
	state = {
		originalState: "I am Original",
		editorState: createEditorStateWithText(
			"This is some starter text. Start typing!"
		),
		codeState: "I am Code",
		baseStyleMap: baseStyleMap
	};

	componentDidMount() {
        const { lettersStore: store } = this.props
        store.setEditorState('edited', EditorState.createEmpty())

		window.addEventListener("message", msg => {
			if (msg.data.event === "draftjs-editor-reload") {
				this.reloadEditor(msg.data.html);
			}
			if (msg.data.event === "draftjs-editor-get-code") {
				this.getCode();
			}
		});
    }

    onChange = editorState => {
        console.log(this.props)
        const { lettersStore: store } = this.props
        store.setEditorState('edited', editorState)
		this.setState({ editorState });
    };
    
    focus = event => {
		event.preventDefault();
		if (this.editor) { this.editor.focus(); }
	};


	setStyleMap = customStyleMap => {
		this.setState({ baseStyleMap: customStyleMap });
	};


	getData(e) {
		// console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
		console.group("DATA");
		console.log("Editor State", this.state.editorState);
		console.log(
			"Block Map",
			convertToRaw(this.state.editorState.getCurrentContent()).blocks
		);
		console.log(
			"Entity Map",
			convertToRaw(this.state.editorState.getCurrentContent()).entityMap
		);
		console.groupEnd();
		// console.log(block.key + '\n', block.text + '\n', block.type + '\n', block.depth + '\n', block.data)
	}

	async reloadEditor(html) {
        const { lettersStore: store } = this.props
		await rest(0);
		const newContentState = draftContentFromHtml(
			html,
			stateFromElementConfig,
			this.state.baseStyleMap
		);
		// const newOriginalState = createNode(html)
		const newEditorState = EditorState.createWithContent(newContentState);
		// const rawStateAsText = convertToRaw(newContentState).blocks
		// const rawStateAsText = convertToRaw(newContentState)
		// console.log(newContentState)
		const rawHTML = draftContentToHtml(newEditorState, newContentState);
		const rawHTMLPretty = rawHTML;

        store.setEditorState('original', html)
        store.setEditorState('edited', newEditorState)
        store.setEditorState('code', rawHTML)

		// console.log(rawHTMLPretty)
		this.setState({
			originalState: html,
			editorState: newEditorState,
			codeState: rawHTMLPretty
			// codeState: rawStateAsText,
		});
	}

	async getCode() {
        const { lettersStore: store } = this.props
        const editorState = store.editedState
		const html = draftContentToHtml(
			editorState,
			editorState.getCurrentContent()
        );
        store.setEditorState('code',  html)
		// console.log(codeState)
		// const codeState = convertToRaw(this.state.editorState.getCurrentContent())
		this.setState({ codeState: html })
    }
    
    getState() {
        const { lettersStore: store } = this.props
        const editorState = store.editedState
        // this.setState({editorState})
        return this.state.editorState
    }

    // es = observable.box(this.props.lettersStore.editedState)

    // dispatch = autorun(() => {
    //     console.log("update")
    // });

    myKeyBindingFn = (e) => {
        const {hasCommandModifier} = KeyBindingUtil;
        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
            return 'save'
        }
        if (e.keyCode === 79 /* `O key */ && hasCommandModifier(e)) {
            return 'open'
        }
        if (e.keyCode === 80 /* `S` key */ && hasCommandModifier(e)) {
            return 'publish'
        }
        return getDefaultKeyBinding(e);
    }

    handleKeyCommand = (command) => {
        const { lettersStore: store } = this.props
        if (command === 'save') {
            store.saveSession()
            return 'handled';
        }
        if (command === 'open') {
            // store.saveSession()
            console.log('load file')
            return 'handled';
        }
        if (command === 'publish') {
            store.togglePublishModal()
            return 'handled';
        }
        return 'not-handled';
    }
    
    
	// After the class is constructed and its data is mounted to the React DOM, render() is fired, which takes displays the elements with data from the instance's current state.
	render() {
        const { lettersStore: store, classes, editMode } = this.props;
        console.log(store.editedState)
        // this.setState({editorState: store.editedState})
        //         const { lettersStore: store } = this.props
        // store.setEditorState('edited', editorState)
    //     	onChange = editorState => {
    //     const { lettersStore: store } = this.props
    //     store.setEditorState('edited', editorState)
	// 	// this.setState({
	// 	// 	editorState
	// 	// });
	// };
		return (
			<div id="Editor" className={classes.root}>
                    <noscript>{store.editedState.toString()}</noscript>
				<div
					id="Frame"
					className={classes.editorFrame}
					onClick={this.focus}
				>
					{/* <button onClick={this.saveSession}>Feed Me</button> */}
					{(editMode === "edited") && (
						<React.Fragment>
                            
							<Editor
								id={"DraftJS"}
								ref={element => {
									this.editor = element;
								}}
								placeholder="The editor is empty."
								editorState={this.state.editorState}
                                onChange={this.onChange}
                                handleKeyCommand={this.handleKeyCommand}
                                keyBindingFn={this.myKeyBindingFn}
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
					)}
					{editMode === "original" && (
						<Fragment>
							{ReactHtmlParser(store.originalState)}
						</Fragment>
					)}
					{editMode === "code" && (
                        // <JSONPretty
                        //     id="json-pretty"
                        //     json={store.codeState}
                        // />
                        <SyntaxHighlighter
                            showLineNumbers 
                            wrapLines
                            lineProps={{ style: { border: '0px solid yellow'}}}
                            children={store.codeState}
                            language='html'
                            style={hljs.solarizedLight}
                            customStyle={{
                                border: '0PXsolid blue',
                                borderRadius: 16,
                                background: 'transparent',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                // fontFamily: 'Monda',
                                // fontWeight: 'bold',
                                // fontSize: 16,
                            }}
                            codeTagProps={{style: {border: '0px solid red'}}}
                        />
					)}
				</div>
			</div>
		);
	}
}

Wysiwyg.propTypes = {
	classes: PropTypes.object.isRequired
};

export default compose(
	inject("lettersStore"),
	withStyles(MUIstyles),
	observer
)(Wysiwyg);

// export default withStyles(MUIstyles)(Wysiwyg)
