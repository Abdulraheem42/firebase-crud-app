import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwhnoF3gBfk9ZbBfbau_fV026Fqg8bE1g",
    authDomain: "crud-app-7a1e9.firebaseapp.com",
    databaseURL: "https://crud-app-7a1e9.firebaseio.com",
    projectId: "crud-app-7a1e9",
    storageBucket: "crud-app-7a1e9.appspot.com",
    messagingSenderId: "58516142778",
    appId: "1:58516142778:web:6a31dac2511619b78ea083",
    measurementId: "G-M7D4J5JLVN"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
