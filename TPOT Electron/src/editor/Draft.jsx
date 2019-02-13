import React, { Component, Fragment } from "react";
import { MuiToolbar, plugins } from "./plugins/plugins";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import Editor from "draft-js-plugins-editor";

class Draft extends Component {

	componentDidMount = () =>
		this.props.editorStore.focus()

	handleRef = element =>
		this.props.editorStore.setRef(element)

	render() {
		const store = { ...this.props.lettersStore, ...this.props.editorStore }

		return (
			<Fragment>
				<Editor
					id={"DraftJS"}
					ref={this.handleRef}
					placeholder="The editor is empty."
					editorState={store.editorState}
					onChange={editorState => this.props.editorStore.onChange(editorState)}
					handleKeyCommand={command => this.props.editorStore.handleKeyCommand(command, this.props.lettersStore)}
					keyBindingFn={this.props.editorStore.myKeyBindingFn}
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
