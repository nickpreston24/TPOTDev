// Electron
const electron = window.require( 'electron' )
const remote = electron.remote
const app = remote.app
const ipc = electron.ipcRenderer;

// Node built-in
// const fs = remote.require( 'fs' )
const path = remote.require( 'path' )
const fs = remote.require( 'promise-fs' )

// Custom/Community
// Code Here

// File2Html
const file2html = require( 'file2html' )
const TextReader = require( 'file2html-text' ).default
const OOXMLReader = require( 'file2html-ooxml' ).default
const ImageReader = require( 'file2html-image' ).default



// MAIN FUNCTIONS

export async function convertFile( path )
{
        // Convert Data
        let dataF = await convertFile2Html( path )
        let dataM = await convertMammoth( path )

        // Clean Data

        //Combine Data

        // Send Data
        console.log( "Data", dataF, dataM )
        let message = {
                event: "draftjs-editor-reload",
                css: dataF.data.styles,
                html: dataF.data.content
        }
        window.postMessage( message, "*" )
        document.getElementById( "WYSIWYG" ).innerHTML = message.css + message.html
}

// UTILITIES

const convertFile2Html = async ( path ) => {
        // Get Buffer
        const buffer = await fs.readFile( path )
        // Get HTML String
        file2html.config( {
                readers: [ TextReader, OOXMLReader, ImageReader ]
        } );
        const fileBuffer = new Buffer( buffer )
        const data = await file2html.read( {
                fileBuffer,
                meta: {
                        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
        } )
        // Return Promise Results
        return data
}

const convertMammoth = async ( path ) => {
        // Get Buffer
        const buffer = await fs.readFile( path )
        // Get HTML String
        const data = "empty"
        // Return Promise Results
        return data
}


function getConfigPath( file ) {
        const applicationPath = app.getAppPath();
        const configDir = './src/config';

        return file ?
                path.join( applicationPath, configDir, file ) :
                path.join( applicationPath, configDir )

        //Old, delete if above passes ^. :-)
        // if (file) return path.join(app.getAppPath(), './src/config/', file)
        // else return path.join(app.getAppPath(), './src/config/')
}

// function saveFile(json) {
//         let fileContents = JSON.stringify(json)
//         // console.log(json)
//         fs.writeFile(path.join(getConfigPath(), "post.json"), fileContents, (err) => {
//                 if (err) {
//                         throw err
//                 } else {
//                         // printConfigDir() // print index again to see newly created save file
//                         console.log("File Saved to Disk")
//                 }
//         })
// }

function printConfigDir() {
        fs.readdir( getConfigPath(), ( err, files ) => {
                if ( err ) throw err;
                console.group( "Directory [" + getConfigPath() + "]" )
                files.forEach( file => console.log( file ) );
                console.groupEnd()
        } )
}

function lookupMimeType( filename ) {
        const mimeTypes = {
                png: 'image/png',
                gif: 'image/gif',
                jpg: 'image/jpg',
                jpeg: 'image/jpeg',
                pjpeg: 'image/pjpeg',
                svg: 'image/svg+xml',
                ico: 'image/x-icon',
                txt: 'text/plain',
                doc: 'application/msword',
                docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                fb: 'application/x-fictionbook+xml',
                fb2: 'application/x-fictionbook+xml',
                'fb2.zip': 'application/x-zip-compressed-fb2',
                odt: 'application/vnd.oasis.opendocument.text',
                sxw: 'application/vnd.sun.xml.writer',
                epub: 'application/epub+zip',
                woff: 'application/font-woff',
                woff2: 'application/font-woff2',
                csv: 'text/csv',
                tsv: 'text/tab-separated-values',
                tab: 'text/tab-separated-values',
                djvu: 'image/vnd.djvu',
                djv: 'image/vnd.djvu',
                zip: 'application/zip',
                rtf: 'application/rtf'
        };

        if ( filename ) {
                console.log( 'input - fileName: ', filename )
                let fileNameSimple = filename.toLowerCase()
                for ( var extension in mimeTypes ) {
                        if ( mimeTypes.hasOwnProperty( extension ) ) {
                                let extensionSlice = fileNameSimple.slice( fileNameSimple.length - extension.length, fileNameSimple.length )
                                // console.log('Extension: ', extensionSlice);
                                // console.log('File Name: ', fileNameSimple);
                                if ( extensionSlice == extension ) {
                                        console.log( "GOOD!: ", extension, mimeTypes[ extension ] )
                                        return mimeTypes[ extension ]
                                }
                        }
                }
        }
}

export const test = () => {
        console.log( "%c Document Converter Module Loaded!", "color: hsl(199, 76%, 59%);" )
};


// module.exports = {
//         test
// }