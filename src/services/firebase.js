import firebase from "firebase";
import config from "../config/firebase";

const firebaseApp = firebase.initializeApp(config);

export const auth = firebaseApp.auth();

export const FBProvider = new firebase.auth.FacebookAuthProvider();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export default firebaseApp.firestore();
