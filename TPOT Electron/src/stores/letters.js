import { observable, action, computed, decorate } from 'mobx'
import { db } from '../firebase' 
import { wp } from '../wordpress'
import { draft } from '../draftjs'

class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    originalState = {}
    editorState = {}
    codeState = {}
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
    setPublishData = (key, value) => {
        this.publishData[key] = value 
    }
    saveEditorState = () => {
        draft.saveEditorState(this.editorState)
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

}

export default decorate(
    LettersStore, {
        publishModal: observable,
        publishData: observable,
        setPublishData: action,
        togglePublishModal: action,
        saveEditorState: action,
})
// Don't make store variables observable if you want to keep them private to this class