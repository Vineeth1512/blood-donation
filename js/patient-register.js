// register.js
import { auth, db } from "./patient-firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const registerForm = document.forms[0];

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.querySelector("#fullName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
  const match = document.querySelector("#match");

  if (password === confirmPassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        fullName: fullName,
        email: email,
        role: "patient",
        createdAt: new Date(),
      });

      alert("Signup Successfully");
      window.location.href = "patient-login.html";
    } catch (err) {
      match.innerText = err.message;
    }
  } else {
    match.innerText = "Passwords do not match";
  }
});
