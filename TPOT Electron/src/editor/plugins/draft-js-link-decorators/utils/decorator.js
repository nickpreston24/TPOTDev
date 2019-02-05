import { action, computed, decorate, observable, toJS } from 'mobx';

class DecoratorStore {

    state = {}
    listeners = {}

    subscribeToItem = (key, callback) => {
        this.listeners[key] = this.listeners[key] || [];
        this.listeners[key].push(callback);
    };

    unsubscribeFromItem = (key, callback) => {
        this.listeners[key] = this.listeners[key].filter((listener) => listener !== callback);
    };

    updateItem = (key, item) => {
        this.state = {
            ...this.state,
            [key]: item,
        };
        if (this.listeners[key]) {
            this.listeners[key].forEach((listener) => listener(this.state[key]));
        }
    };

    getItem = (key) => {
        return this.state[key];
    }

    currentEntityKey = 0
    currentEditorState = null

    setItem = (key, value) => {
        this[key] = value
        console.log('SET ITEM', key, value)
    }

    get getCurrentEditorState () {
        return this.currentEditorState
    }

}

export default decorate(
    DecoratorStore, {

        state: observable,
        listeners: observable,

        subscribeToItem: action,
        unsubscribeFromItem: action,
        updateItem: action,
        getItem: observable,

        currentEntityKey: observable,
        currentEditorState: observable,
        setItem: action,
        getCurrentEditorState: computed,

    })