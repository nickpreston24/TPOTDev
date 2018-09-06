var myGoogleDrivePath = 'https://drive.google.com/drive/u/0/folders/1YBR_3lc0obMflmwWzIRxlEYdvnVBDrOk'

const fs = require('fs')
const readline = require('readline')
const {
    google
} = require('googleapis')


// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// const TOKEN_PATH = 'token.json';

describe('Connect to Google Drive', () => {
    it('should connect to google drive', () => {
        // Load client secrets from a local file.
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            if (content) console.log('content: ', content)
            // else console.log('no content');
            authorize(JSON.parse(content), listFiles);
        });

    })
})