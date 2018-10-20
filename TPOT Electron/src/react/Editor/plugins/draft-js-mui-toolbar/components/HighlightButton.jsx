import React, { Component } from 'react';
import CustomStyleButton from '../utils/CustomStyleButton';
import Icon from 'mdi-material-ui/GreasePencil'

export default class HighlightButton extends Component {
    render() {
        return (
            <CustomStyleButton {...this.props} customType={'background'} customPalette={[
                '#FFFFFF', '#FFF4A3', '#FFA3D5', '#A3D4FF', '#BDFFA3',
            ]} name={'Highlight Button'} >
                <Icon />
            </CustomStyleButton>
        );
    }
}

