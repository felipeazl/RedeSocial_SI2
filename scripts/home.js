function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLoged");
  window.location.href = "/pages/user.html";
}
