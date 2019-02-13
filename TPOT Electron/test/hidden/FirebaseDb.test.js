// const admin = require('firebase-admin');
const config = require('../../src/config/environment.js').config;
var serviceAccount = require('../src/config/service-account.json');
console.log('Service Account:\n', serviceAccount);

// var app = admin.initializeApp(config);
var app = admin.initializeApp(serviceAccount)
var db = admin.firestore();


// console.log('Hello from db tests');



// given code:
// const firestore = new Firestore();
// const settings = {
//     config,
//     timestampsInSnapshots: true
// };
// firestore.settings(settings);



// console.log('app', app);
// console.log('db', db);

var docRef = db.collection('users').doc('alovelace');
console.log('docref\n', docRef);

var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    // born: 1815
});