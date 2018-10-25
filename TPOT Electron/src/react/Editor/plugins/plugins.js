// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

import createMuiToolbarPlugin from './draft-js-mui-toolbar'
import createSoftNewLinePlugin from '@jimmycode/draft-js-soft-newline-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createLinkPlugin from 'draft-js-link-plugin'
import createImagePlugin from 'draft-js-image-plugin';

import {
    AddLinkButton,
    AddColorButton
} from 'draft-js-buttons-plugin'
import 'draft-js-link-plugin/lib/plugin.css'

// SETUPS
///////////////////////////////////////////////////////////////////////////////////////////////////

const muiToolbarPlugin = createMuiToolbarPlugin()
const softNewLinePlugin = createSoftNewLinePlugin()
const linkPlugin = createLinkPlugin()
const linkifyPlugin = createLinkifyPlugin()
const alignmentPlugin = createAlignmentPlugin()
const imagePlugin = createImagePlugin();

// EXPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

export const {
    MuiToolbar // Pull React componenet from plugin instance
} = muiToolbarPlugin;

export const plugins = [
    alignmentPlugin,
    imagePlugin,
    muiToolbarPlugin,
    softNewLinePlugin,
    linkPlugin,
    // linkifyPlugin
];