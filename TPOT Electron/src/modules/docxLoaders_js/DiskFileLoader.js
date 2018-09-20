/* Electron */
const electron = window.require('electron')
const remote = electron.remote
const dialog = remote.dialog

/* Node */
const fs = remote.require('fs')

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
                this.path = filePath
                this.readFile(filePath)
            }).catch(console.log);
    }

    getFilePath() {
        return new Promise((result, reject) => {
            dialog.showOpenDialog(options, (fileNames) => {
                if (!fileNames || fileNames.length == 0)
                    alert('Filename cannot be empty!')
                this.path = fileNames[0];
                result(this.path);
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
            console.log('read successful!');
            this.readData = data;
        });
    };


    deleteFile(filePath) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`The file ${filePath} doesn't exist, cannot delete it!`);
        }
        fs.unlink(filePath, (error) => {
            if (error) {
                throw new Error(`An error ocurred deleting the file: ${error.message}`);
            }
            console.log("File succesfully deleted");
        });
    }

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
}