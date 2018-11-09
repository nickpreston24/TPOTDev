import { observable, action, decorate } from 'mobx'

class SessionStore {
    authUser = null
    sessionName = "Mobx is Awesome"

    constructor(rootStore) {
        this.rootStore = rootStore
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
})