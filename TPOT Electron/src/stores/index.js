import { configure } from 'mobx'

import SessionStore from './session'
import LettersStore from './letters'

configure({ enforceActions: "observed" })

class MobxStore {
    constructor() {
        this.sessionStore = new SessionStore()
        this.lettersStore = new LettersStore()
    }
}

// const mobxStore = new MobxStore()

export default MobxStore