// firebase-apps.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Auth config
const firebaseAuthConfig = {
  apiKey: "AIzaSyB0FeNmR15EAASokGjDMzqQBmXGRDxhipY",
  authDomain: "blood-bank-patient.firebaseapp.com",
  projectId: "blood-bank-patient",
  storageBucket: "blood-bank-patient.firebasestorage.app",
  messagingSenderId: "345768879626",
  appId: "1:345768879626:web:850afb2b5deb9cba70a1f3",
  measurementId: "G-SLQRXYNNTN",
};

// Store config
const firebaseStoreConfig = {
  apiKey: "AIzaSyAY0RgcKyYbqUiif_tXb_-GZiF-XU_T6cg",
  authDomain: "blood-bank-94b23.firebaseapp.com",
  projectId: "blood-bank-94b23",
  storageBucket: "blood-bank-94b23.firebasestorage.app",
  messagingSenderId: "108866595341",
  appId: "1:108866595341:web:5d9c8a83056c53e0c50344",
};

// Initialize Firebase apps
const appAuth = initializeApp(firebaseAuthConfig, "authApp");
const appStore = initializeApp(firebaseStoreConfig, "storeApp");

// Export auth and db
export const auth = getAuth(appAuth);
export const db = getFirestore(appStore);
