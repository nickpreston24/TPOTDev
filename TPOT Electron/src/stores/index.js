import { configure } from 'mobx'

import SessionStore from './session'
import LettersStore from './letters'
import EditorStore from './editor'

configure({ enforceActions: "observed" })

class MobxStore {
    constructor() {
        this.sessionStore = new SessionStore()
        this.lettersStore = new LettersStore()
        this.editorStore = new EditorStore()
    }
}

// const mobxStore = new MobxStore()

export default MobxStore

export {
    SessionStore,
    LettersStore,
    EditorStore
}