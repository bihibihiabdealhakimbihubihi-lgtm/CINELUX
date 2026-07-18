/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCdbyXIdFWkPSF7TM5Z468J-s5et3HW-s",
  authDomain: "cinelux-3c79a.firebaseapp.com",
  projectId: "cinelux-3c79a",
  storageBucket: "cinelux-3c79a.firebasestorage.app",
  messagingSenderId: "269782341687",
  appId: "1:269782341687:web:8791a3649b6648870707b2",
  measurementId: "G-TS0PYTV0QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with local persistence so session is restored automatically
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Error setting persistence:", err);
});

// Initialize Firestore (uses the default database of the cinelux-3c79a project)
const db = getFirestore(app);

// Helper function to get the user's profile from Firestore
export async function getUserProfile(uid: string) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.error("Error fetching user profile from Firestore:", err);
  }
  return null;
}

// Helper function to save the user's profile to Firestore
export async function saveUserProfile(uid: string, profile: any) {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, profile, { merge: true });
  } catch (err) {
    console.error("Error saving user profile to Firestore:", err);
  }
}

export { app, auth, db };
