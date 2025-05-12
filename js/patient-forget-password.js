import { auth, db } from "./patient-firebase-config.js";

import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const { auth } = initFirebase();

const form = document.querySelector("form");
const emailInput = document.getElementById("email");

const matchMessage = document.getElementById("match");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  console.log(email);

  try {
    await sendPasswordResetEmail(auth, email, {
      url: "http://127.0.0.1:5500/patient-forget-password.html",
      handleCodeInApp: true,
    });
    matchMessage.style.color = "green";
    matchMessage.textContent =
      "Password reset email sent! Please check your inbox.";
    form.reset();
  } catch (error) {
    matchMessage.style.color = "red";
    matchMessage.textContent = `Error: ${error.message}`;
    console.log(error);
  }
});
