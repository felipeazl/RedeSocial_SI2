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
  showPosts();
}

function showPosts() {
  let card = document.querySelector("#dinamic_card");
  let post_storage = JSON.parse(localStorage.getItem("post")) || [];

  dinamic_card.innerHTML = "";

  post_storage.forEach((item) => {
    const content = document.createElement("div");
    const pos = post_storage.indexOf(item);

    content.innerHTML = ` <div class="card">
      <div class="card__cover">
        <div class="card_head">
          <div class="card_avatar">
            <img class="avatar__image" src="../images/avatar.png" />
          </div>
          <div class="card_information">
            <h3 id="post-name">${item.nome}</h3>
          </div>
        </div>
      </div>
      <div class="card__content">
        <p id="post-message">${item.publicacao}</p>
        <div class="card__menu">
          <i class="fa fa-heart" aria-hidden="true" ></i>
          <button class="remove-btn" onClick="removePost(${pos})">Deletar</button>
        </div>
      </div>
    </div>`;

    dinamic_card.appendChild(content);
  });
}

function removePost(pos) {
  let post_storage = JSON.parse(localStorage.getItem("post")) || [];
  post_storage.splice(pos, 1);
  localStorage.setItem("post", JSON.stringify(post_storage));
  showPosts();
}
