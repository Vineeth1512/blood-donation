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

animateCount("donorCount", 12, 2000); // 2 seconds
animateCount("bloodCount", 32, 2000);
