import { observable, action, computed, decorate, autorun } from 'mobx'
import { db } from '../firebase' 
import { wp } from '../wordpress'
import { draft } from '../draftjs'
import {
    convertToRaw,
    EditorState
} from "draft-js";

class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    originalState = 'origiinal'
    editedState = EditorState.createEmpty()
    codeState = ''
    wordpressCredentials = {}
    editorContent = '<p>Hey there!</p>'
    publishModal = false
    publishData = {
        slug: '*',
        title: '',
        excerpt: '',
    }
    setEditorContent = async(string) => {
        this.editorContent = string
    }
    setEditorState = (string, state) => {
        this[`${string}State`] = state
    }
    setPublishData = (key, value) => {
        this.publishData[key] = value 
    }
    saveSession = () => {
        draft.saveSession(this.originalState, this.editedState, this.codeState)
    }
    togglePublishModal = () => {
        this.publishModal = !this.publishModal
    }
    publishToWordpress = async () => {
        // wp.getCatg()
        const wpCreds = await db.wordpressCredentials
        this.wordpressCredentials = !!wpCreds
            ? wpCreds
            : null
        wp.createPage(this.wordpressCredentials, {
            content: this.editorContent,
            slug: this.publishData.slug,
            title: this.publishData.title,
            excerpt: this.publishData.excerpt,
        })
    }
    dispatch = autorun(() => {
        console.log("update")
    });

}

export default decorate(
    LettersStore, {
        publishModal: observable,
        publishData: observable,
        editedState: observable,
        setPublishData: action,
        togglePublishModal: action,
        saveEditorState: action,
        setEditorState: action,
        dispatch: action,
})
// Don't make store variables observable if you want to keep them private to this class