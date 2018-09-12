//  TESTING RESULTS

// Master Sample - 220 ms avg - 0.22 SECONDS (Yay!)
// Brochure Sample - 140 ms avg- 0.14 SECONDS (Yay!)

// Stress test results
// Master Sample (51 Pages images and text) - 17.7 SECONDS / 17745 ms (100% successful)
// Master Sample (51 Pages with duplicates of text) - 3.47 MINUTES / 208601 ms (100% successful)

// Observations
//  1) It seems the conversion goes faster when there are fewer styled elements and more plaintext
//  2) The Converter goes slower when the same text element (styled or not) exists more than once
//  3) Document length does not appear to exponentially add to conversion time, but just a small degree (probably because of images' encoding)
//  4) Document repetition is lethal. This is because we are trying to find verbatim text matches. If the text is repetative,
//    it thinks it has many matches, and applies styles to every single one of them. There isnt a way to fix this because there
//    is not even a human way to distinquish which text is different. Maybe its relative location in the tag array? There isn't
//    a case in which this is going, to happen though. If it did, it still converts 100% successfully without error.

// I believe a loading screen is totally necessary incase users' conversion time varies and/or they are working with 10+ page documents.
// A loading screen will provide them necessary feedback to let them know that nothing is frozen and all they need to do is be patient.


// Electron
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app
const ipc = electron.ipcRenderer;

// Node built-in
// const fs = remote.require( 'fs' )
const path = remote.require('path')
const fs = remote.require('promise-fs')

// Custom/Community
const _ = require('underscore')
const createNode = require('create-node')
const walk = require('domwalk')

// File2Html
const file2html = require('file2html')
const TextReader = require('file2html-text').default
const OOXMLReader = require('file2html-ooxml').default
const ImageReader = require('file2html-image').default

// Mammoth
const mammoth = require('mammoth-colors')


/////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                 //
//                                                            MAIN FUNCTION                                                                  //
//                                                                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

export async function convertFile(path) {
        // Convert Data
        let dataFile2Html = await convertFile2Html(path)
        let dataMammoth = await convertMammoth(path)

        // Bake Down CSS to File2Html Tag Data
        dataFile2Html = await bakeCssToInlineStyles(dataFile2Html.css, dataFile2Html.html)

        // Flatten Data
        let conversionString = await flattenStylesFromTwoDoms(dataMammoth, dataFile2Html)

        // Send Data
        let message = {
                event: "draftjs-editor-reload",
                html: conversionString
        }
        // window.postMessage(message, "*") // sends to DraftJS WYSIWYG Editor
        document.getElementById("WYSIWYG").innerHTML = conversionString // temporary
}

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                 //
//                                                    FILE 2 HMTL CONVERSION                                                      //
//                                                                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

