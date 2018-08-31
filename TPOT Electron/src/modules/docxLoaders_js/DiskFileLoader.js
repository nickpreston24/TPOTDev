import {
    resolve
} from "url";

//Electron
const electron = window.require('electron')
const remote = electron.remote
const dialog = remote.dialog

// Node built-in
const fs = remote.require('fs')
const path = remote.require('path')

let options = {
    properties: ['openFile'],
    filters: [{
        name: 'Word Docs',
        extensions: ['docx', 'rtf']
    }]
}

var readData = ''
var streamData = ''

export default class DiskFileLoader {

    async load() {
        await this.getFilePath()
            .then(filePath => {
                this.streamFile(filePath)
                // .then(data => {
                //     console.log('data', data)
                // })
            })
    }

    getFilePath() {
        return new Promise((result, reject) => {
            dialog.showOpenDialog(options, (fileNames) => {
                result(fileNames[0]);
            });
        });
    }




    readFile(filePath) {
        console.log('filepath: ', filePath);
        fs.readFile(filePath, 'utf-8', (error, data) => {
            console.log("attempting read - inner");
            if (error) {
                throw new Error(`An error ocurred reading the file : ${error.message}`);
            }
            console.log("The file content is : \n" + data);
            readData = data;
        });
    };

    streamFile(filePath) {
        console.log('in streamfile()');
        // return new Promise((result, reject) => {
        var readStream = fs.createReadStream(filePath, 'utf8');
        readStream.on('data', (chunk) => {
            streamData += chunk;
        }).on('end', () => {
            console.log(streamData);
            // result(streamData);
        });
        // });
    }

    deleteFile(filePath) {

        if (!fs.existsSync(filePath)) {
            throw new Error(`The file ${filePath} doesn't exist, cannot delete it!`);
        }

        fs.unlink(filePath, (error) => {
            if (error) {
                throw new Error(`An error ocurred updating the file: ${error.message}`);
            }
            console.log("File succesfully deleted");
        });
    }

}