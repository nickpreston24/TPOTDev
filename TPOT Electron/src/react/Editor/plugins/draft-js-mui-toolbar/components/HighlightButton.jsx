import React, { Component } from 'react';
import CustomStyleButton from '../utils/CustomStyleButton';
import Icon from 'mdi-material-ui/GreasePencil'

export default class HighlightButton extends Component {
    render() {
        return (
            <CustomStyleButton {...this.props} customType={'background'} customPalette={['#BDFFA3']} name={'Highlight Button'} >
                <Icon />
            </CustomStyleButton>
        );
    }
}

