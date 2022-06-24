document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#register");

  document.querySelector("#linkRegister").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    createAccountForm.classList.remove("form--hidden");
  });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });
});

function registerUser() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirm-password");
  let faculdade = document.getElementById("faculdade");
  let curso = document.getElementById("curso");

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
    if (password.value != confirmPassword.value) {
      alert("As senhas devem ser iguais.");
    } else {
      let data = JSON.parse(localStorage.getItem("userData"));

      if (data == null) {
        localStorage.setItem("userData", "[]");
        data = [];
      }

      const user = {
        nome: name.value,
        email: email.value,
        senha: password.value,
        confsenha: confirmPassword.value,
        faculdade: faculdade.value,
        curso: curso.value,
      };

      data.push(user);

      localStorage.setItem("userData", JSON.stringify(data));
      alert("Usuário cadastrado. Realize o login para acessar o sistema.");
    }
  }
}

function userLogin() {
  let email = document.getElementById("userEmail");
  let password = document.getElementById("userPassword");
  let userList = [];

  let userValid = {
    nome: "",
    email: "",
    senha: "",
    confsenha: "",
    faculdade: "",
    curso: "",
  };

  userList = JSON.parse(localStorage.getItem("userData"));

  if (email.value != "" && password.value != "") {
    userList.forEach((item) => {
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

    if (email.value == userValid.email && password.value == userValid.senha) {
      let token =
        Math.random().toString(16).substring(2) +
        Math.random().toString(16).substring(2);

      localStorage.setItem("token", token);
      localStorage.setItem("userLoged", JSON.stringify(userValid));

      window.location.href = "/pages/home.html";
      return false;
    } else {
      alert("Email ou senha não cadastrados.");
    }
  }
}
