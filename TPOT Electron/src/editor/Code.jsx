import PropTypes from "prop-types";
import React, { Fragment } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljs from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { inject, observer, Provider } from "mobx-react";
import { observable, action, computed, decorate, autorun } from 'mobx'
import { compose } from "recompose";


const MUIstyles = theme => ({
	root: {
		// display: "flex",
		// flexWrap: "wrap",
		// flexGrow: 1,
		// background: "white",
		// height: "calc(100vh - 104px)",
		// boxShadow: "0px",
		// overflow: "hidden"
		// border: '4px solid lime',
	},
});

class Code extends React.Component {
	// state = {
	// 	originalState: "I am Original",
	// 	editorState: createEditorStateWithText(
	// 		"This is some starter text. Start typing!"
	// 	),
	// 	codeState: "I am Code",
	// 	baseStyleMap: baseStyleMap
	// };

	componentDidMount() {
		const { lettersStore: store } = this.props
		// store.setEditorState('edited', EditorState.createEmpty())

		// window.addEventListener("message", msg => {
		// 	if (msg.data.event === "draftjs-editor-reload") {
		// 		this.reloadEditor(msg.data.html);
		// 	}
		// 	if (msg.data.event === "draftjs-editor-get-code") {
		// 		this.getCode();
		// 	}
		// });
	}


	// After the class is constructed and its data is mounted to the React DOM, render() is fired, which takes displays the elements with data from the instance's current state.
	render() {
		const { lettersStore: store, classes, editMode } = this.props;
		console.log(this.props)
		// console.log(store.editedState)
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
			<SyntaxHighlighter
				showLineNumbers
				wrapLines
				lineProps={{ style: { border: '0px solid yellow' } }}
				children={this.props.editorStore.codeState}
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
				codeTagProps={{ style: { border: '0px solid red' } }}
			/>
		);
	}
}

Code.propTypes = {
	// classes: PropTypes.object.isRequired
};

export default compose(
	inject('editorStore'),
	// withStyles(MUIstyles),
	observer
)(Code);

// export default withStyles(MUIstyles)(Wysiwyg)
