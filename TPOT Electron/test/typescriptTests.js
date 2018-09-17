var expect = require('chai').expect;

// import DiskFileLoader from '../src/modules/docxLoaders/DiskFileLoader.ts'
// var DiskFileLoader = require('../src/modules/docxLoaders/DiskFileLoader.ts')
// const Clipboard = require("../modules/docxLoaders_ts/Clipboard.ts").ClipBoard;

describe.skip('js-calls-typescript test', () => {
    // const Clipboard = require('../src/modules/docxLoaders_ts/Clipboard.ts').Clipboard;
    it('should let us call defined TS classes from vanilla JS', () => {
        // let loader = new DiskFileLoader();
        // if (!loader) console.log('could not create instance');
        // else console.log('success!');
        // let loader = new Clipboard();
        expect(loader).to.be.not.null();
    });
});