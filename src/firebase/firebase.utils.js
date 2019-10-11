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

export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log("Error Creating user", err.message);
        }
    }

    return userRef;
}
export default firebase;
