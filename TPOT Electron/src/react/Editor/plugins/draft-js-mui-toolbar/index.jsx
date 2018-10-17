
import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import MuiToolbar from './components/MuiToolbar'

const createMuiToolbarPlugin = (config) => {

    const store = createStore();

    return {
        initialize: ({ getEditorState, setEditorState, getEditorRef }) => {
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
            store.updateItem('getEditorRef', getEditorRef);
        },
        onChange: (editorState) => {
            store.updateItem('selection', editorState.getSelection());
            return editorState;
        },
        MuiToolbar: decorateComponentWithProps(MuiToolbar, {store})
    };
};

export default createMuiToolbarPlugin