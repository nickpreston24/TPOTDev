///<summary>

// ViewManager holds templates
// ViewBuilder build them

//  1.Keys are the template name.  
//  2.Values are prebuilt objects or funcs that build them.
// We should be able to initialize a dictionary from file and have those prototypes built.

///</summary>

/// This class keeps a local dictionary of view (window/webview) templates:
var viewDictionary = {};
class ViewTemplates {

    Init() {
        //Load all known templates from file/json
        //These will be things like empty BrowserWindows, iframe/webview windows, and other customs.  
        //Basically, any prefabs you want go here.  This obj is a singleton, mind.
    }

    Register(viewName, buildParams) {
        //registers a template and its build parameters
    }

    Get(viewName) {
        //retrieves a view template ready for build
    }
}

//I'm placing the builder inside the View class 
//  - View can be the base class from which we inherit othe Views.
//Example: https://medium.com/@axelhadfeg/builder-pattern-using-javascript-and-es6-ec1539182e24
class View {

    // listeners = []
    //pass in a template prototype, clone an existing build,
    // or just use the internal Builder class:
    constructor(build) {
        if (arguments.length === 1 && this.validateBuild(build)) {
            this.name = build.name;
            this.windowType = build.windowType;
            this.width = build.width;
            this.height = build.height;
            //etc...
        }
    }

    validateBuild(build) {
        return (String(build.constructor) === String(View.Builder));
    }

    //Fluent Interfaced Builder patterns are fun!
    static get Builder() {
        class Builder {
            constructor(viewName) {
                this.name = viewName;
                //get a view template from class of the same name. ^
            }
            withWindowType(windowType) { //browser window, webview, iframe-window, etc.
                //set the type of window:
                this.windowType = windowType
                return this
            }
            addListener(listener) {
                //associate view with a listener
                this.listeners.push(listener)
                return this
            }
            build() {
                return new View(this)
            }
        }
    }

    toString() {
        return 'Name: ${this.name}\n' //todo: add other properties as well
    }
}

module.exports = {
    View,
    ViewTemplates,
    // Builder
    // ViewManager
}