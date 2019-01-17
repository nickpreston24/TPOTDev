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

}

export default decorate(
    ToolbarStore, {
        state: observable,
        listeners: observable,
        subscribeToItem: action,
        unsubscribeFromItem: action,
        updateItem: action,
        getItem: observable,
    })