//Caso o usuario não tenha um token, ele não pode acessar a pagina home pela url.
if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar o Stuny.");
  window.location.href = "/pages/user.html";
}

//A função de logout remove o token o os dados do usuario logado do localStorage
//e redireciona o usuario para a tela de login/registro.
function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLoged");
  window.location.href = "/pages/user.html";
}

//Chama os dados do usuario logado do localStorage e armazena em uma variável.
let usuario = JSON.parse(localStorage.getItem("userLoged"));

let nome = document.querySelector("#nome");
let universidade = document.querySelector("#universidade");
let curso = document.querySelector("#curso");
let email = document.querySelector("#email");
//Atera o HTML da página para exibir as informações do usuario logado.
nome.innerHTML = usuario.nome;
universidade.innerHTML = usuario.faculdade;
curso.innerHTML = usuario.curso;
email.innerHTML = usuario.email;

let nome_mobile = document.querySelector(".nome-mobile");
let universidade_mobile = document.querySelector("#universidade-mobile");
let curso_mobile = document.querySelector("#curso-mobile");
let email_mobile = document.querySelector("#email-mobile");
//Atera o HTML da página para exibir as informações do usuario logado. SOMENTE NO MOBILE.
nome_mobile.innerHTML = usuario.nome;
universidade_mobile.innerHTML = usuario.faculdade;
curso_mobile.innerHTML = usuario.curso;
email_mobile.innerHTML = usuario.email;

//Função para criar uma postagem no sistema.
function addPost() {
  //Armazena em uma variável a mensagem digitada pelo usuario.
  let publicacao = document.getElementById("post");
  //Cria uma chave post no localStorage, para armzenar um array de objetos com as postagens.
  let data = JSON.parse(localStorage.getItem("post"));
  if (data == null) {
    localStorage.setItem("post", "[]");
    data = [];
  }

  //Cria o objeto post.
  const post = {
    nome: usuario.nome,
    publicacao: publicacao.value,
  };

  //Armazena a postagem no localStorage.
  data.push(post);
  localStorage.setItem("post", JSON.stringify(data));

  //Limpa campo de input da mensagem.
  publicacao.value = "";
  //Chama a função que exibe as postagens no localStorage.
  showPosts();
}

//Função que exibe os posts salvos no localStorage.
//Ela é ativada sempre que uma nova publicação é feite ou sempre que a página é carregada.
function showPosts() {
  let card = document.querySelector("#dinamic_card");
  //Chama os array com as postagens e armazena em uma variável.
  let post_storage = JSON.parse(localStorage.getItem("post")) || [];

  dinamic_card.innerHTML = "";

  //Percorre todas as postagens e, para cada uma, gera um HTML e salva a sua posição.
  post_storage.forEach((item) => {
    const content = document.createElement("div");
    const pos = post_storage.indexOf(item);

    //HTML gerado para cada postagem
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
          <button class="like-btn"><i class="fa fa-heart" aria-hidden="true" ></i></button>
          <button class="remove-btn" onClick="removePost(${pos})">Deletar</button>
        </div>
      </div>
    </div>`;

    //Adiciona o html gerado na página.
    dinamic_card.appendChild(content);
  });
}

//Função de remover postagens.
//Recebe a posiçao da postagem para saber exatamente qual deletar.
function removePost(pos) {
  let post_storage = JSON.parse(localStorage.getItem("post")) || [];
  post_storage.splice(pos, 1);
  localStorage.setItem("post", JSON.stringify(post_storage));
  showPosts();
}

//Altera a visibilidade dos dados, SOMENTE NO MOBILE.
//Ao clicar no nome do usuario que está logado são exibidas as demais
//informações de registro.
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
