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

//Ainda não está funcionando
function userLogin() {
  let login_email = document.getElementById("email-login");
  let login_password = document.getElementById("password-login");

  const user_login = {
    email: login_email.value,
    senha: login_password.value,
  };

  let storage = JSON.parse(localStorage.getItem("userData"));

  storage.map((storageData) => {
    for (var i = 0; i < localStorage.length; i++) {
      if (
        storageData.email === user_login.email &&
        storageData.senha === user_login.senha
      ) {
        return true;
      } else {
        return false;
      }
    }
  });
}
