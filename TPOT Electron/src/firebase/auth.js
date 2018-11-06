import { auth } from './firebase';

// Create User
export const createUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Delete User
export const deleteUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const signOut = () =>
    auth.signOut();

// Password Reset
export const resetPassword = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const updatePassword = (password) =>
    auth.currentUser.updatePassword(password);