import { withStyles } from "@material-ui/core/styles";
import { inject, observer, Provider } from "mobx-react";
import PropTypes from "prop-types";
import React from "react";
import { compose } from "recompose";
import Code from "./Code";
import Draft from "./Draft";
import Original from "./Original";

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
});

class Editor extends React.Component {

	componentDidMount() {
		const { lettersStore: store } = this.props
	}


	// After the class is constructed and its data is mounted to the React DOM, render() is fired, which takes displays the elements with data from the instance's current state.
	render() {
		const { lettersStore: store, classes, editMode } = this.props;
		// const { editMode } = store

		return (
			<div id="Editor" className={classes.root}>
				{/* <noscript>{store.editedState.toString()}</noscript> */}
				<div id="Frame" className={classes.editorFrame}
				// onClick={this.focus}
				>
					{/* <button onClick={this.saveSession}>Feed Me</button> */}
					{editMode === "edited" && <Draft />}
					{editMode === "original" && <Original />}
					{editMode === "code" && <Code />}
				</div>
			</div>
		);
	}
}

Editor.propTypes = {
	classes: PropTypes.object.isRequired
};

export default compose(
	inject('lettersStore'),
	withStyles(MUIstyles),
	observer
)(Editor);

// export default withStyles(MUIstyles)(Wysiwyg)
