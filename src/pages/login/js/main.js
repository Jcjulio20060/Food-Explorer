import users from '../../../config/users.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  const cpfInput = document.getElementById('cpf');
  const passwordInput = document.getElementById('password');
  const cpfError = document.getElementById('cpf-error');
  const passwordError = document.getElementById('password-error');
  const togglePasswordButton = document.querySelector('.fa-eye');

  // Máscara para o CPF
  cpfInput.addEventListener('input', () => {
    let cpf = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limita o CPF a no máximo 11 dígitos
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11);
    }

    // Aplica a máscara de formatação
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    cpfInput.value = cpf;

    // Remove mensagem de erro ao digitar
    if (cpf.length === 14) {
      cpfError.style.display = 'none';
    }
  });

  // Alternar visibilidade da senha
  togglePasswordButton.addEventListener('click', () => {
    const isPasswordVisible = passwordInput.type === 'text';
    passwordInput.type = isPasswordVisible ? 'password' : 'text';
    togglePasswordButton.classList.toggle('fa-eye-slash', !isPasswordVisible);
    togglePasswordButton.classList.toggle('fa-eye', isPasswordVisible);
  });

  // Validação do formulário
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const cpf = cpfInput.value.trim();
    const password = passwordInput.value.trim();
    let hasError = false;

    // Valida CPF
    if (cpf.length !== 14) { // CPF deve ter 14 caracteres (incluindo máscara)
      cpfError.textContent = 'Por favor, insira um CPF válido.';
      cpfError.style.display = 'block';
      hasError = true;
    } else {
      cpfError.style.display = 'none';
    }

    // Valida Senha
    if (password.length === 0) {
      passwordError.textContent = 'Por favor, insira sua senha.';
      passwordError.style.display = 'block';
      hasError = true;
    } else {
      passwordError.style.display = 'none';
    }

    // Se houver erros, não prossegue
    if (hasError) return;

    // Valida se o CPF e a senha correspondem a um usuário
    const user = users.find((user) => user.cpf === cpf && user.password === password);

    if (user) {
      // Armazena o ID do usuário no localStorage
      localStorage.setItem('userId', user.id);

      // Armazena o objeto completo do usuário no localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redireciona para a página principal
      window.location.href = '../../../../index.html';
    } else {
      cpfError.textContent = 'CPF ou senha inválidos.';
      cpfError.style.display = 'block';
    }
  });
});