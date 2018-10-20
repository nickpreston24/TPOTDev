// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

import createMuiToolbarPlugin from './draft-js-mui-toolbar'
import createSoftNewLinePlugin from '@jimmycode/draft-js-soft-newline-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createLinkPlugin from 'draft-js-link-plugin'
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

// EXPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

export const {
    MuiToolbar // Pull React componenet from plugin instance
} = muiToolbarPlugin;

export const plugins = [
    muiToolbarPlugin,
    softNewLinePlugin,
    linkPlugin,
    linkifyPlugin
];