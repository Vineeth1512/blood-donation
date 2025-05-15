// patient-login.js
import { auth, db } from "./patient-firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const handleLogin = async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const match = document.querySelector("#match");

  if (!email || !password) {
    match.innerText = "Please enter both email and password!";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      localStorage.setItem("patientData", JSON.stringify(userData));

      if (userData.hasUploadedDetails) {
        window.location.href = "patient-dashboard.html";
      } else {
        window.location.href = "patient-update.html";
      }

      alert(`Login Successful!\nWelcome, ${userData.fullName}!`);
    } else {
      alert("Login Successful, but no additional user data found!");
      window.location.href = "patient-login.html";
    }
  } catch (error) {
    match.innerText =
      error.code === "auth/user-not-found"
        ? "User not found. Please register."
        : error.code === "auth/wrong-password"
        ? "Incorrect password. Try again."
        : "Login failed. Please try again.";
  }
};

//document.querySelector("form").addEventListener("submit", handleLogin);
document.getElementById("login-button").addEventListener("click", handleLogin);
