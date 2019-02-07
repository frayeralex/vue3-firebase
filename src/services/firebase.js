import firebase from "firebase";
import config from "../config/firebase";

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
