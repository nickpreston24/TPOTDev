
const {
    IFileLoader
} = require('./interfaces/IFileLoader.ts');

//Electron
const electron = window.require('electron')
const remote = electron.remote
const dialog = remote.dialog

// Node built-in
const fs = remote.require('fs')
const path = remote.require('path')

// const IFileLoader = require('IFileLoader.ts')

// class Package extends Box {}

class B {
    constructor() {
        this.isB = true;
    }
}

class A extends B {
    constructor() {
        super();
        this.isA = true;
    }
}

export class DiskFileLoader {
    //todo: fix issue where this dialog auto-downloads html links.
    openFileDialog() {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{
                name: 'Word Docs',
                extensions: ['docx', 'rtf']
            }]
        }, (fileNames) => {
            console.log(fileNames);
        });
    }
}