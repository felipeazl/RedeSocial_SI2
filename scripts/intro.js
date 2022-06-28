function alreadyLogged() {
  if (localStorage.getItem("token") != null) {
    window.location.href = "/pages/home.html";
  } else {
    window.location.href = "/pages/user.html";
  }
}
