// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

import createInlineToolbarPlugin, {
    Separator
} from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
// import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
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

// Toolbar
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
export const {
    InlineToolbar
} = inlineToolbarPlugin;

// Sidebar
const sideToolbarPlugin = createSideToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
    ]
});
export const {SideToolbar} = sideToolbarPlugin;

// const imagePlugin = createImagePlugin();

export const plugins = [
    inlineToolbarPlugin,
    sideToolbarPlugin
];