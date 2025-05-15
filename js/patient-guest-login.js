import { signInAnonymously } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

import { auth, db } from "./patient-firebase-config.js";
const handleGuestLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    const guestData = {
      fullName: "Guest User",
      email: "guest@blooddonation.com",
      phoneNumber: "9898798989",
      age: "25",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBb2P4yPPrTY_H7OpNzOPDL1-z8soSbx8vJg&s",
      bloodGroup: "A+",
      address: "Vemulawada",
      bloodType: "Red Blood Cells",
      hasUploadedDetails: true,
      id: user.uid,
    };

    // Optionally store in Firestore:
    await setDoc(doc(db, "users", user.uid), guestData);

    localStorage.setItem("patientData", JSON.stringify(guestData));
    window.location.href = "patient-dashboard.html";
  } catch (error) {
    alert("Guest login failed.");
    console.error("Anonymous login error:", error);
  }
};

document
  .getElementById("guest-login-button")
  .addEventListener("click", handleGuestLogin);
