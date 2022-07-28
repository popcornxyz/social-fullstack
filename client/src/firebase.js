import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import * as api from "./api";

// ******************* CONFIG *****************************

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();

// **************************** AUTHENTIFICATION ************************

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email, password, username) => {
  // return
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredentials) => {
      api.addUser(email, username, userCredentials.user.uid);
    }
  );
};

export const logout = () => {
  signOut(auth);
};

// // custom hook
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    // const unSub =
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
    // return unSub;
  }, []);

  return currentUser;
};

// **************************** Firestore ************************

export const db = getFirestore(app);

// **************************** Storage ************************

export const storage = getStorage(app);
