import { firebaseConfig } from '../keys'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

console.log(firebase)

const auth = firebase.auth();
const db = firebase.firestore();

export {
    auth,
    db,
};