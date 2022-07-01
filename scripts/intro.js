// Essa função verifica a existencia de um token no localStorage, caso exista o usuário é redirecionado
// diretamente para a tela home, caso ele ainda não tenha um token, ele é mandado para a tela de login/registro
// para poder realizar o login e gerar seu token.
function alreadyLogged() {
  if (localStorage.getItem("token") != null) {
    window.location.href = "/pages/home.html";
  } else {
    window.location.href = "/pages/user.html";
  }
}
