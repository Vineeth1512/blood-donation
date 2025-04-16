// login.js
import { initFirebase } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Initialize Firebase
const { auth, db } = initFirebase();

// Function to handle user login
async function loginUser(email, password, errorElement) {
  if (!email || !password) {
    errorElement.innerText = "Please enter both email and password!";
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
      console.log(userData);

      localStorage.setItem("DonorData", JSON.stringify(userData));

      let isFirstTime = localStorage.getItem(`firstLogin-${user.uid}`);
      console.log(isFirstTime);

      if (!isFirstTime) {
        localStorage.setItem(`firstLogin-${user.uid}`, "true");
        window.location.href = "donor-update.html";
      } else {
        window.location.href = "donor-dashboard.html";
      }

      alert(`Login Successful!\nWelcome, ${userData.fullName}!`);
    } else {
      alert("Login Successful, but no additional user data found!");
      window.location.href = "donor-update.html";
    }
  } catch (error) {
    errorElement.innerText =
      error.code === "auth/user-not-found"
        ? "User not found. Please register."
        : error.code === "auth/wrong-password"
        ? "Incorrect password. Try again."
        : "Login failed. Please try again.";
  }
}

// Form submission handler
function setupLoginForm() {
  const loginForm = document.querySelector("form");
  const match = document.querySelector("#match");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    loginUser(email, password, match);
  });
}

setupLoginForm();
