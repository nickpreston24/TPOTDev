import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import { MuiToolbar, plugins } from "./plugins/plugins";
import Editor from "draft-js-plugins-editor";

class Draft extends Component {

	onChange = editorState =>
		this.props.editorStore.onChange(editorState)

	focus = event => {
		event.preventDefault();
		if (this.editor) { this.editor.focus(); }
	};

	render() {
		const store = { ...this.props.lettersStore, ...this.props.editorStore }

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
	editorStore: PropTypes.object.isRequired,
	lettersStore: PropTypes.object.isRequired
};

export default compose(
	inject('lettersStore', 'editorStore'),
	observer
)(Draft);
