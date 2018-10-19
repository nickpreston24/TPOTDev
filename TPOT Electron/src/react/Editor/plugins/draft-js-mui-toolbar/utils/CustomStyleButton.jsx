import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const MuiStyles = theme => ({
    root: {
        color: theme.palette.secondary.textDark,
        minWidth: 40,
        maxWidth: 40,
        maxHeight: 40,
        maxHeight: 40,
    },
    active: {
        color: theme.palette.accent,
        fill: theme.palette.accent,
    }
});

class CustomStyleButton extends Component {

    toggleStyle = async (event) => {
        event.preventDefault();

        const PREFIX = this.props.customStylePrefix
        const CUSTOM_PROP = this.props.customType
        const CUSTOM_NAME = `${PREFIX}${CUSTOM_PROP.toUpperCase()}_${this.props.customPalette[0]}`
        const CUSTOM_ATTRB = `${this.props.customPalette[0]}`

        // Update the style map with the new custom style before you try to apply the class with customStyleFunctions[property-name].toggle()
        const STYLE_MAP = Object.assign(this.props.getEditorProps().customStyleMap, { [`${CUSTOM_NAME}`]: { [`${CUSTOM_PROP}`]: CUSTOM_ATTRB } })
        await this.props.getEditorProps().setStyleMap(STYLE_MAP)

        // Toggle the style using the attribute name (ex:  #FF0099, 24PX, LIME, etc.)
        this.props.setEditorState(
            this.props.customStyleFunctions[`${CUSTOM_PROP}`].toggle(
                this.props.getEditorState(),
                CUSTOM_ATTRB.toUpperCase()
            )
        );

    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => this.props.getEditorState && this.props.getEditorState().getCurrentInlineStyle().has(`${this.props.customStylePrefix}${this.props.customType.toUpperCase()}_${this.props.customPalette[0].toUpperCase()}`)

    render() {
        const { classes, name } = this.props;
        return (
            <div id={name} onMouseDown={this.preventBubblingUp} >
                <Button
                    className={classNames(classes.root, this.styleIsActive() && classes.active)}
                    children={this.props.children}
                    onClick={this.toggleStyle}
                />
            </div>
        );
    }
}

export default withStyles(MuiStyles)(CustomStyleButton);