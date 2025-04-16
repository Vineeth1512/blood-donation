function toggleProfileDropdown() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const menu = document.getElementById("profileMenu");
  const profilePic = document.querySelector(".profile-pic");
  if (!profilePic.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = "none";
  }
});

// function logout() {
//   alert("You have been logged out.");
//   // Clear localStorage/sessionStorage if used
//   // Redirect to login page
//   window.location.href = "donor-login.html";
// }
