var firebase = require("firebase/app");
require("firebase/auth");
const FirebaseAuthenticator = require('../src/modules/firebaseAuth').FirebaseAuthenticator

describe("Sign In", () => {

    var email = "michael.n.preston@gmail.com";
    var password = "Mercury10";

    var authenticator = new FirebaseAuthenticator(email, password);
    authenticator.login().then((result) => {
        // result.logout();
        console.log('result: ', result);
    });

});