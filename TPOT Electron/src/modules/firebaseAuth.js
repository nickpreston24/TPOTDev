var firebase = require("firebase/app");
require("firebase/auth");

const config = require('../config/environment.ts').config;
app = firebase.initializeApp(config);

class FirebaseDb {
    //Takes a json, identifies what collections or documents it matches from the db, then adds them
    //Throws error if collection or document cannot be found.
    //OR, just store as a new collection (might be volatile)
    async add(json) {
        //todo: figure out how to parse json objects.        
    }
}

/// Fluent Wrapper class for firebase functions & temporary db store.
class FirebaseAuthenticator {

    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.app = app;
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
    FirebaseAuthenticator,
    FirebaseDb
}