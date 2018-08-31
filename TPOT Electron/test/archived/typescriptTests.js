var expect = require('chai').expect;

// import DiskFileLoader from '../src/modules/docxLoaders/DiskFileLoader.ts'
var DiskFileLoader = require('../src/modules/docxLoaders/DiskFileLoader.ts')

describe('js-calls-typescript test', () => {

    it('should let us call defined TS classes from vanilla JS', () => {
        let loader = new DiskFileLoader();
        // if (!loader) console.log('could not create instance');
        // else console.log('success!');

        expect(loader).to.be.not.null();
    });
});