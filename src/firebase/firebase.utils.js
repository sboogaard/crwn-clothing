import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCUin3fcMe2w9ZR8T2J9NY1j2Hx-fNCOGQ",
    authDomain: "crwn-db-a9cd3.firebaseapp.com",
    projectId: "crwn-db-a9cd3",
    storageBucket: "crwn-db-a9cd3.appspot.com",
    messagingSenderId: "1042215674324",
    appId: "1:1042215674324:web:08c0d9b45bb924288f3641",
    measurementId: "G-EJEXC1FLF2"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

 
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date(); 

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error', error.message);
      }
    }
  


  return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth(); 
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account '})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

  
  
  
