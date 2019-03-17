import { configure } from 'mobx'

import SessionStore from './session'
import SettingsStore from './settings'
import LettersStore from './letters'
import EditorStore from './editor'

configure({ enforceActions: "observed" })

class MobxStore {
    constructor() {
        // this.rootStore = this
        this.settingsStore = new SettingsStore(this)
        this.lettersStore = new LettersStore(this)
        this.editorStore = new EditorStore(this)
        this.sessionStore = new SessionStore(this)
    }
}

// const mobxStore = new MobxStore()

export default MobxStore