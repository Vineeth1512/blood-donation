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

      if (data.role === "donor") {
        console.log(data);
        donorRegisterCount += 1;
        totalCollectedBloodUnits += Number(data.units);
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
