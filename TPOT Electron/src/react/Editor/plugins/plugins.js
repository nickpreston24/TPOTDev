// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

import createInlineToolbarPlugin, {
    Separator
} from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
// import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
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

const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlineOneButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton
    ]
});
const sideToolbarPlugin = createSideToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
    ]
});
const muiToolbarPlugin = createMuiToolbarPlugin()

// EXPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

export const {
    InlineToolbar
} = inlineToolbarPlugin;
export const {
    SideToolbar
} = sideToolbarPlugin;
export const {
    MuiToolbar
} = muiToolbarPlugin;


export const plugins = [
    sideToolbarPlugin,
    muiToolbarPlugin
];