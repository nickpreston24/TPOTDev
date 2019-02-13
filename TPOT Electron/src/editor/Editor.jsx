import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
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
	},
});

class Editor extends React.Component {

	render() {
		const { editorStore: store, classes } = this.props;
		const { focus } = this.props.editorStore
		const { editMode } = store

		return (
			<div id="Editor" className={classes.root}>
				<div id="Frame" className={classes.editorFrame} onClick={()=> { focus() }}>
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
	inject('editorStore'),
	withStyles(MUIstyles),
	observer
)(Editor);
