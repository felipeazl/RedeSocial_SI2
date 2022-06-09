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

  if ((name.value == "") | (email.value == "") | (password.value == "")) {
    alert("Todos os campos devem ser preenchidos para realizar o cadastro.");
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
    };

    data.push(user);

    localStorage.setItem("userData", JSON.stringify(data));
    alert("Usuário cadastrado. Realize o login para acessar o sistema.");
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
  };

  userList = JSON.parse(localStorage.getItem("userData"));

  if (email.value != "" && password.value != "") {
    userList.forEach((item) => {
      if (email.value == item.email && password.value == item.senha) {
        userValid = {
          nome: item.nome,
          email: item.email,
          senha: item.senha,
        };
      }
    });

    if (email.value == userValid.email && password.value == userValid.senha) {
      alert("funcionou");
      window.location.href = "./pages/home.html";

      let token =
        Math.random().toString(16).substring(2) +
        Math.random().toString(16).substring(2);

      localStorage.setItem("token", token);
      localStorage.setItem("userLoged", JSON.stringify(userValid));
    } else {
      alert("Email ou senha não cadastrados.");
    }
  }
}
