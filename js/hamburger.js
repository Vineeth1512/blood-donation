document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".hamburger").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.toggle("active");
  });

  document
    .querySelector(".mobile-menu .dropdown > a")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let dropdownMenu = this.nextElementSibling;
      dropdownMenu.classList.toggle("active");
    });
});
/** 
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const dropdownToggle = document.querySelector(".mobile-menu .dropdown > a");
  const dropdownMenu = document.querySelector(".mobile-dropdown-menu");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  // Toggle dropdown inside mobile menu
  dropdownToggle.addEventListener("click", function (event) {
    event.preventDefault();
    dropdownMenu.classList.toggle("active");
  });

  // Close mobile menu and dropdown if clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      mobileMenu.classList.remove("active");
      dropdownMenu.classList.remove("active");
    }
  });
});
*/
