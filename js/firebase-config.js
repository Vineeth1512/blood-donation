// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

export function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAY0RgcKyYbqUiif_tXb_-GZiF-XU_T6cg",
    authDomain: "blood-bank-94b23.firebaseapp.com",
    projectId: "blood-bank-94b23",
    storageBucket: "blood-bank-94b23.appspot.com",
    messagingSenderId: "108866595341",
    appId: "1:108866595341:web:5d9c8a83056c53e0c50344",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { auth, db };
}
