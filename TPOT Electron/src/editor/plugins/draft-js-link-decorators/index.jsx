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

    const pluginProps = {
        callbacks,
        // store: store2,
    };

    const store = new DecoratorStore()

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
            },
        ],

        initialize: ({ getEditorState, setEditorState }) => {
            store.setItem('currentEditorState', getEditorState())
        },
        onChange: (editorState) => {
            let newEditorState = callbacks.onChange ? callbacks.onChange(editorState) : editorState
            store.setItem('currentEditorState', newEditorState)
            return newEditorState;
        },
        handleBeforeInput: (chars, editorState) => {
            // console.log(chars, editorState)
        },
    };
};