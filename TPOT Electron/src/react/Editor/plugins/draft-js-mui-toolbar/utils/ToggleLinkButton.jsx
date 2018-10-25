import React, { Component } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
const smalltalk = require('smalltalk')

const styles = theme => ({
    root: {
        color: theme.palette.secondary.textDark,
        minWidth: 40,
        maxWidth: 40,
        maxHeight: 40,
        maxHeight: 40,
    },
    active: {
        color: theme.palette.accent
    }
});

class ToggleLinkButton extends Component {

    createLink = (event) => {
        event.preventDefault();

        console.log(this.props.getEditorRef())


        // this.button.focus()
        this.props.getEditorRef().focus()
        const editorState = this.props.getEditorState()
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: 'www.thepathoftruth.com/new.htm' }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.props.setEditorState(
            RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
        );

        if (false) {
            smalltalk
                .prompt('Add Link', 'ex: www.thepathoftruth.com')
                .then((value) => {
                    this.button.focus()
                    this.props.getEditorRef().focus()
                    const editorState = this.props.getEditorState()
                    const contentState = editorState.getCurrentContent();
                    const contentStateWithEntity = contentState.createEntity(
                        'LINK',
                        'MUTABLE',
                        { url: value }
                    );
                    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
                    this.props.setEditorState(
                        RichUtils.toggleLink(
                            newEditorState,
                            newEditorState.getSelection(),
                            entityKey
                        ),
                    );
                })
                .catch(() => {
                    console.log('cancel');
                });
        }
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => RichUtils.getCurrentBlockType(this.props.getEditorState && this.props.getEditorState()) === this.props.blockType

    render() {
        const { classes, name } = this.props;
        return (
            <div id={name} onMouseDown={this.preventBubblingUp} >
                <Button
                    ref={(element) => { this.button = element; }}
                    className={classNames(classes.root, this.styleIsActive() && classes.active)}
                    children={this.props.children}
                    onClick={this.createLink}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ToggleLinkButton);