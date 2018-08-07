# electron-react-combined

**An example of using create-react-app, electron, and file2html**.  
Original boilerplate made by [Kitze](https://twitter.com/thekitze) who works @ Medium. Read his ([article](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)). 

Adapted by Braden & Michael Preston to add more features like WordPress API, Google Drive API, converting `.docx` documents and automatic updates through the GitHub repository. 

## Current Features

Package Version: **0.0.01** (7/29/18)

#### Production

| Package  | Version  | What it Does  |
| ------------ | :------------: | ------------ |
| [`electron`]() | 2.0.2 |  Create desktop apps with node using HTML/CSS/JS |
| [`electron-builder`]() | 20.15.1 |  |
| [`electron-debug`]() | 0.3.0 | extra debug support for compiled js in window |
| [`electron-is-dev`]() | 0.3.0 |  |
| [`electron-log`]() | 2.2.6 |  |
| [`update-electron-app`]() | 1.2.0 |  |
| [`electron-react-devtools`]() | 0.5.3 |  |
| [`react`]() | 16.4.0 |  |
| [`react-dom`]() | 16.4.0 |  |
| [`builtin-modules`]() | 3.0.0 | See what what node modules are built-in |
| [`file2html`]() | 0.1.9 | Convert various files into an html string |
| [`file2html-image`]() | 0.1.1 | file2html support for .png, .jpg, .bmp |
| [`file2html-ooxml`]() | 0.2.2 | file2html support for .doc, docx. |
| [`file2html-text`]() | 0.2.0 | file2html support for .txt |
| [`buffer`]() | 5.2.0 | easily convert buffers to arrays and visa versa |
| [`wapi`]()  |  | WordPress RestAPI |
| [`electron`](https://www.npmjs.com/package/electron) | 2.0.2 |  Create desktop apps with node using HTML/CSS/JS |
| [`electron-builder`](https://www.npmjs.com/package/electron-builder) | 20.15.1 |  |
| [`electron-debug`](https://www.npmjs.com/package/electron-debug) | 0.3.0 | extra debug support for compiled js in window |
| [`electron-is-dev`](https://www.npmjs.com/package/electron-is-dev) | 0.3.0 |  |
| [`electron-log`](https://www.npmjs.com/package/electron-log) | 2.2.6 |  |
| [`update-electron-app`](https://www.npmjs.com/package/update-electron-app) | 1.2.0 |  |
| [`electron-react-devtools`](https://www.npmjs.com/package/electron-react-devtools) | 0.5.3 |  |
| [`react`](https://www.npmjs.com/package/react) | 16.4.0 |  |
| [`react-dom`](https://www.npmjs.com/package/react-dom) | 16.4.0 |  |
| [`builtin-modules`](https://www.npmjs.com/package/builtin-modules) | 3.0.0 | See what what node modules are built-in |
| [`file2html`](https://www.npmjs.com/package/file2html) | 0.1.9 | Convert various files into an html string |
| [`file2html-image`](https://github.com/file2html/file2html-image) | 0.1.1 | file2html support for .png, .jpg, .bmp |
| [`file2html-ooxml`](https://github.com/file2html/file2html-ooxml) | 0.2.2 | file2html support for .doc, docx. |
| [`file2html-text`](https://github.com/file2html/file2html-text) | 0.2.0 | file2html support for .txt |
| [`buffer`](https://www.npmjs.com/package/buffer) | 5.2.0 | easily convert buffers to arrays and visa versa |
| [`wapi`](https://github.com/WP-API/node-wpapi)  |  | WordPress RestAPI |


#### Development

| Package  | Version  | What it Does  |
| ------------ | :------------: | ------------ |
| [`cross-env`]() | 5.1.6 | package distribution across multiple platforms |
| [`concurrently`]() | 3.5.1 | allows multiple scripts to be run at the same time |
| [`prettier`]() | 1.4.4 |  |
| [`wait-on`]() | 2.1.0 | forces certain scripts to wait for completion |
| [``]()  |  |  |


## Future Features

Looking to implement the following in the future!

| Package  | What it Does  |
| ------------ | ------------ |
| [`devtron`]() | electron IPC, etc |
| [`react-loadable`](https://github.com/jamiebuilds/react-loadable) |  |
| [`electron-packager`]() | cross platform packaging? |
| [`electron-forge`]() | extensive build options; child is electron-builder |
| [`OAuth2`]() | Authentication for Google services (for Google Drive) |
| [`babel`]() |  |
| [`lint`]() |  |
| [`browserify`]() |  |
| [`electron-debug`]() |  |
| [`electron-config`]() | 8 function configuration store |
| [`electron-util`]() | access MainRender process functions in Render Process |
| [`electron-context-menu`]() | give users custom right click options |
| [`menuba`]() | dead-simple menubar creation |
| [`electron-dl`]() | saves files in downloads directory and shows progress bar (MacOS) |
| [`spectron`]() | an extensive electron testing network |
| [`config`]() | configuration settings that go on disk |
| [`node-temp`]() | create temporary directories on launch with autocleaning |
| [``]() |  |


## Getting Started

1.) Clone this repository and cd into the directory, or "Open in GitHub Desktop"
```node
	git clone https://github.com/Braden-Preston/electron-react-combined
	
	cd electron-react-file2html
```

2.) Install yarn globally as a node module
```node
	npm i -g yarn
```
3.) Install app's dependancies. Creates /node-modules/ & package-lock.json
```node
	npm install
```
4.) Start a development environment for React for live code editing! 😍
```node
	yarn start
```



## Example Setup

After fixing the module, make sure the rest of the code is as follows for the main process and render process.

**main.js** (Main Process )
```javascript
const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600})
	mainWindow.loadFile('index.html')
	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})
```

**renderer.js** (Render Process)
```javascript
const fs = require('fs')
const file2html = require('file2html')
const OOXMLReader = require('file2html-ooxml')

file2html.config({
		readers: [OOXMLReader]
});

let docPath = 'assets/sample.docx'
fileBuffer = fs.readFileSync(docPath, null)

file2html.read({
		fileBuffer,
		meta: {
				mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}
}).then((file) => {
		const {styles, content} = file.getData()		
		const meta = file.getMeta()
		
		// Publish Results
		document.body.innerHTML = styles + content
		console.log("Result", styles + content)
		console.log("MetaInfo", meta)
});
```

## Development

Yarn starts up a dev environment that waits on the react and electron components to compile. After that is done, it pushes an injection routine that allows for hot-editing the code live. 

The main render process, browser window is being hosted on `http://localhost:3000`, which allows you to dynamically update the code. Any time, you save a file, it should update the app. If it doesn't, you can always `ctrl`+`c` out of the batch process and restart the dev environment with your most recent code using `yarn start`.

## Making a Build

```node
	yarn build
```
>  Note: Squirrel is NOT implemented yet; however, `electron-builder`  is, so it may be  easier to add later.

Executing this yarn script starts a build, which could take anywhere from 30 seconds to two minutes to build. It creates two directories **build** and **dist**. If you have already created a build before, it may be best to clear out these two directories if they already exist. This way you don't end up with duplicate installers in the **dist** directory. It should be smart enough to override existing builds

> Note: Make super-certain you are bumping up the version number in **pacakge.json**. I believe there are pacakges that do this that can be implemented later to this boilerplate.

------------

## (deprecated) Editing the Module `file2html`

Make sure that `npm-install` has been run first. After you have the directory /node-modules navigate to /file2html/. The default code does not work (may be user error). You must replace code in `npm-modules/file2html/index.js` to fix the issue. Here it is:

**index.js** (before)
```javascript
    var ReaderConstructor = readers.find(function (ReaderConstructor) {
        return ReaderConstructor.testFileMimeType(meta.mimeType);
    });
```

**index.js** (after)
```javascript
	var ReaderConstructor = readers[0].default
```
**Note:** The ReaderConstructor in the original code is supposed to be obtained by checking the file MimeType, however there are two cases in which it is not working:

1.) [Reader]**.testFileMimeType()** is a function. It calls **lookup()** from `mime.js` module, which I believe freaks out when the filebuffer passes a file that has a null value for mimeType. 

2.) Even if #1 checks out, **.testFileMimeType()** is still being called against a [Reader] class. The way it is currently set up, the class constructor is one level lower than it should be. That is why testing the mimeType does not work, because it is trying to access a constructors method, while it is searching one level too high in the object. By setting it to reader[i].default, you are going to be accessing the default constructor, which contains the **.testFileMimeType()** function.
