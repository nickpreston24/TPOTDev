import React from 'react';
import { observer } from 'mobx-react';
import Icon from 'mdi-material-ui/GreasePencil'
import CustomStyleButton from '../utils/CustomStyleButton';
import ColorPalette from './ColorPalette';

const HighlightButton = observer((props) => (
    <CustomStyleButton
        {...props}
        palette={ColorPalette}
        name={'Highlight Button'}
        customType={'background'}
        paletteItems={[
            '#FFFFFF', '#FFF4A3', '#FFA3D5', '#A3D4FF', '#BDFFA3',
        ]}
    >
        <Icon />
    </CustomStyleButton>
))

export default HighlightButton


