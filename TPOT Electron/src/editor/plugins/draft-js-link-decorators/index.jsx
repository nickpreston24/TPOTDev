import React from 'react'
import { Provider } from 'mobx-react';
import DecoratorStore from './utils/decorator'
import LinkSpan from './components/LinkSpan';
import * as $ from './utils/strategies';

const createLinkDecoratorsPlugin = () => {

    const store = new DecoratorStore()

    const callbacks = {
        // : Keep commented Callbacks for now
        // keyBindingFn: undefined,
        // handleKeyCommand: undefined,
        // onDownArrow: undefined,
        // onUpArrow: undefined,
        // onTab: undefined,
        // onEscape: undefined,
        // handleReturn: undefined,
        onChange: undefined,
    };

    const createEntityComponent = (strategy, regex) => {
        return (props) => {
            return (
                <Provider store={store} >
                    <LinkSpan
                        children={props.children}
                        decoratedtext={props.decoratedText}
                        entitykey={props.entityKey}
                        offsetkey={props.offsetKey}
                        geteditorstate={props.getEditorState}
                        seteditorstate={props.setEditorState}
                        callbacks={callbacks}
                        strategy={strategy}
                        regex={$[regex]}
                    />
                </Provider>
            )
        }
    }

    return {
        decorators: [
            {
                strategy: $.markup,
                component: createEntityComponent('markup', 'MARKUP_REGEX')
            },
            {
                strategy: $.generic,
                component: createEntityComponent('generic', 'GENERIC_REGEX')
            },
            {
                strategy: $.entity,
                component: createEntityComponent('entity', null)
            }
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

export default createLinkDecoratorsPlugin