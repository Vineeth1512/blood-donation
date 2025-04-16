import { initFirebase } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const { auth, db } = initFirebase();

async function registerUser(
  fullName,
  email,
  password,
  confirmPassword,
  errorElement
) {
  if (password !== confirmPassword) {
    errorElement.innerText = "Passwords do not match";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      fullName,
      email,
      role: "donor",
      createdAt: new Date(),
    });

    alert("Signup Successfully");
    window.location.href = "donor-login.html";
  } catch (err) {
    errorElement.innerText = err.message;
  }
}

// Form submission handler
function setupRegistrationForm() {
  const registerForm = document.forms[0];
  const match = document.querySelector("#match");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    registerUser(fullName, email, password, confirmPassword, match);
  });
}

setupRegistrationForm();
