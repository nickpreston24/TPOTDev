import React from 'react'
import * as strategies from './utils/strategies';
import decorateComponentWithProps from 'decorate-component-with-props';
import DecoratorStore from './utils/decorator'
import { configure } from 'mobx'
import { Provider } from 'mobx-react';
import { RichUtils, EditorState, SelectionState, Entity, Modifier, convertToRaw } from 'draft-js';
import LinkSpan from './components/LinkSpan';

export default (config = {}) => {
    const callbacks = {
        // keyBindingFn: undefined,
        // handleKeyCommand: undefined,
        // onDownArrow: undefined,
        // onUpArrow: undefined,
        // onTab: undefined,
        // onEscape: undefined,
        // handleReturn: undefined,
        onChange: undefined,
    };

    let searches = new Map();
    let escapedSearch;
    let clientRectFunctions = new Map();
    let isOpened;

    const store2 = {
        getEditorState: undefined,
        setEditorState: undefined,
        getPortalClientRect: (offsetKey) => clientRectFunctions.get(offsetKey)(),
        getAllSearches: () => searches,
        isEscaped: (offsetKey) => escapedSearch === offsetKey,
        escapeSearch: (offsetKey) => {
            escapedSearch = offsetKey;
        },

        resetEscapedSearch: () => {
            escapedSearch = undefined;
        },

        register: (offsetKey) => {
            searches = searches.set(offsetKey, offsetKey);
        },

        updatePortalClientRect: (offsetKey, func) => {
            clientRectFunctions = clientRectFunctions.set(offsetKey, func);
        },

        unregister: (offsetKey) => {
            searches = searches.delete(offsetKey);
            clientRectFunctions = clientRectFunctions.delete(offsetKey);
        },

        getIsOpened: () => isOpened,
        setIsOpened: (nextIsOpened) => { isOpened = nextIsOpened; },
    };

    // Styles are overwritten instead of merged as merging causes a lot of confusion.
    //
    // Why? Because when merging a developer needs to know all of the underlying
    // styles which needs a deep dive into the code. Merging also makes it prone to
    // errors when upgrading as basically every styling change would become a major
    // breaking change. 1px of an increased padding can break a whole layout.

    const pluginProps = {
        callbacks,
        store: store2,
    };

    const store = new DecoratorStore()
    const GenericLinkSpan = decorateComponentWithProps(LinkSpan, { regex: strategies.URL_REGEX, strategy: 'Generic', pluginProps })
    const EntityLinkSpan = decorateComponentWithProps(LinkSpan, { regex: 'entity', strategy: 'Entity', pluginProps })

    return {
        decorators: [
            {
                strategy: strategies.generic,
                component: (props) => {
                    return (
                        <Provider store={store} >
                            <LinkSpan
                                children={props.children}
                                decoratedtext={props.decoratedText}
                                entitykey={props.entityKey}
                                offsetkey={props.offsetKey}
                                geteditorstate={props.getEditorState}
                                seteditorstate={props.setEditorState}
                                pluginprops={pluginProps}
                                strategy='Generic'
                                regex={strategies.URL_REGEX}
                            />
                        </Provider>
                    )
                }
                // component: decorateComponentWithProps(LinkSpan, { regex: strategies.URL_REGEX, strategy: 'Decorator', pluginProps }),
            },
            {
                strategy: strategies.entity,
                component: (props) => {
                    return (
                        <Provider store={store} >
                            <LinkSpan
                                children={props.children}
                                decoratedtext={props.decoratedText}
                                entitykey={props.entityKey}
                                offsetkey={props.offsetKey}
                                geteditorstate={props.getEditorState}
                                seteditorstate={props.setEditorState}
                                pluginprops={pluginProps}
                                strategy='Entity'
                                regex={null}
                            />
                        </Provider>
                    )
                }
                // component: (props) => <Provider store={store}><LinkSpan {...props} /></Provider>,
                // component: () => <Provider store={store}><LinkSpan /></Provider>,
                // component: decorateComponentWithProps(LinkSpan, { regex: strategies.URL_REGEX, strategy: 'Decorator', pluginProps }),
            },
        ],

        initialize: ({ getEditorState, setEditorState }) => {
            store.setItem('currentEditorState', getEditorState())
        },
        handleBeforeInput: (chars, editorState) => {
            // console.log(chars, editorState)
        },
        onChange: (editorState) => {
            let newEditorState = callbacks.onChange ? callbacks.onChange(editorState) : editorState
            store.setItem('currentEditorState', newEditorState)
            return newEditorState;
            // if (callbacks.onChange) {
            //     newEditorState = callbacks.onChange(editorState)
            // } else {
            //     newEditorState = editorState
            // }
            // console.time('onChange')

            // ! OLD
            // if (callbacks.onChange) {
            //     let newEditorState = callbacks.onChange(editorState)
            //     // const old = convertToRaw(editorState.getCurrentContent())
            //     // const newy = convertToRaw(newEditorState.getCurrentContent())
            //     // console.log('OLD', old.entityMap, old.blocks)
            //     // console.log('NEW', newy.entityMap, newy.blocks)
            //     // console.log('NULL?', newEditorState)
            //     // console.log('EQUAL?', (old === newy))
            //     // console.timeEnd('onChange')
            //     return newEditorState
            // } else {
            //     // console.timeEnd('onChange')
            //     return editorState
            // }


            // if (callbacks.onChange) {
            //     const newContent = callbacks.onChange(editorState)
            //     const newEditorState = newContent
            //     // const newEditorState = EditorState.push(
            //     //     editorState,
            //     //     newContent,
            //     //     'change-block-data'
            //     // )
            //     // console.log(newEditorState)
            //     return newEditorState
            // } else {
            //     return editorState
            // };

            // if (callbacks.onChange) {
            //     const newEditorState = callbacks.onChange(editorState)
            //     if (editorState !== newEditorState) {
            //         return newEditorState
            //     } else {
            //         return editorState
            //     }
            // }
            //  else {
            //     callbacks.onChange(editorState)
            // }

        },
    };
};

