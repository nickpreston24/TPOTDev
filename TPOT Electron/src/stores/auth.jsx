import { observable, computed, action, decorate, configure} from "mobx"
configure({enforceActions: true})

class AuthStore {
    authUser = null
    wordpressCredentials = {
        username: "braden",
        password: "password"
    }

    get fullCreds() {
        return `${this.wordpressCredentials.username}${this.wordpressCredentials.password}`
    }

    tick() {
        this.authUser = Date.now();
    }

}

let authStore = decorate(AuthStore, {
    authUser: observable,
    wordpressCredentials: observable,
    fullCreds: computed,
    tick: action,
})

export {
    authStore,
}