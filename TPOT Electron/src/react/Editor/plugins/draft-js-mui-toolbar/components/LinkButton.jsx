import React, { Component } from 'react';
import InlineStyleButton from '../utils/InlineStyleButton';
import Icon from 'mdi-material-ui/Link'

export default class LinkButton extends Component {
    render() {
        return (
            <InlineStyleButton {...this.props} styleType={'LINK'} name={'Link Button'} >
                <Icon />
            </InlineStyleButton>
        );
    }
}

