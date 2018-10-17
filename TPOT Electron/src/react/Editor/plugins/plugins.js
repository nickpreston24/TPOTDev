// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

import createMuiToolbarPlugin from './draft-js-mui-toolbar'
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';

// SETUPS
///////////////////////////////////////////////////////////////////////////////////////////////////

const muiToolbarPlugin = createMuiToolbarPlugin()

// EXPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

export const {
    MuiToolbar // Pull React componenet from plugin instance
} = muiToolbarPlugin;

export const plugins = [
    muiToolbarPlugin
];