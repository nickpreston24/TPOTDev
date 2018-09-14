var firebase = require("firebase/app");
require("firebase/auth");

// var config = require('../config/environment.js').environment;
const config = require('../config/environment.ts').environment;

app = firebase.initializeApp(config);
// var config = require('/src/config/environment.ts').firebaseConfig;

/// Fluent Wrapper class for firebase functions & temporary db store.
class FirebaseAuthenticator {

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async login() {
        let email = this.email;
        let password = this.password;
        app.auth()
            .signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                // console.log("Hello \n", user);
                if (user) console.log("user signed in!")
            }).then((result) => {
                firebase.auth().currentUser.getIdToken(true).then((id) => {
                    console.log('idToken: \n', id);
                    // console.log('User: ', firebase.auth().currentUser).name;
                }).catch(console.log)
            })
            .catch(console.log);

        return this;
    }

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
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode) console.log('error: ', errorCode);
                if (errorMessage) console.log('message: ', errorMessage);
            });
        return this;
    }
}

module.exports = {
    FirebaseAuthenticator
}