/*
 * Firestore
 */

// var db = require('firebase/database');
// require("firebase/auth");
// const FirebaseAuthenticator = require('../src/modules/firebaseAuth').FirebaseAuthenticator
// const admin = require('firebase-admin');

// admin.initializeApp({
//     credential: admin.credential.applicationDefault()
// });
// var db = admin.firestore();

/**
 * Real-time Firebase
 */
var firebase = require('firebase');

firebase.initializeApp({
    serviceAccount: '../src/config/service-account.json',
    databaseUrl: 'https://tpot-toolbox.firebaseio.com/',
});

/**
 * constants
 */
const email = "michael.n.preston@gmail.com";
const password = "Mercury10";


describe.skip("Sign In", () => {
    it('should sign in with no error', () => {
        var authenticator = new FirebaseAuthenticator(email, password);
        authenticator.login().then((result) => {
            // console.log('result: ', result);
        }).catch(console.log);
    })
});

describe.skip("Add Data", () => {

    var ref = firebase.app().database().ref();

    // var users = db.collection('users').doc('Michael');

    // var setMichael = users.set({
    //     FirstName: 'Michael',
    //     LastName: 'Preston',
    //     Email: 'michael.n.preston@gmail.com',
    //     password: 'Mintsharp18!',
    // }).catch(console.log)


    // var app = authenticator.app;
    // var db = app.db;

    //  console.log('retrived\n', authenticator.app);
    // var users = db.collection('users');

    // console.log('users:\n', users);
})