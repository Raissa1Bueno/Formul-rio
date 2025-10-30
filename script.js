const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // impede envio automático
  checkForm();
});

function checkForm() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmationValue = passwordConfirmation.value.trim();

  // Nome do usuário
  if (usernameValue === "") {
    errorInput(username, "O nome de usuário é obrigatório!");
  } else {
    successInput(username);
  }

  // E-mail
  if (emailValue === "") {
    errorInput(email, "O email é obrigatório!");
  } else if (!checkEmail(emailValue)) {
    errorInput(email, "Por favor, insira um email válido!");
  } else {
    successInput(email);
  }

  // Senha
  if (passwordValue === "") {
    errorInput(password, "A senha é obrigatória!");
  } else if (passwordValue.length < 6) {
    errorInput(password, "A senha deve ter pelo menos 6 caracteres!");
  } else {
    successInput(password);
  }
  / Confirmação de senha
  if (passwordConfirmationValue === "") {
    errorInput(passwordConfirmation, "Confirme sua senha!");
  } else if (passwordConfirmationValue !== passwordValue) {
    errorInput(passwordConfirmation, "As senhas não conferem!");
  } else {
    successInput(passwordConfirmation);
  }

  // Se tudo estiver ok
  const formControls = form.querySelectorAll(".form-content");
  const formIsValid = [...formControls].every((formControl) => {
    return formControl.classList.contains("success");
  });

  if (formIsValid) {
    alert("Cadastro realizado com sucesso!");
    form.reset(); // limpa o formulário
    formControls.forEach(fc => fc.classList.remove("success"));
  }
}

// Função de erro
function errorInput(input, message) {
  const formContent = input.parentElement;
  const a = formContent.querySelector("a");

  a.innerText = message;
  formContent.className = "form-content error";
}

// Função de sucesso
function successInput(input) {
  const formContent = input.parentElement;
  formContent.className = "form-content success";
}

// Função para validar o email
function checkEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}