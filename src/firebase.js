import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCAyxxvWWciV7yehwZd-CWBoCAhFw7m72E",
    authDomain: "bookstore-d224f.firebaseapp.com",
    projectId: "bookstore-d224f",
    storageBucket: "bookstore-d224f.appspot.com",
    messagingSenderId: "746163960358",
    appId: "1:746163960358:web:b19c74a9ee1d90d31904e7"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();
  