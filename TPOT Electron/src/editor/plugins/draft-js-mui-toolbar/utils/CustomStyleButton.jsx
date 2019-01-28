import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import classNames from 'classnames';
import { compose } from "recompose";
import { inject, observer, Provider } from "mobx-react";
import ButtonPlus from './ButtonPlus'

const MuiStyles = theme => ({
    root: {
        color: theme.palette.secondary.textDark,
        // minWidth: 40,
        // maxWidth: 40,
        // minHeight: 40,
        // maxHeight: 40,
    },
    active: {
        color: theme.palette.accent,
        fill: theme.palette.accent,
    }
});

class CustomStyleButton extends Component {

    state = {
        anchorEl: null,
        paletteOpen: false,
    };

    preventBubblingUp = (event) => { event.preventDefault(); }

    toggleStyle = async (event, value) => {
        console.log('CLICK')
        event.preventDefault();

        const PREFIX = this.props.customStylePrefix
        const CUSTOM_PROP = this.props.customType
        const CUSTOM_NAME = `${PREFIX}${CUSTOM_PROP.toUpperCase()}_${value}`
        const CUSTOM_ATTRB = `${value}`

        const customStyleMap = JSON.parse(JSON.stringify(this.props.editorStore.baseStyleMap))
        // Update the style map with the new custom style before you try to apply the class with customStyleFunctions[property-name].toggle()
        const STYLE_MAP = Object.assign(customStyleMap, { [`${CUSTOM_NAME}`]: { [`${CUSTOM_PROP}`]: CUSTOM_ATTRB } })
        // await this.props.getEditorProps().setStyleMap(STYLE_MAP)
        this.props.editorStore.setStyleMap(STYLE_MAP)

        // Toggle the style using the attribute name (ex:  #FF0099, 24PX, LIME, etc.)
        this.props.setEditorState(
            this.props.customStyleFunctions[`${CUSTOM_PROP}`].toggle(
                this.props.getEditorState(),
                CUSTOM_ATTRB.toUpperCase()
            )
        );

        this.props.store.setStyleProp('menuOpen', false)

    }


    handleParentButton = (event) => {
        event.preventDefault();

        this.props.store.setStyleProp('menuOpen', true)
    };

    handleChildButton = (event) => {
        // event.preventDefault();
        console.log('child')

        this.toggleStyle()
        this.props.store.setStyleProp('menuOpen', false)
    };

    handleRef = (element) => {
        this.setState({ anchorEl: element })
    }

    handleClose = () => {
        this.setState({ paletteOpen: false })
    }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => this.props.getEditorState && !!this.props.paletteItems && this.props.getEditorState().getCurrentInlineStyle().has(`${this.props.customStylePrefix}${this.props.customType.toUpperCase()}_${this.props.paletteItems[0].toUpperCase()}`)

    render() {
        const { classes, name } = this.props;
        const Palette = this.props.palette
        console.log(this.props.paletteItems)


        // this.props.store.setStyleProp('menuOpen', true)

        // this.props.store.inlineRef.focus()
        // this.props.store.setStyleProp()
        // console.log(this.props.store.inlineRef)
        return (
            <div id={name} onMouseDown={this.preventBubblingUp} ref={this.handleRef} >
                {/* If this is a single function button */}
                <ButtonPlus
                    className={classNames(classes.root, this.styleIsActive() && classes.active)}
                    children={this.props.children}
                    onClick={this.handleParentButton}

                >{this.props.children}</ButtonPlus>

                {/* If this is a multi-function palette opening button */}
                {this.props.palette &&
                    <Palette
                        open={this.state.paletteOpen}
                        anchorEl={this.state.anchorEl}
                    >
                        {this.props.paletteItems.map((swatch, index) => {
                            return (
                                <ButtonPlus key={index} onClick={(e)=> this.toggleStyle(e, swatch)} style={{background: swatch}}></ButtonPlus>
                            );
                        })}
                    </Palette>
                }

                {/* <Popover
                    anchorEl={this.state.anchorEl}
                    open={this.state.paletteOpen}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {this.props.customPalette.map((entry, index) => {
                        return (
                            <ButtonPlus key={index} style={{background: `${entry}`, minWidth: 40, maxWidth: 40, borderRadius: 20}} onClick={(e) => this.toggleStyle(e, entry)}></ButtonPlus>
                        );
                    })}
                </Popover> */}
            </div>
        );
    }
}

// export default withStyles(MuiStyles)(CustomStyleButton);

export default compose(
    inject('editorStore', 'store'),
    withStyles(MuiStyles),
    observer
)(CustomStyleButton);