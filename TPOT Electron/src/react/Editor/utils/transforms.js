// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////
import '../config/editor.css'
import {
    stateFromElement
} from 'draft-js-import-element'
import {
    stateToHTML
} from 'draft-js-export-html'
import {
    rgb2hex,
    Object
} from './helpers'
import {
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import Immutable from 'immutable'
import createNode from 'create-node'
import snakeCase from 'snake-case'


// CUSTOM STYLES SETUP (Package by @webdeveloperpr)
///////////////////////////////////////////////////////////////////////////////////////////////////
const {
    styles,
    customStyleFn,
    exporter
} = createStyles(['font-size', 'color', 'background'], 'CUSTOM', baseStyleMap);



// VANILLA DRAFT MAPS, RENDERERS, & FUNCTIONs
///////////////////////////////////////////////////////////////////////////////////////////////////

const baseStyleMap = {
    // These are custom style classes on top of Draft defaults ("BOLD", "ITALIC", "UNDERLINE")
    // Single property per class name so edit buttons can toggle the property on or off
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

const blockRenderMap = Immutable.Map({
    // When the editor sees a block of type x, render the block using the following html tag
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

const baseBlockStyleFn = (contentBlock) => {
    // When there is a block of type, return a css class name to style the block and make it pretty
    const type = contentBlock.getType();
    const align = contentBlock.getData().get('textAlignment')
    if (type === 'title') {
        return 'title';
    }
    if (type === 'subtitle') {
        return 'subtitle';
    }
    if (type === 'blockquote') {
        return 'blockqoute';
    }
    if (type === 'blockquote-intense') {
        return 'blockquote-intense';
    }
    if (type === 'indent') {
        return 'indent';
    }
    if (type === 'block') {
        return 'block';
    }
    if (align) return align
}


// STATE FROM ELEMENT WRAPPER FUNCTION (Package by @sstur + stuff by Braden)
///////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORT FUNCTION
// make ContentState from HTML String
const draftContentFromHtml = (html, stateFromElementConfig, baseStyleMap) => {
    let contentState = stateFromElement(createNode(`<div>${html}</div>`), stateFromElementConfig)
    let newContentState = flattenInlineStyleRanges(contentState, baseStyleMap)
    return newContentState
}

// break apart multi-property Styles into single, inline Styles
const flattenInlineStyleRanges = (contentState, baseStyleMap) => {
    let defaultStyles = {
        fontWeight: "BOLD",
        fontStyle: "ITALIC",
        textDecoration: "UNDERLINE"
    }
    let newContentState = convertToRaw(contentState)
    let blocks = newContentState.blocks
    let deleteStyles = []

    // Block Map
    blocks.forEach(block => {
        let compoundStyleRanges = block.inlineStyleRanges
        let singleStyleRanges = []

        // Compound Style Ranges
        compoundStyleRanges.forEach(styleRange => {
            let compoundStyleRangeName = styleRange.style
            let compoundStyleRangeClassProperties = baseStyleMap[compoundStyleRangeName]
            deleteStyles.push(compoundStyleRangeName) // All previous custom styles need to be removed after this forEach loop is done

            // Normal Vanilla Styles  -  EX: BOLD
            if (compoundStyleRangeClassProperties === undefined) {
                singleStyleRanges.push({
                    offset: styleRange.offset,
                    length: styleRange.length,
                    style: compoundStyleRangeName
                }) // Push Inline Range 
            } else {
                // Custom Named Styles  -  EX: CUSTOM_COLOR[#C00000]_FONT_WEIGHT[BOLD]_FONTSIZE[48PX]
                for (const key in compoundStyleRangeClassProperties) {
                    if (compoundStyleRangeClassProperties.hasOwnProperty(key)) {
                        const styleName = key;
                        const styleProperty = compoundStyleRangeClassProperties[key]
                        if (Object.keys(defaultStyles).includes(styleName)) {
                            // EX: CUSTOM_FONT_WEIGHT[BOLD]  <<--- This is a vanilla style that needs mapped to be "BOLD"
                            let className = defaultStyles[styleName].toUpperCase()
                            singleStyleRanges.push({
                                offset: styleRange.offset,
                                length: styleRange.length,
                                style: className
                            }) // Push Inline Range
                        } else {
                            // EX: CUSTOM_COLOR[#404040]  <<--- This is a custom inline style who's mapping matches the styleName, and needs to create an entry in the baseStyleMap
                            let className = `CUSTOM_${snakeCase(styleName).toUpperCase()}_${styleProperty.toUpperCase()}`
                            singleStyleRanges.push({
                                offset: styleRange.offset,
                                length: styleRange.length,
                                style: className
                            }) // Push Inline Range
                            if (!Object.keys(baseStyleMap).includes(className)) {
                                baseStyleMap[className] = {}
                                baseStyleMap[className][styleName] = styleProperty
                            }
                        }
                    }
                }
            }
        }) // End of Compound Style Ranges

        block.inlineStyleRanges = singleStyleRanges // replace ranges with new single style ranges

    }) // End of Block Map

    //Remove Compound Class Names from baseStyleMap
    deleteStyles.forEach(style => {
        delete baseStyleMap[style]
    })

    // console.log(baseStyleMap)

    //Return new Content State
    newContentState.blocks = blocks
    return convertFromRaw(newContentState)
}

// State from Element plugin configuration options
const stateFromElementConfig = {
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

        // Build Compound Style Class
        let prefix = 'CUSTOM'
        let styleName = ''
        let styleData = {}
        elementStyles.forEach(style => {
            if (style) {
                styleName += `_${style.name.toUpperCase()}[${style.data.toUpperCase()}]`
                styleData[style.name] = style.data
            }
        })

        // Final Inline Style
        styleName = prefix + styleName
        baseStyleMap[styleName] = styleData
        return Style(styleName);

    },

    // Should return null/undefined or an object with optional: type (string); data (plain object)
    customBlockFn: (element) => {

        if (element.tagName === 'P' && !element.className) {
            return {
                type: 'paragraph',
                data: {
                    props: {
                        src: "www.thepathoftruth.com" // OK, yes we can pass props data to a custom react component for DraftJS to render.
                    },
                    id: "TEST",
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
        if (!element.parentElement.parentElement) { // Check for sub block alignment under parent div
            let blocks = element.children
            for (let index = 0; index < blocks.length; index++) {
                const alignType = blocks[index].style.textAlign
                if (alignType) {
                    // console.log(alignType)
                    return {
                        data: {
                            textAlignment: `${alignType}`
                        }
                    }
                }
            }
        }
    }
}

//  end of IMPORT FUNCTION

// IMPORT FUNCTION
// make ContentState from HTML String
const draftContentToHtml = (contentState) => {
    let html = stateToHTML(contentState, stateToHTMLConfig)
    // console.log(stateToHTMLConfig)
    return html
}

const stateToHTMLConfig = {
    inlineStyles: {
        // Override default element (`strong`).
        BOLD: {
            element: 'b'
        },
        ITALIC: {
            // Add custom attributes. You can also use React-style `className`.
            attributes: {
                class: 'foo'
            },
            // Use camel-case. Units (`px`) will be added where necessary.
            style: {
                fontSize: 40
            }
        },
        // Use a custom inline style. Default element is `span`.
        RED: {
            style: {
                color: '#900'
            }
        },
    },
}

//  end of EXPORT FUNCTION

export {
    styles,
    exporter,
    customStyleFn,
    baseStyleMap,
    baseBlockStyleFn,
    blockRenderMap,
    stateFromElementConfig,
    draftContentFromHtml,
    draftContentToHtml,
    flattenInlineStyleRanges,
}