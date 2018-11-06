import {
    db
} from './firebase';

// User API
export const addUser = (id, firstname, lastname, email, provider, displayname) => {
    db.collection('users').doc(`${id}`).set({
            firstname: !!firstname ? firstname : null,
            lastname: !!lastname ? lastname : null,
            email: !!email ? email : null,
            provider: !!provider ? provider : null,
            displayname: !!displayname ? displayname : null,
        })
        .then((docRef) => {
            // console.log(docRef)
        })
        .catch((error) => {
            console.error(error)
        })
}

export const getUser = (id) => {
    db.collection('users').doc(id).get()
        .then((documentSnapshot) => {
            console.log(documentSnapshot.data())
        })
}

// Wordpress
export const wordpressCredentials = new Promise((resolve, reject) => {
    db.collection('public').doc('wp-credentials').get()
        .then((documentSnapshot) => {
            const data = documentSnapshot.data()
            console.log("WP Credentials", data)
            data
                ? resolve(data)
                : reject("Document Snapshot is Null")
        })
})
// Other Entity APIs ...