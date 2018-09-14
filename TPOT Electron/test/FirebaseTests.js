var firebase = require("firebase/app");
require("firebase/auth");

// var config = {
//     apiKey: "AIzaSyB2h-LkhuHOnSmRU8V8BN4_gH_ddaiFU0c",
//     authDomain: "<PROJECT_ID>.firebaseapp.com",
//     databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
//     storageBucket: "<BUCKET>.appspot.com",
// };

// var config = {
//     apiKey: "AIzaSyCrRjT-eZQAxfPkDemOe0WiebiWVZju97w",
//     authDomain: "tpot-toolbox.firebaseapp.com",
//     databaseURL: "https://tpot-toolbox.firebaseio.com",
//     projectId: "tpot-toolbox",
//     storageBucket: "tpot-toolbox.appspot.com",
//     messagingSenderId: "971065099433"
// };

var config = require('/src/config/environment.ts').firebaseConfig;

app = firebase.initializeApp(config);

describe("Sign In", () => {
    var email = "michael.n.preston@gmail.com";
    var password = "Mercury10";
    // var email = 'bpfilmsinc@gmail.com'
    app
        .auth()
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
});

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