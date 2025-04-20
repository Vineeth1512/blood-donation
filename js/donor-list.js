import { initFirebase } from "./firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
const { db } = initFirebase();

document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("patientData");

  if (!userData) {
    alert("No Patient Found, Register please..! ");
    window.location.href = "patient-login.html";
  }
});

let allDonors = [];

async function fetchDonorsFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    allDonors = [];

    querySnapshot.forEach((docSnap) => {
      const userData = docSnap.data();
      if (userData.role === "donor") {
        allDonors.push({ id: docSnap.id, ...userData });
      }
    });

    renderDonorTable(allDonors);
  } catch (error) {
    console.error("Error fetching donors:", error);
  }
}

function renderDonorTable(donors) {
  const donorsContainer = document.getElementById("donors");

  if (!donors || donors.length === 0) {
    donorsContainer.innerHTML = "<p>No donors found.</p>";
    return;
  }

  let html = `
        <div style="overflow-x:auto;">
            <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse; background: white;">
                <thead style="background-color: #7b1337; color: white;">
                    <tr>
                        <th>Name</th>
                        <th>Blood Group</th>
                        <th>Location</th>
                        <th>Availability</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
    `;

  donors.forEach((donor) => {
    const available =
      donor.availability === "Available" || donor.availability === true;
    const availabilityText = available ? "Available" : "Unavailable";
    const color = available ? "green" : "#7b1337";

    html += `
            <tr>
                <td>${donor.fullName || "N/A"}</td>
                <td>${donor.bloodGroup || "N/A"}</td>
                <td>${donor.address || "N/A"}</td>
                <td style="color: ${color}; font-weight: bold;">${availabilityText}</td>
                <td>
                    <button class="request-btn" ${
                      !available ? "disabled" : ""
                    } onclick="window.location.href='tel:${
      donor.phoneNumber || ""
    }'">Request to Call</button>
                </td>
            </tr>
        `;
  });

  html += `</tbody></table></div>`;
  donorsContainer.innerHTML = html;
}

// Search filter function
function searchDonors() {
  const locationVal = document
    .getElementById("locationInput")
    .value.toLowerCase();
  const bloodGroupVal = document.getElementById("bloodGroupSelect").value;

  const filtered = allDonors.filter((donor) => {
    const matchLocation =
      donor.address?.toLowerCase().includes(locationVal) ?? false;
    const matchBlood = !bloodGroupVal || donor.bloodGroup === bloodGroupVal;

    return (!locationVal || matchLocation) && matchBlood;
  });

  renderDonorTable(filtered);
}

// Bind search inputs
function attachSearchListeners() {
  document
    .getElementById("locationInput")
    .addEventListener("input", searchDonors);
  document
    .getElementById("bloodGroupSelect")
    .addEventListener("change", searchDonors);
}

// Profile pic display (optional)
function setProfileImage() {
  const patientData = JSON.parse(localStorage.getItem("patientData"));
  if (patientData && patientData.profilePic) {
    const profileImg = document.getElementById("header-profile");
    const mobileViewProfileImg = document.getElementById(
      "mobile-header-profile"
    );
    if (profileImg && mobileViewProfileImg) {
      profileImg.src = patientData.profilePic;
      mobileViewProfileImg.src = patientData.profilePic;
    }
  }
}

// Initialization
function initPage() {
  fetchDonorsFromFirestore();
  attachSearchListeners();
  setProfileImage();
}

initPage();
