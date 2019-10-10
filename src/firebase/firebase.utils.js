import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
        apiKey: "AIzaSyA0BvQGF45DhpAxRclKM-RGMK7fcJb0i4c",
        authDomain: "crwn-db-1ca08.firebaseapp.com",
        databaseURL: "https://crwn-db-1ca08.firebaseio.com",
        projectId: "crwn-db-1ca08",
        storageBucket: "crwn-db-1ca08.appspot.com",
        messagingSenderId: "26732679735",
        appId: "1:26732679735:web:df324d5d6ac0884c9de5b2"
      };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promp: "select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
