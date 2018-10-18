
import decorateComponentWithProps from 'decorate-component-with-props';
import createStyles from 'draft-js-custom-styles';
import createStore from './utils/createStore';
import MuiToolbar from './components/MuiToolbar'

const createMuiToolbarPlugin = (config) => {

    const store = createStore();

    return {
        initialize: ({ getEditorState, setEditorState, getEditorRef, getProps }) => {
            const PREFIX = 'CUSTOM_'
            const { styles } = createStyles(['font-size', 'color', 'background'], PREFIX);
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
            store.updateItem('getEditorRef', getEditorRef);
            store.updateItem('getEditorProps', getProps);
            store.updateItem('customStyleFunctions', styles)
            store.updateItem('customStylePrefix', PREFIX)
        },
        onChange: (editorState) => {
            store.updateItem('selection', editorState.getSelection());
            return editorState;
        },
        MuiToolbar: decorateComponentWithProps(MuiToolbar, {store})
    };
};

export default createMuiToolbarPlugin