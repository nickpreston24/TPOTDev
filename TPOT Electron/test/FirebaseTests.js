var firebase = require('firebase/app');
require('firebase/auth')

// var config = {
//     apiKey: "AIzaSyB2h-LkhuHOnSmRU8V8BN4_gH_ddaiFU0c",
//     authDomain: "<PROJECT_ID>.firebaseapp.com",
//     databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
//     storageBucket: "<BUCKET>.appspot.com",
// };

var config = {
    apiKey: "AIzaSyCrRjT-eZQAxfPkDemOe0WiebiWVZju97w",
    authDomain: "tpot-toolbox.firebaseapp.com",
    databaseURL: "https://tpot-toolbox.firebaseio.com",
    projectId: "tpot-toolbox",
    storageBucket: "tpot-toolbox.appspot.com",
    messagingSenderId: "971065099433"
};

app = firebase.initializeApp(config)


describe('Sign In', () => {
    var email = 'michael.n.preston@gmail.com'
    var password = ""
    var email = 'bpfilmsinc@gmail.com'
    app.auth()
        .signInWithEmailAndPassword(email, password)
        .then((resolve) => {
            if (resolve) console.log('resolved: ', resolve);
            if (resolve) console.log('Sign-in Successful!', );
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode) console.log('error: ', errorCode);
            if (errorMessage) console.log('message: ', errorMessage);
        });
})

//Create a user:

// firebase.auth()
//     .createUserWithEmailAndPassword(email, password)
//     .catch((error) => {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         if (errorCode) console.log('error: ', errorCode);
//         if (errorMessage) console.log('message: ', errorMessage);
//     });