// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////
import {
    stateFromElement
} from 'draft-js-import-element'
import createStyles from 'draft-js-custom-styles';
import Immutable from 'immutable'
import {
    getSelectedBlocksMap,
    getSelectedBlocksList,
    getSelectedBlock,
    getBlockBeforeSelectedBlock,
    getAllBlocks,
    getSelectedBlocksType,
    removeSelectedBlocksStyle,
    getSelectionText,
    addLineBreakRemovingSelection,
    insertNewUnstyledBlock,
    clearEditorContent,
    getSelectionInlineStyle,
    setBlockData,
    getSelectedBlocksMetadata,
    // blockRenderMap,
    getSelectionEntity,
    getEntityRange,
    handleNewLine,
    isListBlock,
    changeDepth,
    getSelectionCustomInlineStyle,
    toggleCustomInlineStyle,
    removeAllInlineStyles
} from 'draftjs-utils'
import {rgb2hex} from './helpers'


// IMPORTSexpor
///////////////////////////////////////////////////////////////////////////////////////////////////
const OPTIONS = {
    // Should return a Style() or Entity() or null/undefined
    customInlineFn: (element, {
        Style,
        Entity
    }) => {

        let elementStyles = []
        // Generic Styles
        if (element.className === 'highlight') {
            elementStyles.push({
                name: 'backgroundColor',
                data: element.style.backgroundColor
            })
        }
        if (element.parentElement.tagName === "STRONG") {
            elementStyles.push({
                name: 'fontWeight',
                data: 'bold'
            })
        }
        if (element.parentElement.tagName === "EM") {
            elementStyles.push({
                name: 'fontStyle',
                data: 'italic'
            })
        }
        if (element.parentElement.tagName === "INS") {
            elementStyles.push({
                name: 'textDecoration',
                data: 'underline'
            })
        }
        // Color 
        if (element.parentElement.style.color) { // Parent Inline
            elementStyles.push({
                name: 'color',
                data: rgb2hex(element.parentElement.style.color)
            })
        }
        if (element.parentElement.color) { // Parent Font Tag
            elementStyles.push({
                name: 'color',
                data: '#' + element.parentElement.color
            })
        }
        if (element.style.color) { // Normal Inline
            elementStyles.push({
                name: 'color',
                data: rgb2hex(element.style.color)
            })
        }
        // FontSize
        if (element.parentElement.style.fontSize) { // Parent Font-Size
            elementStyles.push({
                name: 'fontSize',
                data: element.parentElement.style.fontSize
            })
        }
        if (element.style.fontSize) { // Normal Font-Size
            elementStyles.push({
                name: 'fontSize',
                data: element.style.fontSize
            })
        }
        // Build Compound Style
        let styleName = 'CUSTOM_'
        let styleData = {}
        elementStyles.forEach(style => {
            styleName += style.name.toUpperCase() + '[' + style.data.toUpperCase() + ']_'
            styleData[style.name] = style.data
        })
        // Final Inline Style
        baseStyleMap[styleName] = styleData
        return Style(styleName);

    },

    // Should return null/undefined or an object with optional: type (string); data (plain object)
    customBlockFn: (element) => {

        if (element.tagName === 'P' && !element.className) {
            return {
                type: 'paragraph',
                data: {
                    style: "color: rgb(192, 0, 0);"
                }
            };
        }
        if (element.className === 'title') {
            return {
                type: 'title'
            };
        }
        if (element.className === 'subtitle') {
            return {
                type: 'subtitle'
            };
        }
        if (element.className === 'quote') {
            return {
                type: 'blockquote'
            };
        }
        if (element.className === 'intense-quote') {
            return {
                type: 'blockquote-intense'
            };
        }
        if (element.className === 'indent') {
            return {
                type: 'indent'
            };
        }
        if (element.className === 'block') {
            return {
                type: 'block'
            };
        }
        if (element.style.textAlign) {
            console.log(element)
            return {
                data: {
                    style: 'text-align: center;'
                }
            };
        }
    },
    elementStyles: {

    },
};

const {
    styles,
    customStyleFn,
    exporter
} = createStyles(['font-size', 'color', 'background'], 'CUSTOM', baseStyleMap);

// Native Draft
const baseStyleMap = {
    'HIGHLIGHT': {
        background: 'yellow'
    },
    'INDENT': {
        marginLeft: "30px"
    },
    'CENTER': {
        textAlign: "center"
    },
};

