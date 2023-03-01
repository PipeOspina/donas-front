import { FirebaseOptions, initializeApp } from 'firebase/app';

export const appConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_FRONT_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_FRONT_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_FRONT_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_FRONT_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_FRONT_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_FRONT_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_FRONT_STORAGE_BUCKET,
};

export const app = initializeApp(appConfig);
