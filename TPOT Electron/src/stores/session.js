import { observable, action, decorate, runInAction } from 'mobx'
import { db, auth, firebase } from '../firebase'

/* Electron */
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const dialog = remote.dialog

/* Node */
const fs = remote.require('fs')
const path = remote.require('path')

class SessionStore {

    authUser = null
    sessionName = "Mobx is Awesome"

    constructor(rootStore) {
        this.rootStore = rootStore

        // : Set Listeners
        firebase.auth.onAuthStateChanged((authUser) => {
            console.log('authStateChanged', authUser)
        })

        // : Load Initial Configuration from File
        fs.readFile(path.join(app.getPath('userData'), 'Local Storage', 'auth.json') , 'utf-8', (error, data) => {
            if (!!data) {
                this.setAuthUser(JSON.parse(data).authUser)
                console.log(JSON.parse(data))
            }
        });
        
    }

    async signIn(email, password, notify) {
        try {
            const authUser = await auth.signIn(email, password)
            runInAction(() => {
                this.authUser = authUser
            })
        } catch (error) {
            notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    setAuthUser = authUser => {
        this.authUser = authUser
    }

    setSessionName = () => {
        this.sessionName = Math.round(Math.random().toFixed(4) * 10000)
    }

}

export default decorate(
    SessionStore, {
        authUser: observable,
        sessionName: observable,
        setAuthUser: action,
        setSessionName: action,
        signIn: action.bound,
})