// Native Draft
const blockRenderMap = Immutable.Map({
    'paragraph': {
        element: 'p'
    },
    'header-one': {
        element: 'h1'
    },
    'header-two': {
        element: 'h2'
    },
    'header-three': {
        element: 'h3'
    },
    'header-four': {
        element: 'h4'
    },
    'header-five': {
        element: 'h5'
    },
    'header-six': {
        element: 'h6'
    },
    'codeblock': {
        element: 'code'
    },
    'title': {
        element: 'h1'
    },
    'subtitle': {
        element: 'h4'
    },
    'blockquote': {
        element: 'blockquote'
    },
    'blockquote-intense': {
        element: 'blockquote'
    },
    'indent': {
        element: 'p'
    },
    'block': {
        element: 'p'
    },
});

// Native Draft
function myBlockStyleFn(contentBlock) {
    // console.log("CONTENT BLOCK", contentBlock) 
    // const type = contentBlock.getType();
    // Gets Block type and Maps to a CSS Class name to style the block.
    return contentBlock.getType()
    // if (type === 'title') { return 'title'; }
    // if (type === 'subtitle') { return 'subtitle'; }
    // if (type === 'blockquote') { return 'blockqoute'; }
    // if (type === 'blockquote-intense') { return 'blockquote-intense'; }
    // if (type === 'indent') { return 'indent'; }
    // if (type === 'block') { return 'block'; }
}

// function myBlockRenderer(contentBlock, editorState) {
//         // console.log(contentBlock, editorState)
//         const type = contentBlock.getType();
//         if (!contentBlock.getText()) {
//                 // let EditorState = editorState
//                 // console.log(EditorState.getCurrentContent())
//                 // Modifier.removeRange(EditorState.getCurrentContent())
//                 // console.log(contentBlock, editorState)

//                 // console.log(editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getAnchorKey()).getText().slice(editorState.getSelection().getStartOffset(), editorState.getSelection().getEndOffset()))
//                 // console.log("Type", contentBlock.getType(), "Key", contentBlock.getKey(), "Text", contentBlock.getText(), "Chars", contentBlock.getCharacterList(), "Length", contentBlock.getLength(), "Data", contentBlock.getData())
//         }
//         if (type === 'atomic') {
//                 return {
//                         component: 'paragraph',
//                         editable: false,
//                         props: {
//                                 foo: 'bar',
//                         },
//                 };
//         }
// }


