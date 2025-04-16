import { initFirebase } from "./firebase-config.js";
import {
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const { db } = initFirebase();

// Function to populate form with existing donor data
// function populateDonorData() {
//   let donorData = JSON.parse(localStorage.getItem("DonorData"));
//   if (donorData) {
//     document.getElementById("sign-firstName").value = donorData.fullName || "";
//     document.getElementById("sign-email").value = donorData.email || "";
//     document.getElementById("sign-phone").value = donorData.phoneNumber || "";
//     document.getElementById("sign-age").value = donorData.age || "";
//     document.getElementById("sign-units").value = donorData.units || "";
//     document.getElementById("sign-gender").value = donorData.gender || "";
//     document.getElementById("sign-address").value = donorData.address || "";
//     document.getElementById("sign-available").value =
//       donorData.availability || "";
//     document.getElementById("sign-blood-group").value =
//       donorData.bloodGroup || "";
//     document.getElementById("sign-last-donate").value =
//       donorData.lastDonation || "";
//     document.getElementById("sign-profile").src = donorData.profilePic || "";
//     document.getElementById("header-profile").src = donorData.profilePic || "";
//   }
// }

// Function to gather form values
function getFormValues() {
  return {
    email: document.getElementById("sign-email").value.trim(),
    fullName: document.getElementById("sign-firstName").value.trim(),
    unitsToDonate: document.querySelector("#sign-units").value.trim(),
    gender: document.querySelector("#sign-gender").value,
    phoneNumber: document.querySelector("#sign-phone").value.trim(),
    age: document.querySelector("#sign-age").value.trim(),
    bloodGroup: document.querySelector("#sign-blood-group").value,
    lastDonation: document.querySelector("#sign-last-donate").value,
    address: document.querySelector("#sign-address").value.trim(),
    availability: document.querySelector("#sign-available").value,
  };
}

// 🛡️ Form Validation Function
function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const age = parseInt(data.age);
  const units = parseInt(data.unitsToDonate);

  if (!data.fullName) return "Full name is required.";
  if (!emailRegex.test(data.email)) return "Enter a valid email.";
  if (!phoneRegex.test(data.phoneNumber))
    return "Enter a valid 10-digit phone number.";
  if (isNaN(age) || age < 18 || age > 65)
    return "Age must be between 18 and 65.";
  if (!data.gender) return "Please select your gender.";
  if (!data.bloodGroup) return "Please select your blood group.";
  if (!data.address) return "Address is required.";
  if (!data.availability) return "Please select your availability.";
  if (isNaN(units) || units < 1) return "Enter valid units to donate.";

  return null;
}

// Function to upload image to Cloudinary
async function uploadImageToCloudinary(file) {
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
  if (!data.secure_url) throw new Error("Image upload failed");

  return data.secure_url;
}

// 🚀 Function to handle form submission
async function handleFormSubmission(e) {
  e.preventDefault();

  const formValues = getFormValues();
  const updateFile = document.getElementById("sign-profile").files[0];

  const validationMessage = validateForm(formValues);
  if (validationMessage) {
    document.getElementById("match").innerText = validationMessage;
    return;
  }

  try {
    const profilePic = updateFile
      ? await uploadImageToCloudinary(updateFile)
      : document.getElementById("sign-profile").src;

    const donorData = JSON.parse(localStorage.getItem("DonorData"));

    if (donorData && donorData.id) {
      const donorRef = doc(db, "users", donorData.id);
      const updatedData = {
        ...formValues,
        profilePic,
        updatedAt: new Date(),
      };

      await updateDoc(donorRef, updatedData);
      localStorage.setItem(
        "DonorData",
        JSON.stringify({ ...donorData, ...updatedData })
      );

      alert("Donor details updated successfully!");
      window.location.href = "donor-dashboard.html";
    } else {
      alert("Error: No donor data found.");
    }
  } catch (error) {
    console.log(error);
    document.getElementById("match").innerText = error.message;
  }
}

// 📌 Event listeners
document
  .getElementById("submit-btn")
  .addEventListener("click", handleFormSubmission);

// 🔁 Populate form on page load
//document.addEventListener("DOMContentLoaded", populateDonorData);
