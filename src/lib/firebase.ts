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

// Helper function to execute any promise with a timeout and safe fallback
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallbackValue: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.warn(`Firestore operation timed out after ${timeoutMs}ms. Using fallback.`);
      resolve(fallbackValue);
    }, timeoutMs);
    
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        console.error("Firestore operation error:", err);
        resolve(fallbackValue);
      });
  });
}

// Helper function to get the user's profile from Firestore
export async function getUserProfile(uid: string) {
  const fetchPromise = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  };
  
  return withTimeout(fetchPromise(), 1200, null);
}

// Helper function to save the user's profile to Firestore
export async function saveUserProfile(uid: string, profile: any) {
  const savePromise = async () => {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, profile, { merge: true });
    return true;
  };
  
  return withTimeout(savePromise(), 1200, false);
}

export { app, auth, db };
