import { observable, action, decorate, computed, toJS } from 'mobx'

// Draft JS
import {
    baseBlockStyleFn,
    baseStyleMap,
    blockRenderer,
    blockRenderMap,
    draftContentFromHtml,
    draftContentToHtml,
    stateFromElementConfig
} from "../editor/utils/transforms";
import { convertToRaw, getDefaultKeyBinding, KeyBindingUtil, EditorState } from "draft-js";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";


class EditorStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    originalState = 'Original'
    editorState = createEditorStateWithText('Hello from MobX!')
    codeState = 'Code'
    baseStyleMap = baseStyleMap
    baseBlockStyleFn = baseBlockStyleFn
    blockRenderer = blockRenderer
    blockRenderMap = blockRenderMap
    editorNode = null

    onChange = editorState =>
        this.editorState = editorState

    setRef = node =>
        this.editorNode = node

    focus = () => {
        if (this.editor) { this.editorNode.focus(); }
    }

    loadEditorFromDocx = html => {
        let baseStyleMapClear = JSON.parse(JSON.stringify(Object.assign(toJS(baseStyleMap))))
        const { newContentState, newBaseStyleMap } = draftContentFromHtml( html, stateFromElementConfig, baseStyleMap);
        this.originalState = html
        this.baseStyleMap = newBaseStyleMap
        this.editorState = EditorState.createWithContent(newContentState);
        this.codeState = draftContentToHtml(this.editorState, newContentState);
    }

    get editorCode() {
        return draftContentToHtml(
			this.editorState,
			this.editorState.getCurrentContent()
        );
    }

    setStyleMap = customStyleMap =>{
        console.log('setstylemap', customStyleMap)
        this.baseStyleMap = customStyleMap
    }

    handleKeyCommand = (command, store) => {
		if (command === 'save') {
			store.saveSession()
			return 'handled';
		}
		if (command === 'open') {
			store.saveSession()
			console.log('load file')
			return 'handled';
		}
		if (command === 'publish') {
			store.togglePublishModal()
			return 'handled';
		}
		return 'not-handled';
    }
    
    myKeyBindingFn = (e) => {
		const { hasCommandModifier } = KeyBindingUtil;
		if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
			return 'save'
		}
		if (e.keyCode === 79 /* `O key */ && hasCommandModifier(e)) {
			return 'open'
		}
		if (e.keyCode === 80 /* `S` key */ && hasCommandModifier(e)) {
			return 'publish'
		}
		return getDefaultKeyBinding(e);
	}

}

export default decorate(
    EditorStore, {

        originalState: observable,
        codeState: observable,

        editorCode: computed,

        editorState: observable,
        editorNode: observable,

        baseStyleMap: observable,
        baseBlockStyleFn: observable,
        blockRenderer: observable,
        blockRenderMap: observable,   

        handleKeyCommand: action,
        setStyleMap: action,
        setRef: action,
        onChange: action,
        loadEditorFromDocx: action,
        setSessionName: action,

    })