const donationDetails = {
  rbc: {
    what: "Blood collected straight from the donor into a blood bag and mixed with an anticoagulant is called whole blood. It is then centrifuged to separate red cells, which are mixed with a preservative to be called packed red blood cells.",
    who: "You need to be 18–65 years old, weigh 45 kg or more, and be fit and healthy.",
    usedFor: "Used for anemia, blood loss, and surgical patients.",
    image:
      "https://res.cloudinary.com/dlrvxuntz/image/upload/v1744529061/e64kedgfltmsqdutthr5.jpg",
  },
  plasma: {
    what: "Plasma is the liquid portion of the blood that carries cells and proteins throughout the body. It's separated from whole blood donation or via apheresis.",
    who: "Healthy individuals aged 18-65, typically with high plasma volume.",
    usedFor:
      "Used for patients with liver conditions, burns, and severe infections.",
    image:
      "https://res.cloudinary.com/dlrvxuntz/image/upload/v1744529061/e64kedgfltmsqdutthr5.jpg",
  },
  platelets: {
    what: "Platelets are cells that help blood clot. Donated via apheresis, they are critical for cancer patients, transplant recipients, and surgeries.",
    who: "Same as whole blood donors, but stricter conditions may apply. No aspirin 48 hours prior.",
    usedFor:
      "Used for cancer patients, transplant, trauma, and surgery patients.",
    image:
      "https://res.cloudinary.com/dlrvxuntz/image/upload/v1744529061/e64kedgfltmsqdutthr5.jpg",
  },
};

function showDonationType(type) {
  const data = donationDetails[type];
  document.getElementById("donation-what").textContent = data.what;
  document.getElementById("donation-who").textContent = data.who;
  document.getElementById("donation-used-for").textContent = data.usedFor;
  //document.getElementById("donation-image").src = data.image;

  document
    .querySelectorAll(".donation-tab-btn")
    .forEach((tab) => tab.classList.remove("active"));
  const btn = [...document.querySelectorAll(".donation-tab-btn")].find((btn) =>
    btn.textContent.toLowerCase().includes(type.includes("rbc") ? "red" : type)
  );
  if (btn) btn.classList.add("active");
}

// Load default
showDonationType("rbc");
