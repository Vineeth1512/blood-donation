import { initFirebase } from "./firebase-config.js";
import {
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const { db } = initFirebase();

document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("patientData");

  if (!userData) {
    alert("No Patient Found, Register please..! ");
    return (window.location.href = "patient-login.html");
  }
});

const patientData = JSON.parse(localStorage.getItem("patientData"));
const updateBtn = document.getElementById("update-btn");

if (updateBtn) {
  updateBtn.addEventListener("click", handleUpdatePatient);
}

// ✅ Get form field values
function getFormValues() {
  return {
    email: document.getElementById("patient-email").value.trim(),
    fullName: document.getElementById("patient-fullName").value.trim(),
    phoneNumber: document.getElementById("patient-phone").value.trim(),
    age: document.getElementById("patient-age").value.trim(),
    bloodGroup: document.getElementById("patient-blood-group").value,
    gender: document.getElementById("patient-gender").value,
    bloodType: document.getElementById("patient-blood-type").value,
    address: document.getElementById("patient-address").value.trim(),
  };
}

// ✅ Upload image to Cloudinary
async function uploadImageToCloudinary(file) {
  if (!file) return "";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Unsigned-vineeth");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dlrvxuntz/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("Image upload failed.");
  }

  return data.secure_url;
}

// ✅ Validate required fields
function validateForm({
  email,
  fullName,
  phoneNumber,
  age,
  bloodGroup,
  gender,
  bloodType,
  address,
}) {
  if (
    !email ||
    !fullName ||
    !phoneNumber ||
    !age ||
    !bloodGroup ||
    !gender ||
    !bloodType ||
    !address
  ) {
    throw new Error("All fields are required.");
  }

  const phonePattern = /^[6-9]\d{9}$/;
  if (!phonePattern.test(phoneNumber)) {
    throw new Error("Invalid phone number.");
  }

  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
    throw new Error("Age must be between 18 and 100.");
  }

  return true;
}

// ✅ Update Firestore
async function updatePatientInFirestore(data, profilePic) {
  if (!patientData || !patientData.id) {
    throw new Error("No patient data found.");
  }

  const patientRef = doc(db, "users", patientData.id);

  const updatedData = {
    ...data,
    profilePic: profilePic || "",
    updatedAt: new Date(),
  };

  await updateDoc(patientRef, updatedData);

  localStorage.setItem(
    "patientData",
    JSON.stringify({ ...patientData, ...updatedData })
  );
}

// ✅ Main handler
async function handleUpdatePatient(e) {
  e.preventDefault();
  document.getElementById("match").innerText = ""; // clear error

  try {
    const formValues = getFormValues();
    validateForm(formValues);

    const file = document.getElementById("patient-profile").files[0];
    const profilePic = await uploadImageToCloudinary(file);

    await updatePatientInFirestore(formValues, profilePic);

    alert("Patient details updated successfully!");
    window.location.href = "patient-dashboard.html";
  } catch (error) {
    console.error(error);
    document.getElementById("match").innerText = error.message;
  }
}
