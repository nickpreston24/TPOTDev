import * as wp from './actions'//it doesn't like this, have you used index.js in your testing?

// No I have not
//import is a reserved word for React, mind

// Import is EX6

// ES6, and not native to React
// hm ok, will check

//well, crap

// One thing that I have noticed from Amber and other boilerplats that I have worked on is that Whether VSCode is able to recognize a unkknown token or onot has to do with its Babel configuration. There are some things that can just be automatically recognized becuase of the node version we are working on, like the require method. The import Method is ES6 and so is the * modifieer. I had to fix this in other boilerplates by updating my Webpack or Babel configuration. Then I had no compile errors.



// ok.


// ACtually, your tests folder is outside the .src folder, which is the on e that is being given a configuration by Wepback through Create React App. You may just need to add support for the tests folder with its own Babel/Webpack config.


//I'll try this.  Testing is the only way I know to try something written without writing more of the UI for now.  Not that React confuses me as much as it did. 

export {
    wp,
}