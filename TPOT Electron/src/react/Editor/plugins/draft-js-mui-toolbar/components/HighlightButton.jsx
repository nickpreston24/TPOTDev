import React, { Component } from 'react';
import InlineStyleButton from '../utils/InlineStyleButton';
import Icon from 'mdi-material-ui/Marker'

export default class HighlightButton extends Component {
    render() {
        return (
            <InlineStyleButton {...this.props} styleType={'HIGHLIGHT'} name={'Highlight Button'} >
                <Icon />
            </InlineStyleButton>
        );
    }
}

