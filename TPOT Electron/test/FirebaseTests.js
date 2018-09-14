var firebase = require("firebase/app");
require("firebase/auth");
const FirebaseAuthenticator = require('../src/modules/firebaseAuth').FirebaseAuthenticator
// const FirebaseAuthenticator = require('../src/modules/firebaseAuth.js').FirebaseAuthenticator


describe("Sign In", () => {

    // it('should take less than 500ms', function (done) {
    var email = "michael.n.preston@gmail.com";
    var password = "Mercury10";

    var authenticator = new FirebaseAuthenticator(email, password);
    authenticator.login().then((result) => {
        // result.logout();
        console.log('result: ', result);
    });

});

// var config = {
//     apiKey: "AIzaSyCrRjT-eZQAxfPkDemOe0WiebiWVZju97w",
//     authDomain: "tpot-toolbox.firebaseapp.com",
//     databaseURL: "https://tpot-toolbox.firebaseio.com",
//     projectId: "tpot-toolbox",
//     storageBucket: "tpot-toolbox.appspot.com",
//     messagingSenderId: "971065099433"
// };