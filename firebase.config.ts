
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions }from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";

// --- VALIDATE AND CONFIGURE FIREBASE ---

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // This can be optional
};

// This function provides detailed, developer-friendly error messages
// if the Firebase configuration is missing.
const validateFirebaseConfig = (config: FirebaseOptions) => {
    const missing: string[] = [];
    if (!config.apiKey) missing.push('NEXT_PUBLIC_FIREBASE_API_KEY');
    if (!config.authDomain) missing.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
    if (!config.projectId) missing.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    if (!config.storageBucket) missing.push('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
    if (!config.messagingSenderId) missing.push('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
    if (!config.appId) missing.push('NEXT_PUBLIC_FIREBASE_APP_ID');

    if (missing.length > 0) {
        const errorMessage = `
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        !!! ERROR: FIREBASE CONFIGURATION IS MISSING                                         !!!
        !!!----------------------------------------------------------------------------------!!!
        !!! The following required environment variables are not set in your .env.local file:!!!
        !!!   - ${missing.join('\n!!!   - ')}
        !!!                                                                                !!!
        !!! Please create a .env.local file in the root of your project and add these keys.  !!!
        !!! You can find these values in your Firebase project settings.                     !!!
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        `;
        throw new Error(errorMessage);
    }
     if (!config.apiKey?.startsWith('AIza')) {
        throw new Error('Invalid Firebase API key format. It should start with "AIza".');
    }
    console.log("✅ Firebase configuration variables are present.");
};

validateFirebaseConfig(firebaseConfig);

// --- INITIALIZE FIREBASE SERVICES ---

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
console.log(`✅ Firebase app "${app.name}" initialized successfully.`);

// Initialize Auth
export const auth = getAuth(app);
console.log("✅ Firebase Auth initialized.");

// Initialize Firestore
export const db = getFirestore(app);
console.log("✅ Firebase Firestore initialized.");

// Initialize Functions
export const functions = getFunctions(app);
console.log("✅ Firebase Functions initialized.");

// Initialize Analytics (Client-side only and if measurementId is present)
let analytics = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("✅ Firebase Analytics initialized.");
    } else {
      console.log("⚠️ Firebase Analytics not supported in this environment.");
    }
  });
} else {
    console.log("⚠️ Firebase Analytics not initialized because NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID is not set.");
}


export { app, analytics };
