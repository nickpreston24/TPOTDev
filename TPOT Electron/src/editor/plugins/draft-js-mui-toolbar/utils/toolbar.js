import { action, computed, decorate, observable } from 'mobx';

class ToolbarStore {

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

    inlineOrigin = {}
    inlineRef = null
    inlineSize = {}
    inlineOffset = {}
    inlineVisible = false
    blockOrigin = {}
    blockRef = null
    blockSize = {}
    blockOffset = {}
    blockVisible = false

    setStyleProp = (prop, style) => {
        // console.log(prop, style)
        this[prop] = style
    }

    get inlineStyle() {
        return {...this.inlineOrigin, ...this.inlineOffset}
    }

    get blockStyle() {
        return {...this.blockOrigin, ...this.blockOffset}
    }

}

export default decorate(
    ToolbarStore, {
        state: observable,
        listeners: observable,
        inlineOrigin: observable,
        inlineRef: observable,
        inlineSize: observable,
        inlineOffset: observable,
        inlineVisible: observable,
        blockOrigin: observable, 
        blockRef: observable,
        blockSize: observable,
        blockOffset: observable,
        blockVisible: observable,
        setStyleProp: action,
        inlineStyle: computed,
        blockStyle: computed,
        subscribeToItem: action,
        unsubscribeFromItem: action,
        updateItem: action,
        getItem: observable,
    })