// const VCLASS = `.Heading2 .r,.Heading2Char,.element-38,.element-45 .r,.element-46,.element-47 .r,.element-48{font-style:italic}.Hyperlink,.element-10,.element-13,.element-2,.element-21,.element-22 .r,.element-23,.element-26 .r,.element-40,.element-41 .r,.element-42,.element-45 .r,.element-46,.element-47 .r,.element-48,.element-8{text-decoration:underline}.tbl{border-collapse:collapse}.r{font-family:Calibri}.Heading1 .r,.Heading1Char,.Heading2 .r,.Heading2Char{font-family:Calibri Light;font-weight:700}.Normal{line-height:1.0791666666666666;margin-bottom:10px}.Heading1,.Heading2{margin-top:16px;margin-bottom:4px}.Normal .r{font-size:14px}.Heading1 .r{font-size:21px}.element-0,.element-1,.element-12,.element-14,.element-15,.element-17,.element-18,.element-20,.element-3,.element-4,.element-6,.element-7{line-height:1;margin-bottom:0}.Heading2 .r{font-size:18px}.TableNormal{margin-left:0}.Hyperlink{color:#0563C1}.UnresolvedMention{color:#605E5C;background-color:#E1DFDD}.element-1 .r,.element-2{color:#00F}.Heading1Char{font-size:21px}.Heading2Char{font-size:18px}.element-0 .r,.element-1 .r,.element-2,.element-3 .r{font-size:16px;font-family:Trebuchet MS}.element-4 .r,.element-5{font-family:Trebuchet MS;color:red;font-size:16px}.element-10,.element-11,.element-12 .r,.element-13,.element-7 .r,.element-8,.element-9 .r{color:#00F;font-size:16px;font-family:Trebuchet MS}.element-6 .r{font-family:Trebuchet MS;font-size:16px}.element-7 .r{font-weight:700}.element-9{line-height:1;margin-bottom:0}.element-10,.element-11,.element-9 .r{font-weight:700}.element-12 .r{font-weight:700}.element-14 .r{font-family:Trebuchet MS;font-size:16px}.element-15 .r,.element-16{font-family:Trebuchet MS;color:#00B050;font-size:16px}.element-18 .r,.element-19,.element-20 .r,.element-21,.element-22 .r,.element-23,.element-26 .r{font-family:Trebuchet MS;color:#00F;font-size:16px}.element-17 .r{font-family:Trebuchet MS;font-size:16px}.element-18 .r{font-weight:700}.element-19{text-decoration:underline}.element-20 .r{font-weight:700}.element-24 .r,.element-25{font-family:Trebuchet MS;font-size:16px}.element-35{font-weight:700}.element-41 .r,.element-42{font-weight:700}.element-43 .r,.element-44{font-weight:700;font-style:italic}.element-47 .r,.element-48{font-weight:700}`
// const VHTML = <div> <p class="p element-0"></p><p class="p element-1"><span class="r element-2">The Case for Coming Out &lt;http://www.thepathoftruth.com/teachings/case-for-coming-out-church-system-churches.htm&gt;</span></p><p class="p element-3"></p><p class="p element-4"><span class="r element-5">Also read the following:</span></p><p class="p element-6"></p><p class="p element-7"><span class="r element-8">The Origin and Identity of Satan &lt;http://www.thepathoftruth.com/teachings/origin-identity-satan.htm&gt;</span></p><p class="p element-9"><span class="r element-10">'</span><span class="r element-11">Satans Redemption &lt;http://www.thepathoftruth.com/false-teachers/derek-prince.htm&gt;</span></p><p class="p element-12"><span class="r element-13">Giants Who Bring Humanity Down &lt;http://www.thepathoftruth.com/false-teachers/douglas-hamp.htm&gt;</span></p><p class="p element-14"></p><p class="p element-15"><span class="r element-16">And more about our salvation and living the life of faith in Christ:</span></p><p class="p element-17"></p><p class="p element-18"><span class="r element-19">Obedience &lt;http://www.thepathoftruth.com/teachings/obedience.htm&gt;</span></p><p class="p element-20"><span class="r element-21">How One Is Saved &lt;http://www.thepathoftruth.com/teachings/how-one-is-saved.htm&gt;</span></p><p class="p element-22"><span class="r element-23">The Cross - Only the Death Sentence Will Avail &lt;http://www.thepathoftruth.com/teachings/the-cross-only-death-sentence-will-avail.htm&gt;</span></p><p class="p element-24"><a><span class="r element-25 Hyperlink">The Cross</span></a></p><p class="p element-26"><a name="_GoBack"></a></p><p class="p element-27"></p><p class="p element-28"></p><p class="p element-29"><span class="r element-30"></span></p><p class="p element-31"></p><p class="p element-32"><span class="r element-33">Styles:</span></p><p class="p element-34"><span class="r element-35">Bold</span><span class="r element-36">,</span></p><p class="p element-37"><span class="r element-38">Italic</span></p><p class="p element-39"><span class="r element-40">Underline</span></p><p class="p element-41"><span class="r element-42">Bold underline</span></p><p class="p element-43"><span class="r element-44">Bold italic</span></p><p class="p element-45"><span class="r element-46">Italic underlined</span></p><p class="p element-47"><span class="r element-48">Bold italic underlined</span></p><p class="p element-49 Heading1"><span class="r element-50">Heading1</span></p><p class="p element-51 Heading2"><span class="r element-52">Heading2</span></p><p class="p element-53"></p></div>

// const blocksFromHtml = convertFromHTML(htmlNew)
// // console.log(htmlNew, blocksFromHtml)
// // const blocksFromHtml = htmlToDraft(html, (nodeName, node) => {
// //         if (nodeName === 'br') {
// //                 return {
// //                         type: 'HORIZONTAL_RULE',
// //                         mutability: 'MUTABLE',
// //                         data: {}
// //                 };
// //         }
// // })
// const htmlContent2 = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);

export {
    OPTIONS,
    styles,
    exporter,
    customStyleFn,
    baseStyleMap,
    myBlockStyleFn,
    blockRenderMap
}