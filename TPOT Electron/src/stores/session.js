import { observable, action, decorate, runInAction } from 'mobx'
import { db, auth, firebase } from '../firebase'

const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const fs = remote.require('fs')
const path = remote.require('path')

class SessionStore {

    constructor(rootStore) {
        this.rootStore = rootStore

        // : Set Listeners
        firebase.auth.onAuthStateChanged((authUser) => {
            // console.log('authStateChanged', authUser)
        })

        // : Load Initial Configuration from File
        fs.readFile(path.join(app.getPath('userData'), 'Local Storage', 'auth.json') , 'utf-8', (error, data) => {
            if (!!data) {
                this.setAuthUser(JSON.parse(data).authUser)
                console.log(JSON.parse(data))
            }
        });
        
    }

    authUser = null
    sessionName = "Mobx is Awesome"
    loginData = {
        email: null,
        password: null,
    }

    async signIn(notify, setCurrentModal) {
        try {
            const {email, password} = this.loginData
            const authUser = await auth.signIn(email, password)
            runInAction(() => {
                this.authUser = authUser
                setCurrentModal(null)
            })
        } catch (error) {
            notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    signOut = (setCurrentModal) => {
        auth.signOut()
        this.authUser = null
        setCurrentModal(null)
    }

    setAuthUser = authUser => {
        this.authUser = authUser
    }

    setLoginData = (key, value) => 
        this.loginData[key] = value
}

export default decorate(
    SessionStore, {
        loginData: observable,
        authUser: observable,
        sessionName: observable,
        setAuthUser: action,
        signIn: action.bound,
        signOut: action,
        setLoginData: action,
})