const convertFile2Html = async (path) => {
        // Get Buffer
        const buffer = await fs.readFile(path)
        // Get HTML String
        file2html.config({
                readers: [TextReader, OOXMLReader, ImageReader]
        });
        const fileBuffer = new Buffer(buffer)
        const data = await file2html.read({
                fileBuffer,
                meta: {
                        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
        })
        // Return Promise Results
        return {
                css: data.data.styles,
                html: data.data.content
        }
}

function lookupMimeType(filename) {
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

        if (filename) {
                console.log('input - fileName: ', filename)
                let fileNameSimple = filename.toLowerCase()
                for (var extension in mimeTypes) {
                        if (mimeTypes.hasOwnProperty(extension)) {
                                let extensionSlice = fileNameSimple.slice(fileNameSimple.length - extension.length, fileNameSimple.length)
                                // console.log('Extension: ', extensionSlice);
                                // console.log('File Name: ', fileNameSimple);
                                if (extensionSlice == extension) {
                                        return mimeTypes[extension]
                                }
                        }
                }
        }
}

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                 //
//                                                     MAMMOTH CONVERSION                                                        //
//                                                                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

const convertMammoth = async (path) => {
        // Get Buffer
        const buffer = await fs.readFile(path)
        // Get HTML String
        const data = await mammoth.convertToHtml({
                arrayBuffer: buffer
        }, mammothOptions)
        // Return Promise Results
        return data.value
}

const mammothOptions = {
        styleMap: [
                "p[style-name='Title'] => h1.title",
                "p[style-name='Subtitle'] => h4.subtitle",
                "p[style-name='heading 5'] => h5",
                "p[style-name='Heading 5'] => h5",
                "p[style-name='heading 6'] => h6",
                "p[style-name='Heading 6'] => h6",
                "p[style-name='Quote'] => blockquote.quote",
                "p[style-name='Intense Quote'] => blockquote.intense-quote > strong",
                "i => em",
                "u => ins",
                "strike => del",
        ],
        convertImage: mammoth.images.imgElement(function (image) {
                return image.read("base64").then(function (imageBuffer) {
                        return {
                                src: "data:" + image.contentType + ";base64," + imageBuffer,
                                class: "image",
                                style: "max-width: 600px; max-height: 350px; position: relative; left: 50%; transform: translateX(-50%);"
                        };
                });
        })
};

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                 //
//                                           BAKE INLINE STYLES TO FILE2HTML                                            //
//                                                                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

const bakeCssToInlineStyles = async (css, html) => {
        // Make CSS Classes Object with Inline Styles
        const cssClasses = await mapCssStylesheetToObject(css)
        // Virtualize Html into Traversable DOM
        const dom = createNode(html)
        // Traverse DOM and Paste Styles to Class Elements
        const domInline = await mapCssClassesToInlineStyles(dom, cssClasses)
        // return css + html
        return domInline.innerHTML
}

const mapCssStylesheetToObject = async (css) => {
        let stylesheet = createNode(css)
        stylesheet = stylesheet.innerHTML
        let blocks = stylesheet.match(/[^{]*\{([^}]*)*}/g)
        let cssClasses = {}
        blocks.forEach(block => {
                let regex = /\.([a-zA-Z-\d+]*)\s*\.?([a-zA-Z-\d+]*)?\{(.*)\}/g
                let groups = regex.exec(block)
                let classNamePrimary = groups[1]
                let classNameSecondary = groups[2]
                let attributes = groups[3]
                let classNameFull = classNamePrimary + " " + classNameSecondary
                if (groups) {
                        // // does css class already exist from previous loop?
                        if (!cssClasses[classNamePrimary]) {
                                if (!classNameSecondary) {
                                        // parent doesn't exist, create a parent class.
                                        cssClasses[classNamePrimary] = {
                                                styles: attributes
                                        }
                                } else {
                                        // parent doesn't exist but this is a subchild class. Create the would-be parent and add a child subclass.
                                        cssClasses[classNamePrimary] = {}
                                        cssClasses[classNamePrimary][classNameFull] = {
                                                styles: attributes
                                        }
                                }
                        } else {
                                // parent already exists. Get the classname and add two sub classes.
                                let previousStyles = cssClasses[classNamePrimary].styles
                                cssClasses[classNamePrimary] = {}
                                cssClasses[classNamePrimary][classNamePrimary] = {
                                        styles: previousStyles
                                }
                                cssClasses[classNamePrimary][classNameFull] = {
                                        styles: attributes
                                }
                        }
                }
        })
        return cssClasses
}

const mapCssClassesToInlineStyles = async (dom, cssClasses) => {
        walk(dom, function (node) {
                if (node.className) {
                        let nodeClasses = node.classList
                        nodeClasses.forEach(nodeClass => {
                                if (cssClasses[nodeClass]) { // If there is a matching classname entry
                                        if (cssClasses[nodeClass].styles) { // If there is no substyles
                                                node.style.cssText += cssClasses[nodeClass].styles
                                        } else {
                                                if (cssClasses[nodeClass][nodeClass]) {
                                                        node.style.cssText += cssClasses[nodeClass][nodeClass].styles
                                                } else if (cssClasses[nodeClass][nodeClass + " r"]) {
                                                        node.style.cssText += cssClasses[nodeClass][nodeClass + " r"].styles
                                                } else if (cssClasses[nodeClass][nodeClass] && cssClasses[nodeClass][nodeClass + " r"]) {
                                                } else {}
                                        }
                                }
                        })
                }
        });
        return dom
}

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                 //
//                           MERGE FILE2HTML STYLES ONTO MAMMOTH DOM                                //
//                                                                                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////

// Lets Decorate the Cake!
const flattenStylesFromTwoDoms = async (baseDom, augDom) => {

        // Gather Ingredients for Cake
        const cake = createNode(wrapInDiv(baseDom))
        let cakeArray = []
        walk(cake, function (cakeNode) {
                if (!cakeNode.tagName) {
                        let span = document.createElement("span")
                        span.textContent = cakeNode.textContent
                        cakeNode.replaceWith(span) // Replace floating text with wrapped Span tag
                        cakeArray.push(span) // Push cake reference
                } else {
                        cakeArray.push(cakeNode)
                }
        });

        // Gather Ingredients for Icing
        const icing = createNode(wrapInDiv(augDom))
        let icingArray = []
        walk(icing, function (icingNode) {
                if (icingNode.tagName) {
                        icingArray.push(icingNode) // Push icing reference
                }
        });

        // Print Trees and Arrays
        // console.log("Cake Tree", cake)
        // console.log("Cake Array", cakeArray)
        // console.log("Icing Tree", icing)
        // console.log("Icing Array", icingArray)

        // Ignore Parent Divs for cake and icing
        cakeArray = cakeArray.slice(1)
        icingArray = icingArray.slice(1)

        // Filter out good Icing Nodes
        icingArray = icingArray.filter(icingNode => {
                return icingNode.style && icingNode.textContent
        })

        // Map Icing to Valid Cakes
        let highlights = []
        icingArray.forEach(icingNode => {

                // Get Good Icling Flavors
                let flavors = getGoodFlavors(icingNode, highlights) // pushes highlights as well

                // Locate Good / Bad Cakes and Store References
                let goodCakes = getGoodCakes(cakeArray, icingNode)

                // Decorate Good Cakes
                if (goodCakes.length) {
                        goodCakes.forEach(cakeNode => {
                                decorateCake(cakeNode, icingNode, flavors)
                        })
                }

        })

        // Create Highlights
        createHighlights(highlights)

        // Serve Cake, Yum!
        return cake.innerHTML

        /////////////////////////////////////////////////////////////
        //            Sub Functions for  flattenStylesFromTwoDoms             //
        /////////////////////////////////////////////////////////////

        function wrapInDiv(string) {
                return "<div>" + string + "</div>"
        }

        function getGoodFlavors(icingNode, highlights) {
                // Get Icling Flavors
                let flavors = []
                for (let index = 0; index < icingNode.style.length; index++) {
                        flavors.push(icingNode.style[index])
                }
                // Eliminate Bad Flavors
                let badFlavors = ["line-height", "font-family", "margin-top", "margin-bottom", "list-style-type", "margin-right"]
                flavors = flavors.filter(flavor => {
                        if (badFlavors.includes(flavor)) {
                                return false
                        } else {
                                if (flavor == "font-size") {
                                        if (icingNode.style[flavor] < "16px") {
                                                return false
                                        } else {
                                                return true // Only returns larger than normal font sizes
                                        }
                                } else if (icingNode.style["background-color"]) {
                                        highlights.push(icingNode)
                                        return true
                                } else {
                                        return true
                                }
                        }
                })
                return flavors
        }

        function getGoodCakes(cakeArray, icingNode) {
                let goodCakes = []
                cakeArray.forEach(cakeNode => {
                        if (icingNode.textContent === cakeNode.textContent && icingNode.parentElement.textContent === cakeNode.parentElement.textContent) {
                                // Found a perfect match
                                goodCakes.push(cakeNode)
                        }
                })
                return goodCakes
        }

        function decorateCake(cakeNode, icingNode, flavors) {
                flavors.forEach(name => {
                        cakeNode.style[name] = icingNode.style[name]
                })

                // Remove Font-Size from Headings
                let headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
                if (headings.includes(cakeNode.tagName)) {
                        cakeNode.style['font-size'] = undefined
                }

                // Made Blockquotes more readable
                if (cakeNode.tagName == "BLOCKQUOTE") {
                        cakeNode.style.fontStyle = "italic"
                        cakeNode.style.paddingTop = "15px"
                        cakeNode.style.paddingBottom = "15px"
                        cakeNode.style.color = cakeNode.style.borderTopColor
                }

                // Identify Indented Paragraphs
                if (cakeNode.tagName == "P") {
                        if (cakeNode.style.textIndent) {
                                cakeNode.className += "indent"
                        }
                        if (cakeNode.style.marginLeft) {
                                cakeNode.className += "block"
                        }
                }

                // Clean Up Table Results
                let tables = ['TABLE', 'TD']
                if (tables.includes(cakeNode.tagName)) {
                        if (cakeNode.tagName == 'TABLE') {
                                cakeNode.style = "width: 80%; max-width: 100%; position: relative; left: 50%; transform: translateX(-50%); border: 1px solid black; border-collapse: collapse;"
                        }
                        if (cakeNode.tagName == 'TD') {
                                cakeNode.style.border = "1px solid black"
                                cakeNode.style.paddingLeft = "12px"
                                cakeNode.style.paddingRight = "12px"
                        }
                }

        }

        function createHighlights(highlights) {
                highlights.forEach(icingNode => {
                        let blocks = []
                        for (let index = 0; index < cake.children.length; index++) {
                                blocks.push(cake.children[index])
                        }
                        blocks = blocks.filter(block => {
                                return block.textContent.includes(icingNode.textContent)
                        })
                        blocks.forEach(block => {
                                block.innerHTML = block.innerHTML.replace(icingNode.textContent, "<span class='highlight'  style='background-color: " + icingNode.style.backgroundColor + ";'>" + icingNode.textContent + "</span>")
                        })
                })
        }

        // End of flattenStylesFromTwoDoms
}

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                  //
//                                           EXTRA UTILITIES AND FUNCTIONS                                               //
//                                                                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

// function getConfigPath(file) {
//         const applicationPath = app.getAppPath();
//         const configDir = './src/config';

//         return file ?
//                 path.join(applicationPath, configDir, file) :
//                 path.join(applicationPath, configDir)

//         //Old, delete if above passes ^. :-)
//         // if (file) return path.join(app.getAppPath(), './src/config/', file)
//         // else return path.join(app.getAppPath(), './src/config/')
// }

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

// function printConfigDir() {
//         fs.readdir(getConfigPath(), (err, files) => {
//                 if (err) throw err;
//                 console.group("Directory [" + getConfigPath() + "]")
//                 files.forEach(file => console.log(file));
//                 console.groupEnd()
//         })
// }

export const test = () => {
        console.log("%c Document Converter Module Loaded!", "color: hsl(199, 76%, 59%);")
};

// module.exports = {
//         test
// }