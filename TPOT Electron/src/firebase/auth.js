import { auth } from './firebase';
import { observable, action, computed, decorate, autorun } from 'mobx'
const electron = window.require("electron");
const remote = electron.remote;
const app = remote.app;
const fs = remote.require("fs");
const path = remote.require("path");

// Create User
export const createUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Delete User
export const deleteUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signIn = action((email, password) => {
    return new Promise(action((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(action((authUser) => {
                const contents = {
                    authUser: authUser.user,
                }
                let fileContents = JSON.stringify(contents)
                const fileName = path.join(app.getPath('userData'), 'Local Storage', 'auth.json')
                fs.writeFile(fileName, fileContents, (err) => {
                    // if (err) reject(err.toString())
                    console.log("Authorization Token Saved to Disk")
                })
                resolve(authUser.user)
            }))
            .catch(error => {
                console.log(error)
                reject(error.toString())
            })
    }))
})

// Sign out
export const signOut = () => {
    const fileName = path.join(app.getPath('userData'), 'Local Storage', 'auth.json')
    fs.unlink(fileName, () => {
        console.log('Signed Out User')
    })
}

// Password Reset
export const resetPassword = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const updatePassword = (password) =>
    auth.currentUser.updatePassword(password);