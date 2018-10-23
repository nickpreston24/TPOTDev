var firebase = require("firebase/app");
require("firebase/auth");
const config = require('../../config/environment.js').config;
var app = firebase.initializeApp(config);
// Wrapper class for firebase functions
export default class FirebaseCredentials {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.app = app;
    }

    async login() {
        return app.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .catch(console.log);
    }

    //BROKEN
    async logout() {
        firebase.auth().signout() //does not recognize the signout or logout functions!
            // app.auth()
            //     .signout()
            //     .logout()
            .then((result) => {
                console.log("Sign out successful: ", result)
            }).catch(console.log);
        return this;
    }

    async createUser() {
        firebase.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode) console.log('error: ', errorCode);
                if (errorMessage) console.log('message: ', errorMessage);
            });
        return this;
    }
}

// module.exports = {
// FirebaseCredentials,
// }