import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB504551aJ9ARjC1lqqITOlWRlnnG9_rWw",
  authDomain: "clothing-ecommerce-2e819.firebaseapp.com",
  projectId: "clothing-ecommerce-2e819",
  storageBucket: "clothing-ecommerce-2e819.appspot.com",
  messagingSenderId: "141217923704",
  appId: "1:141217923704:web:dd07ce452ec5d5ce77638d",
  measurementId: "G-S4F4FM9VF8"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;