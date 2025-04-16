document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80, // Adjust for fixed header
      behavior: "smooth",
    });
  });
});
