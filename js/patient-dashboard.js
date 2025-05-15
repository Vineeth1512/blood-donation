import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { initFirebase } from "./firebase-config.js";

const { db } = initFirebase();

// ✅ Redirect to edit page with patient ID from localStorage
function editPatient() {
  const patientData = JSON.parse(localStorage.getItem("patientData"));
  if (!patientData || !patientData.id) {
    alert("Error: Patient data not found.");
    return;
  }

  window.location.href = `patient-edit.html?id=${patientData.id}`;
}
window.editPatient = editPatient;

// ✅ Load patient details from Firestore
async function loadPatientDetails() {
  const patientData = JSON.parse(localStorage.getItem("patientData"));
  console.log(patientData);

  if (!patientData || !patientData.id) {
    //alert("Error: Patient data not found. Please register again.");
  //  window.location.href = "patient-register.html";
    return;
  }

  try {
    const patientRef = doc(db, "users", patientData.id);
    const docSnap = await getDoc(patientRef);

    if (!docSnap.exists()) {
      alert("Patient not found.");
      window.location.href = "patient-register.html";
      return;
    }

    const patient = docSnap.data();
    updatePatientUI(patient);
  } catch (err) {
    console.error("Error fetching patient data:", err);
    alert("An error occurred while loading patient data.");
  }
}

// ✅ Fill the DOM with patient data
function updatePatientUI(patient) {
  const $ = (id) => document.getElementById(id);

  $("patient-name").innerText = patient.fullName || "Patient";
  $("patient-fullName").innerText = patient.fullName || "N/A";
  $("patient-email").innerText = patient.email || "N/A";
  $("patient-phone").innerText = patient.phoneNumber || "N/A";
  $("patient-age").innerText = patient.age || "N/A";
  $("patient-bloodGroup").innerText = patient.bloodGroup || "N/A";
  $("patient-address").innerText = patient.address || "N/A";
  $("patient-blood-type").innerText = patient.bloodType || "N/A";

  if (patient.profilePic) {
    $("profile-picture").src = patient.profilePic;
    $("mobile-header-profile").src = patient.profilePic;
    $("header-profile").src = patient.profilePic;
  }

  $("loading").style.display = "none";
  $("patient-table").style.display = "table";
}

// ✅ Run on page load
document.addEventListener("DOMContentLoaded", loadPatientDetails);
