import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { initFirebase } from "./firebase-config.js";

const { db } = initFirebase();

window.editDonor = () => {
  console.log("Edit button clicked");

  let donorData = JSON.parse(localStorage.getItem("DonorData"));
  if (donorData && donorData.id) {
    window.location.href = `donor-edit.html?id=${donorData.id}`;
  } else {
    alert("Error: Donor data not found.");
  }
};

// Function to display the donor details
const displayDonorDetails = (donor) => {
  document.getElementById("donor-name").innerText = donor.fullName || "Donor";
  document.getElementById("donor-fullName").innerText = donor.fullName || "N/A";
  document.getElementById("donor-email").innerText = donor.email || "N/A";
  document.getElementById("donor-phone").innerText = donor.phoneNumber || "N/A";
  document.getElementById("donor-age").innerText = donor.age || "N/A";
  document.getElementById("donor-bloodGroup").innerText =
    donor.bloodGroup || "N/A";
  document.getElementById("donor-address").innerText = donor.address || "N/A";
  document.getElementById("donor-lastDonation").innerText =
    donor.lastDonation || "N/A";
  document.getElementById("donor-availability").innerText =
    donor.availability || "N/A";

  // Set profile pictures if available
  const profilePic = donor.profilePic || "default-profile.png"; // Add a default image as fallback
  document.getElementById("profile-pic").src = profilePic;
  document.getElementById("header-profile").src = profilePic;
  document.getElementById("mobile-header-profile").src = profilePic;
};

// Function to fetch donor data from Firestore
const fetchDonorData = async (donorId) => {
  const donorRef = doc(db, "users", donorId);

  try {
    const docSnap = await getDoc(donorRef);

    if (docSnap.exists()) {
      const donor = docSnap.data();
      console.log(donor);
      displayDonorDetails(donor); // Display donor data on the page

      // Hide loading spinner and show donor table
      document.getElementById("loading").style.display = "none";
      document.getElementById("donor-table").style.display = "table";
    } else {
      alert("Donor not found.");
      window.location.href = "register.html";
    }
  } catch (error) {
    console.error("Error fetching donor data:", error);
    alert("An error occurred. Please try again later.");
  }
};

// Function to check if donor data exists in localStorage and fetch it
const checkDonorData = () => {
  let donorData = JSON.parse(localStorage.getItem("DonorData"));

  if (!donorData || !donorData.id) {
    alert("Error: Donor data not found. Please register again.");
    window.location.href = "donor-register.html";
    return;
  }

  fetchDonorData(donorData.id);
};

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", checkDonorData);
