import { observable, action, computed, decorate, autorun } from 'mobx'
import { db } from '../firebase' 
import { wp } from '../wordpress'
import { draft } from '../draftjs'
import { convertToRaw, EditorState } from "draft-js";

class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    originalState = ''
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
    notification = null

    setEditorContent = async(string) => {
        this.editorContent = string
    }

    clearEditor = async () => {
        this.notify('Cleared Editor')
        this.editedState = EditorState.createEmpty()
    }

    setEditorState = (string, state) => {
        this[`${string}State`] = state
    }

    setPublishData = (key, value) => {
        this.publishData[key] = value 
    }

    saveSession = () => {
        draft.saveSession(this.originalState, this.editedState, this.codeState)
        this.notify('Document Saved to Disk Successfully', { variant: 'success' })
    }

    notify = (message, config) => {
        const data = JSON.stringify({message, config})
        this.notification = { data }
        console.log(`%c${message}`, `color: dodgerblue; font-size: 14px; border: 1px solid dodgerblue; background: #092b4c;`)
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
        notification: observable,
        publishModal: observable,
        publishData: observable,
        editedState: observable,
        setPublishData: action,
        togglePublishModal: action,
        saveEditorState: action,
        setEditorState: action,
        clearEditor: action,
        dispatch: action,
        notify: action,
    })
// Don't make store variables observable if you want to keep them private to this class