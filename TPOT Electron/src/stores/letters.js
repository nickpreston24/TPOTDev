import { observable, action, decorate } from 'mobx'
import { db, auth } from '../firebase' 
import { wp } from '../wordpress'
import { draft } from '../editor'
import { EditorState } from "draft-js";

class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    authUser = null
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

    setKey = (key, value) => {
        this[key] = value
        console.log(`Set key [${key}] : ${value}`)
    }

    signIn = async (email, password) => {
        const getAuthUser = action(auth.signIn(email, password))
        const authUser = await getAuthUser()
        this.authUser = authUser
        // this.wordpressCredentials = !!wpCreds ?
        //     wpCreds :
        //     null
        console.log(this.authUser, authUser)
    }

    signOut = (email, password) => {
        // this.authUser = null
        auth.signOut(email, password)
    }

    setEditorContent = async(string) => {
        this.editorContent = string
    }

    clearEditor = () => {
        const editedState = EditorState.createEmpty()
        this.editedState = editedState
        this.notify('Cleared Editor')
    }

    setEditorState = (string, state) => {
        this[`${string}State`] = state
    }

    setPublishData = (key, value) => {
        this.publishData[key] = value 
    }

    saveSession = () => {
        draft.saveSession(this.originalState, this.editedState, this.codeState)
        this.notify('Document Saved to Disk Successfully', {
            variant: 'success',
        })
    }

    notify = (message, config) => {
        const data = JSON.stringify({message, config: {...config}})
        this.notification = { data }
        console.log(`%c${message}`, `color: dodgerblue; font-size: 14px; border: 1px solid dodgerblue; background: #092b4c;`)
    }

    togglePublishModal = () => {
        this.publishModal = !this.publishModal
    }

    publishToWordpress = async (html) => {
        console.log(html)
        console.log('published to wordpress')
        const wpCreds = await db.wordpressCredentials
        console.log(wpCreds)
        this.wordpressCredentials = !!wpCreds
            ? wpCreds
            : null
        wp.createPage(this.wordpressCredentials, {
            content: html,
            slug: this.publishData.slug,
            title: this.publishData.title,
            excerpt: this.publishData.excerpt,
        })
    }

}

export default decorate(
    LettersStore, {
        authUser: observable,
        notification: observable,
        publishModal: observable,
        publishData: observable,
        editedState: observable,
        setPublishData: action,
        togglePublishModal: action,
        saveEditorState: action,
        setEditorState: action,
        clearEditor: action,
        notify: action,
        setKey: action,
        signIn: action,
        signOut: action,
    })
// Don't make store variables observable if you want to keep them private to this class