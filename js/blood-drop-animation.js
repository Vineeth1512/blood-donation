const numberOfDrops = 40;
for (let i = 0; i < numberOfDrops; i++) {
  const drop = document.createElement("div");
  drop.classList.add("blood-drop");

  // Random left position (horizontal)
  drop.style.left = Math.random() * 100 + "vw";

  // Set top to -36px so it starts just above the viewport
  drop.style.top = "-36px";

  // Random animation delay
  drop.style.animationDelay = Math.random() * 5 + "s";

  // Random animation duration
  drop.style.animationDuration = Math.random() * 2 + 2 + "s";

  // Add SVG inside each drop
  drop.innerHTML = `
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 0C32 0 10 30 10 44C10 55.0457 19.9543 64 32 64C44.0457 64 54 55.0457 54 44C54 30 32 0 32 0Z" fill="#45001e"/>
            <circle cx="42" cy="22" r="5" fill="white" fill-opacity="0.3"/>
        </svg>`;

  document.body.appendChild(drop);
}

// Stop dropping after 10 seconds
setTimeout(() => {
  document.querySelectorAll(".blood-drop").forEach((drop) => {
    drop.style.animation = "none";
    drop.style.opacity = "0";
  });
}, 5000); // stop after 5 seconds
