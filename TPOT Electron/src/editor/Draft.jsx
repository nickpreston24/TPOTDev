import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import { MuiToolbar, plugins } from "./plugins/plugins";
import Editor from "draft-js-plugins-editor";

class Draft extends Component {

	componentDidMount() {
		const { lettersStore: store } = this.props

		window.addEventListener("message", msg => {
			if (msg.data.event === "draftjs-editor-reload") {
				this.props.editorStore.loadEditorFromDocx(msg.data.html)
				// this.reloadEditor(msg.data.html);
			}
			if (msg.data.event === "draftjs-editor-get-code") {
				// this.getCode();
				// console.log(this.props.editorStore.editorCode)
			}
		});
	}

	onChange = editorState =>
		this.props.editorStore.onChange(editorState)

	focus = event => {
		event.preventDefault();
		if (this.editor) { this.editor.focus(); }
	};

	// After the class is constructed and its data is mounted to the React DOM, render() is fired, which takes displays the elements with data from the instance's current state.
	render() {
		const { classes, editMode } = this.props;
		const store = { ...this.props.lettersStore, ...this.props.editorStore }
		console.log(store)

		return (
			<Fragment>
				<Editor
					id={"DraftJS"}
					ref={element => { this.editor = element }}
					placeholder="The editor is empty."
					editorState={store.editorState}
					onChange={editorState => this.props.editorStore.onChange(editorState)}
					handleKeyCommand={command => this.props.editorStore.handleKeyCommand(command, store)}
					keyBindingFn={store.myKeyBindingFn}
					setStyleMap={map => this.props.editorStore.setStyleMap(map)}
					customStyleMap={store.baseStyleMap} // STYLE MAP TO TYPE
					blockRenderMap={store.blockRenderMap} // BLOCK MAP MAP TO TYPE
					// customStyleFn={customStyleFn} // STYLE & ENTITY CLASS FUNCTION
					blockStyleFn={store.baseBlockStyleFn} // BLOCK & ATOMIC CLASS FUNCTION
					blockRendererFn={store.blockRenderer} // BLOCK ?/& ATOMIC PROPS=>COMP RENDERER
					plugins={plugins}
					spellCheck={true}
				/>
				<MuiToolbar />
			</Fragment>
		);
	}
}

Draft.propTypes = {
	editorStore: PropTypes.object.isRequired
};

export default compose(
	inject('lettersStore', 'editorStore'),
	// withStyles(MUIstyles),
	observer
)(Draft);
