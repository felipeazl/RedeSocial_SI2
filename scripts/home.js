if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar o Stuny.");
  window.location.href = "/pages/user.html";
}

function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLoged");
  window.location.href = "/pages/user.html";
}

let usuario = JSON.parse(localStorage.getItem("userLoged"));

let nome = document.querySelector("#nome");
let universidade = document.querySelector("#universidade");
let curso = document.querySelector("#curso");
let email = document.querySelector("#email");

nome.innerHTML = usuario.nome;
universidade.innerHTML = usuario.faculdade;
curso.innerHTML = usuario.curso;
email.innerHTML = usuario.email;

function addPost() {
  let publicacao = document.getElementById("post");

  let data = JSON.parse(localStorage.getItem("post"));

  if (data == null) {
    localStorage.setItem("post", "[]");
    data = [];
  }

  const post = {
    nome: usuario.nome,
    publicacao: publicacao.value,
  };

  data.push(post);

  localStorage.setItem("post", JSON.stringify(data));

  publicacao.value = "";
}
