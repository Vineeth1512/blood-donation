import { initFirebase } from "./firebase-config.js";
import {
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const { db } = initFirebase();
// Retrieve stored donor data from localStorage
const donorData = JSON.parse(localStorage.getItem("DonorData"));

// Initialize the update form
function initializeForm() {
  const submitButton = document.getElementById("submit-btn");
  submitButton.addEventListener("click", handleFormSubmit);
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault(); // Prevent default form submission

  const formValues = getFormValues();
  const file = document.getElementById("sign-profile").files[0];

  try {
    // Validate form fields before proceeding
    if (!validateForm(formValues, file)) return;

    // Upload image and update donor data
    const profileURL = file ? await uploadImageToCloudinary(file) : null;
    await updateDonorInFirestore({
      ...formValues,
      profilePic: profileURL || donorData.profilePic, // Keep previous profile if no new image
    });

    alert("Donor details updated successfully!");
    window.location.href = "donor-dashboard.html"; // Redirect to the dashboard
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage(error.message); // Display error message near the form
  }
}

// Collect form values from the form fields
function getFormValues() {
  return {
    email: document.getElementById("sign-email").value,
    fullName: document.getElementById("sign-firstName").value,
    phoneNumber: document.getElementById("sign-phone").value,
    age: document.getElementById("sign-age").value,
    address: document.getElementById("sign-address").value,
    gender: document.getElementById("sign-gender").value,
    bloodGroup: document.getElementById("sign-blood-group").value,
    lastDonation: document.getElementById("sign-last-donate").value,
    availability: document.getElementById("sign-available").value,
    units: document.getElementById("sign-units").value,
  };
}

// Validate form data
function validateForm(formValues, file) {
  console.log(formValues);

  let isValid = true;

  // Check if mandatory fields are filled
  if (
    !formValues.fullName ||
    !formValues.phoneNumber ||
    !formValues.age ||
    !formValues.email ||
    !formValues.bloodGroup ||
    !formValues.gender
  ) {
    displayErrorMessage("Please fill in all fields.");
    console.log(isValid);

    isValid = false;
  }

  // Phone number validation (optional: you can refine it)
  const phonePattern = /^[0-9]{10}$/;
  if (formValues.phoneNumber && !phonePattern.test(formValues.phoneNumber)) {
    displayErrorMessage("Please enter a valid 10-digit phone number.");
    isValid = false;
  }

  // Age validation (optional: you can adjust the age range if needed)
  if (formValues.age && (formValues.age < 18 || formValues.age > 100)) {
    displayErrorMessage("Please enter a valid age between 18 and 100.");
    isValid = false;
  }

  // Image file validation (optional: file size/type check)
  if (file && file.size > 5 * 1024 * 1024) {
    // 5 MB max size
    displayErrorMessage("Profile image must be under 5 MB.");
    isValid = false;
  }

  return isValid;
}

// Upload image to Cloudinary
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
  if (!data.secure_url) throw new Error("Image upload failed.");
  return data.secure_url;
}

// Update donor data in Firestore
async function updateDonorInFirestore(data) {
  if (donorData && donorData.id) {
    const donorRef = doc(db, "users", donorData.id);
    await updateDoc(donorRef, {
      ...data,
      updatedAt: new Date(),
    });

    // Update localStorage with new donor data
    localStorage.setItem(
      "DonorData",
      JSON.stringify({
        ...donorData,
        ...data,
      })
    );
  } else {
    throw new Error("No donor data found.");
  }
}

// Display error message near the form
function displayErrorMessage(message) {
  const errorElement = document.getElementById("match");
  errorElement.textContent = message;
  errorElement.style.color = "red";
}

// Initialize form functionality on page load
initializeForm();
