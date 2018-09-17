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

export default class DiskFileLoader {

    async load() {
        await this.getFilePath()
            .then(filePath => {
                // this.streamFile(filePath)
                this.readFile(filePath)
                this.path = filePath
                // .then(data => {
                //     console.log('data', data)
                // })
            }).catch((err) => {
                console.log('error: ', err);
            })
    }

    getFilePath() {
        return new Promise((result, reject) => {
            dialog.showOpenDialog(options, (fileNames) => {
                if (!fileNames)
                    alert('Filename cannot be empty!')
                const filePath = fileNames[0];
                result(filePath);
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
            // console.log("The file content is : \n" + data);
            console.log('read successful!');
            this.readData = data;
        });
    };

    // streamFile(filePath) {
    //     console.log('in streamfile()');
    //     // return new Promise((result, reject) => {
    //     var readStream = fs.createReadStream(filePath, 'utf8');
    //     readStream.on('data', (chunk) => {
    //         streamData += chunk;
    //     }).on('end', () => {
    //         console.log(streamData);
    //     });
    //     // });
    // }

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