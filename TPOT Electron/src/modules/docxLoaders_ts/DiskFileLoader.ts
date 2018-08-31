import { app, BrowserWindow, dialog, remote, OpenDialogOptions } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { IFileLoader } from './IFileLoader';

let options: OpenDialogOptions = {
    properties: ['openFile'],
    filters: [{
        name: 'Word Docs',
        extensions: ['docx', 'rtf']
    }]
}

var readData = ''
var streamData = ''

export class DiskFileLoader implements IFileLoader {

    constructor() { }

    public load() {
        var filePath = this.getFilePath();
        console.log(`file path: \t ${filePath}`)
        this.readFile(filePath);
    }

    private getFilePath(): string {
        return dialog.showOpenDialog(options, (fileNames: string[]) => {
            return fileNames[0];
        })[0];
    }

    private readFile(filePath: string) {
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

    private streamFile(filePath: string) {
        var readStream = fs.createReadStream(filePath, 'utf8');
        readStream.on('data', function (chunk) {
            streamData += chunk;
        }).on('end', function () {
            console.log(streamData);
        });
    }

    private deleteFile(filePath: string) {

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
