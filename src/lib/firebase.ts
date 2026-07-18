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
import originalConfig from '../../firebase-applet-config.json';

// Dynamic Firebase Configuration allowing runtime/build-time override
// with default project set to the user's custom 'cinelux-3c79a' project
const env = (import.meta as any).env || {};
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || originalConfig.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "cinelux-3c79a.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "cinelux-3c79a",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "cinelux-3c79a.appspot.com",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || originalConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || originalConfig.appId,
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || originalConfig.firestoreDatabaseId || undefined
};

// Initialize Firebase using the actual platform configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with local persistence so session is restored automatically
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Error setting persistence:", err);
});

// Initialize Firestore with the dynamic database ID from the platform configuration
const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

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

// Helper function to recursively remove undefined fields for Firestore safety
function removeUndefinedFields(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(removeUndefinedFields);
  }
  const cleaned: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      if (val !== undefined) {
        cleaned[key] = removeUndefinedFields(val);
      }
    }
  }
  return cleaned;
}

// Helper function to save the user's profile to Firestore
export async function saveUserProfile(uid: string, profile: any) {
  const sanitizedProfile = removeUndefinedFields(profile);
  const savePromise = async () => {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, sanitizedProfile, { merge: true });
    return true;
  };
  
  return withTimeout(savePromise(), 1200, false);
}

export { app, auth, db };
