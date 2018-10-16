
import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import MuiToolbar from './components/MuiToolbar'

const createMuiToolbarPlugin = (config) => {

    const store = createStore({
        isVisible: false,
        getItem: ()=>{}
    });

    return {
        initialize: ({ getEditorState, setEditorState, getEditorRef }) => {
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
            store.updateItem('getEditorRef', getEditorRef);
            store.getEditorState = getEditorState
            store.setEditorState = setEditorState
            store.getEditorRef = getEditorRef
        },
        onChange: (editorState) => {
            store.updateItem('selection', editorState.getSelection());
            return editorState;
        },
        blockStyleFn: (contentBlock) => {
            if (contentBlock.getType() === 'blockquote') {
                return 'superFancyBlockquote';
            }
        },
        customStyleMap: {
            'UNDERLINE': {
                textDecoration: 'line-through',
            },
        },
        MuiToolbar: decorateComponentWithProps(MuiToolbar, {store})
    };
};

export default createMuiToolbarPlugin