/*
 * Firestore
 */
var firebase = require("firebase/app");
require("firebase/auth");
const config = require('../../src/config/environment.js').config;
var app = firebase.initializeApp(config);

/**
 * constants
 */
const email = "";
const password = ''

describe("sign in", () => {
    it('should sign in', () => {
        login();
    })
})

async function login() {
    return app.auth()
        .signInWithEmailAndPassword(email, password)
        .catch(console.log);
}


// firebase.initializeApp({
//     serviceAccount: '../src/config/service-account.json',
//     databaseUrl: 'https://tpot-toolbox.firebaseio.com/',
// });

// describe.skip("Sign In", () => {
//     it('should sign in with no error', () => {
//         var authenticator = new FirebaseAuthenticator(email, password);
//         authenticator.login().then((result) => {
//             // console.log('result: ', result);
//         }).catch(console.log);
//     })
// });

// describe.skip("Add Data", () => {

//     var ref = firebase.app().database().ref();

//     // var users = db.collection('users').doc('Michael');

//     // var setMichael = users.set({
//     //     FirstName: 'Michael',
//     //     LastName: 'Preston',
//     //     Email: '',
//     //     password: '',
//     // }).catch(console.log)


//     // var app = authenticator.app;
//     // var db = app.db;

//     //  console.log('retrived\n', authenticator.app);
//     // var users = db.collection('users');

//     // console.log('users:\n', users);
// })