// src/lib/firebaseadmin.ts

import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let app: App;

// This "singleton" pattern prevents re-initializing the app on every hot-reload.
if (getApps().length === 0) {
  // By calling initializeApp() with NO arguments, it automatically
  // uses the default credentials of the Google Cloud environment.
  app = initializeApp();
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };