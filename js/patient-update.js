import { initFirebase } from "./firebase-config.js";
import {
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const { db } = initFirebase();
const matchText = document.getElementById("match");
const updateBtn = document.getElementById("update-btn");
const patientData = JSON.parse(localStorage.getItem("patientData"));

updateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  matchText.innerText = "";

  const formValues = getFormValues();
  const error = validateForm(formValues);
  if (error) {
    matchText.innerText = error;
    return;
  }

  try {
    const file = document.getElementById("patient-profile").files[0];
    const profilePic = file
      ? await uploadImageToCloudinary(file)
      : patientData.profilePic || "";

    await updatePatientInFirestore({ ...formValues, profilePic });

    alert("Patient details updated successfully!");
    window.location.href = "patient-dashboard.html";
  } catch (err) {
    console.error(err);
    matchText.innerText = err.message || "An error occurred.";
  }
});

function getFormValues() {
  return {
    fullName: document.getElementById("patient-fullName").value.trim(),
    email: document.getElementById("patient-email").value.trim(),
    phoneNumber: document.getElementById("patient-phone").value.trim(),
    address: document.getElementById("patient-address").value.trim(),
    age: document.getElementById("patient-age").value.trim(),
    bloodGroup: document.getElementById("patient-blood-group").value,
    gender: document.getElementById("patient-gender").value,
    bloodType: document.getElementById("patient-blood-type").value,
    agreed: document.getElementById("patient-terms").checked,
  };
}

function validateForm(data) {
  if (!/^\d{10}$/.test(data.phoneNumber))
    return "Enter a valid 10-digit phone number.";
  if (!data.age || isNaN(data.age) || data.age < 1 || data.age > 100)
    return "Enter a valid age between 1 and 100.";
  if (!data.address) return "Address cannot be empty.";
  if (data.bloodGroup === "Select") return "Select a blood group.";
  if (data.gender === "Select") return "Select a gender.";
  if (data.bloodType === "Select") return "Select a blood type.";
  if (!data.agreed) return "Please agree to the terms and conditions.";
  return null;
}

async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Unsigned-vineeth");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dlrvxuntz/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!data.secure_url) throw new Error("Image upload failed");
  return data.secure_url;
}

async function updatePatientInFirestore(data) {
  if (!patientData || !patientData.id)
    throw new Error("Patient data not found.");
  const patientRef = doc(db, "users", patientData.id);
  await updateDoc(patientRef, {
    ...data,
    updatedAt: new Date(),
  });
  localStorage.setItem(
    "patientData",
    JSON.stringify({ ...patientData, ...data })
  );
}