// import LinkSpan from './components/LinkSpan';
// import * as strategies from './utils/strategies';
// import decorateComponentWithProps from 'decorate-component-with-props';

// import { RichUtils, EditorState, SelectionState, Entity, Modifier, convertToRaw } from 'draft-js';

// const callbacks = {
//     keyBindingFn: undefined,
//     handleKeyCommand: undefined,
//     onDownArrow: undefined,
//     onUpArrow: undefined,
//     onTab: undefined,
//     onEscape: undefined,
//     handleReturn: undefined,
//     onChange: undefined,
// };

// const createLinkDecoratorsPlugin = () => {

//     return {
//         onChange: (editorState) => {
//             console.log(callbacks)
//             // if (callbacks.onChange) return callbacks.onChange(editorState);
//             return editorState;
//         },
//         // initialize: ({ getEditorState, setEditorState, getEditorRef, getProps }) => {
//         //     const PREFIX = 'CUSTOM_'
//         //     const { styles } = createStyles(['font-size', 'color', 'background'], PREFIX);
//         //     store.updateItem('getEditorState', getEditorState);
//         //     store.updateItem('setEditorState', setEditorState);
//         //     store.updateItem('getEditorRef', getEditorRef);
//         //     store.updateItem('getEditorProps', getProps);
//         //     store.updateItem('customStyleFunctions', styles)
//         //     store.updateItem('customStylePrefix', PREFIX)
//         // },
//         decorators: [
//             {
//                 strategy: strategies.generic,
//                 component: decorateComponentWithProps(LinkSpan, { regex: strategies.URL_REGEX, strategy: 'generic', callbacks }),
//             },
//             {
//                 strategy: strategies.entity,
//                 component: LinkSpan,
//             },
//         ],
//     };
// };

// export default createLinkDecoratorsPlugin