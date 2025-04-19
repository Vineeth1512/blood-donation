import { initFirebase } from "./firebase-config.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
const { db } = initFirebase();

let allDonors = [];

window.deleteDonor = async (id) => {
  if (confirm("Are you sure you want to delete this donor?")) {
    try {
      await deleteDoc(doc(db, "users", id));
      console.log(`Donor with ID ${id} deleted.`);
      // Optionally: Refresh list after deletion
      allDonors = allDonors.filter((d) => d.id !== id);
      renderDonors(allDonors);
    } catch (err) {
      console.log(err);
    }
  }
};

function renderDonors(donors) {
  const donorsContainer = document.querySelector("#donors");
  donorsContainer.innerHTML = "";

  if (donors.length === 0) {
    donorsContainer.innerHTML = "<p>No donors found.</p>";
    return;
  }

  donors.forEach((donor) => {
    donorsContainer.innerHTML += `
<div class="card">
  <div class="top-section">
    <div class="avatar-wrapper">
      <img class="avatar" src="${
        donor.profilePic || "images/default-avatar.png"
      }">
    </div>
    <div class="user-info">
      <h2>${donor.fullName}</h2>
      <p>${donor.address}, India</p>
    </div>
  </div>
  <div class="details">
    <p><span>Blood Group:</span> ${donor.bloodGroup}</p>
    <p><span>Age:</span> ${donor.age}</p>
    <p><span>Email:</span> ${donor.email}</p>
    <p><span>Phone:</span> ${donor.phoneNumber}</p>
    <p><span>Availability:</span> ${donor.availability}</p>
     <p><span>Address:</span> ${donor.address}</p>
  </div>
  <div class="actions">
    <button class="btn delete" onclick="deleteDonor('${
      donor.id
    }')">Delete</button>
  </div>
</div>
`;
  });
}
document.getElementById("generalSearchInput").addEventListener("input", () => {
  const keyword = document
    .getElementById("generalSearchInput")
    .value.toLowerCase();

  const filteredDonors = allDonors.filter((donor) => {
    const combinedString = `
${donor.fullName || ""}
${donor.bloodGroup || ""}
${donor.address || ""}
${donor.availability || ""}
${donor.phoneNumber || ""}
${donor.email || ""}
`.toLowerCase();

    return combinedString.includes(keyword);
  });

  renderDonors(filteredDonors);
});

// 🔄 Fetch and display data
async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const donorsList = [];
    let totalBloodUnits = 0;
    querySnapshot.forEach((docItem) => {
      const data = docItem.data();

      if (data.role === "donor") {
        donorsList.push({ id: docItem.id, ...data });
        console.log(data.fullName, data.units);

        totalBloodUnits += Number(data.units);
      }
    });
    console.log(totalBloodUnits);

    allDonors = donorsList;

    renderDonors(allDonors);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
