import firebase from 'firebase';

import firebaseConfig from './firebaseConfig';
import { FirebaseError } from '@firebase/util';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account ' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export type FirebaseDocumentDataType = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export const createUserProfileDocument = async (userAuth: firebase.User) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        console.log('error creating user', error.message);
      }
    }
  }

  // eslint-disable-next-line consistent-return
  return userRef;
};

export const isFirebaseError = (error: unknown): error is FirebaseError => {
  return (error as FirebaseError).code !== undefined;
};
