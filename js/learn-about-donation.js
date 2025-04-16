const bloodData = {
  "A+": { take: "O+ O- A+ A-", give: "A+ AB+" },
  "O+": { take: "O+ O-", give: "A+ B+ AB+ O+" },
  "B+": { take: "O+ O- B+ B-", give: "B+ AB+" },
  "AB+": { take: "All Blood Types", give: "AB+" },
  "A-": { take: "O- A-", give: "A+ A- AB+ AB-" },
  "O-": { take: "O-", give: "All Blood Types" },
  "B-": { take: "O- B-", give: "B+ B- AB+ AB-" },
  "AB-": { take: "A- B- AB- O-", give: "AB+ AB-" },
};
function updateInfo(type) {
  // Get the individual blood types from the data
  const takeFromList = bloodData[type].take.split(" ");
  const giveToList = bloodData[type].give.split(" ");

  // Update the 'take-from' section with individual spans
  const takeFromContainer = document.getElementById("take-from");
  takeFromContainer.innerHTML = ""; // Clear existing content
  takeFromList.forEach((bloodType) => {
    const span = document.createElement("span");
    span.textContent = bloodType;
    span.classList.add("blood-group");
    takeFromContainer.appendChild(span);
  });

  // Update the 'give-to' section with individual spans
  const giveToContainer = document.getElementById("give-to");
  giveToContainer.innerHTML = ""; // Clear existing content
  giveToList.forEach((bloodType) => {
    const span = document.createElement("span");
    span.textContent = bloodType;
    span.classList.add("blood-group");
    giveToContainer.appendChild(span);
  });

  // Update active state on the buttons
  document.querySelectorAll(".blood-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent === type) {
      btn.classList.add("active");
    }
  });
}
