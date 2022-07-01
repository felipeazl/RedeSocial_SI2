// Essa função serve para alterar a exibição da tela de login/registro.
// Ela espera um click no texto indicado ao usuário para realizar a seleção.
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#register");

  // Essa função troca da tela de login para a tela de registro
  document.querySelector("#linkRegister").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    createAccountForm.classList.remove("form--hidden");
  });

  // Essa função troca da tela de registro para a tela de login
  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });
});

// Função para realizar o registro do usuário no localStorage.
function registerUser() {
  // Primeiro é coletado todos os dados de input e adicionados a uma variável.
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirm-password");
  let faculdade = document.getElementById("faculdade");
  let curso = document.getElementById("curso");

  // Verifica se todos os campos estão preenchidos, caso estejam, continua a função.
  // Caso não estejam preenchidos, alerta o usuário.
  if (
    (name.value == "") |
    (email.value == "") |
    (password.value == "") |
    (confirmPassword.value == "") |
    (curso.value == "") |
    (faculdade.value == "")
  ) {
    alert("Todos os campos devem ser preenchidos para realizar o cadastro.");
  } else {
    //Verifica se a senha e a confirmação de senha estão iguais.
    //Caso não estejam, alerta o usuário.
    if (password.value != confirmPassword.value) {
      alert("As senhas devem ser iguais.");
    } else {
      //Cria o userData, que é a chave no localStorage que armazena um array de objetos, "data",
      //com todos os usuário cadastrados.
      let data = JSON.parse(localStorage.getItem("userData"));
      if (data == null) {
        localStorage.setItem("userData", "[]");
        data = [];
      }

      //Salva os dados que o usuario digita em um objeto "user".
      const user = {
        nome: name.value,
        email: email.value,
        senha: password.value,
        confsenha: confirmPassword.value,
        faculdade: faculdade.value,
        curso: curso.value,
      };

      //Adiciona o objeto "user", no array "data".
      data.push(user);

      //Salva o array "data" no localStorage e alerta o usuário que o cadastro foi bem sucedido.
      localStorage.setItem("userData", JSON.stringify(data));
      alert("Usuário cadastrado. Realize o login para acessar o sistema.");
    }
  }
}

//Função que realiza o login do usuário.
function userLogin() {
  //Primeiro lê os dados digitados pelo usuário e armazena em variáveis.
  let email = document.getElementById("userEmail");
  let password = document.getElementById("userPassword");
  let userList = [];

  //Cria um objeto para armazenar os dados do usuário que realizar o login.
  let userValid = {
    nome: "",
    email: "",
    senha: "",
    confsenha: "",
    faculdade: "",
    curso: "",
  };

  //Chama os dados de registro do localStorage e salva em uma variável.
  userList = JSON.parse(localStorage.getItem("userData"));

  //Verfica se o email e a senha digitados pelo usuário não estão vazios.
  if (email.value != "" && password.value != "") {
    //A função forEach percorre os dados de registro do localStorage e percorre um objeto de cada vez.
    userList.forEach((item) => {
      //Caso os dados de login digitados pelo usuário sejam iguais aos que estão no localStorage.
      //Todos os dados desse usuário que estão no localStorage são armazenados em um outro objeto.
      if (email.value == item.email && password.value == item.senha) {
        userValid = {
          nome: item.nome,
          email: item.email,
          senha: item.senha,
          confsenha: item.confsenha,
          faculdade: item.faculdade,
          curso: item.curso,
        };
      }
    });

    //Cria um token caso o login seja feito.
    if (email.value == userValid.email && password.value == userValid.senha) {
      let token =
        Math.random().toString(16).substring(2) +
        Math.random().toString(16).substring(2);

      //Salva o token criado e o objeto com os dados do usuário logado no localStorage.
      localStorage.setItem("token", token);
      localStorage.setItem("userLoged", JSON.stringify(userValid));

      //Redireciona o usuário.
      window.location.href = "/pages/home.html";
      return false;
    } else {
      alert("Email ou senha não cadastrados.");
    }
  }
}
