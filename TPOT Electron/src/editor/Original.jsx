import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";

import { inject, observer, Provider } from "mobx-react";
import { observable, action, computed, decorate, autorun } from 'mobx'
import { compose } from "recompose";

class Original extends React.Component {

	componentDidMount() {
		const { lettersStore: store } = this.props
		// store.setEditorState('edited', EditorState.createEmpty())
	}


	// After the class is constructed and its data is mounted to the React DOM, render() is fired, which takes displays the elements with data from the instance's current state.
	render() {
		const { lettersStore: store, classes, editMode } = this.props;

		return (
			<Fragment>
				{ReactHtmlParser(this.props.editorStore.originalState)}
			</Fragment>
		);
	}
}

Original.propTypes = {
	// classes: PropTypes.object.isRequired
};

export default compose(
	inject('editorStore'),
	// withStyles(MUIstyles),
	observer
)(Original);

// export default withStyles(MUIstyles)(Wysiwyg)
