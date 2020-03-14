import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';

//const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyA5nQvAsijNqLxkLvorDFJeYZ5A_4ZIIhs",
    authDomain: "phonebook-f5d77.firebaseapp.com",
    databaseURL: "https://phonebook-f5d77.firebaseio.com",
    projectId: "phonebook-f5d77",
    storageBucket: "phonebook-f5d77.appspot.com",
    messagingSenderId: "336629567075",
    appId: "1:336629567075:web:be5a03ef6607a39e1df256",
    measurementId: "G-9RYXCXSSES"
};

firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
