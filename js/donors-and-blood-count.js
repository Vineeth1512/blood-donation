import { initFirebase } from "./firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
const { db } = initFirebase();

// const bloodCount = document.getElementById("donorCount");
// const totalBlood = document.getElementById("bloodCount");

let donorRegisterCount = 0;
let totalCollectedBloodUnits = 0;

async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((docItem) => {
      const data = docItem.data();

      let lastValidUnits = 0; // Keep track of the last valid units

      if (data.role === "donor") {
        console.log(data);
        donorRegisterCount += 1;

        let units = Number(data.units);

        // If units is NaN (missing or invalid), use the last valid units
        if (isNaN(units)) {
          console.warn(`Missing units for donor:`, data);
          units = lastValidUnits; // Reuse previous donor's units
        } else {
          // Update lastValidUnits with the current valid units
          lastValidUnits = units;
        }

        totalCollectedBloodUnits += units;
      }
    });
    animateCount("donorCount", donorRegisterCount, 2000); // 2 seconds
    animateCount("bloodCount", totalCollectedBloodUnits, 2000);
  } catch (err) {
    console.log(err);
  }
}

fetchData();

function animateCount(id, target, duration) {
  const element = document.getElementById(id);
  let start = 0;
  const increment = target / (duration / 10);
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 10);
}
console.log(donorRegisterCount);

//animateCount("donorCount", donorRegisterCount, 2000); // 2 seconds
