document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('form');
  const nomeInput = document.getElementById('nome');
  const sobrenomeInput = document.getElementById('sobrenome');
  const cpfInput = document.getElementById('cpf');
  const nascimentoInput = document.getElementById('data-nascimento');
  const emailInput = document.getElementById('email');
  const confirmarEmailInput = document.getElementById('confirmar-email');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmar-senha');

  const nomeError = document.getElementById('nome-error');
  const sobrenomeError = document.getElementById('sobrenome-error');
  const cpfError = document.getElementById('cpf-error');
  const nascimentoError = document.getElementById('data-nascimento-error');
  const emailError = document.getElementById('email-error');
  const confirmarEmailError = document.getElementById('confirmar-email-error');
  const senhaError = document.getElementById('senha-error');
  const confirmarSenhaError = document.getElementById('confirmar-senha-error');

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

  // Validação do formulário
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio do formulário

    let hasError = false;

    // Valida Nome
    if (nomeInput.value.trim() === '') {
      nomeError.textContent = 'Por favor, insira seu nome.';
      nomeError.style.display = 'block';
      hasError = true;
    } else {
      nomeError.style.display = 'none';
    }

    // Valida Sobrenome
    if (sobrenomeInput.value.trim() === '') {
      sobrenomeError.textContent = 'Por favor, insira seu sobrenome.';
      sobrenomeError.style.display = 'block';
      hasError = true;
    } else {
      sobrenomeError.style.display = 'none';
    }

    // Valida CPF
    if (cpfInput.value.trim().length !== 14) { // CPF deve ter 14 caracteres (incluindo máscara)
      cpfError.textContent = 'Por favor, insira um CPF válido.';
      cpfError.style.display = 'block';
      hasError = true;
    } else {
      cpfError.style.display = 'none';
    }

    // Valida Data de Nascimento
    if (nascimentoInput.value.trim() === '') {
      nascimentoError.textContent = 'Por favor, insira sua data de nascimento.';
      nascimentoError.style.display = 'block';
      hasError = true;
    } else {
      nascimentoError.style.display = 'none';
    }

    // Valida Email
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Por favor, insira seu email.';
      emailError.style.display = 'block';
      hasError = true;
    } else if (emailInput.value !== confirmarEmailInput.value) {
      confirmarEmailError.textContent = 'Os emails não coincidem.';
      confirmarEmailError.style.display = 'block';
      hasError = true;
    } else {
      emailError.style.display = 'none';
      confirmarEmailError.style.display = 'none';
    }

    // Valida Senha
    if (senhaInput.value.trim() === '') {
      senhaError.textContent = 'Por favor, insira sua senha.';
      senhaError.style.display = 'block';
      hasError = true;
    } else if (senhaInput.value !== confirmarSenhaInput.value) {
      confirmarSenhaError.textContent = 'As senhas não coincidem.';
      confirmarSenhaError.style.display = 'block';
      hasError = true;
    } else {
      senhaError.style.display = 'none';
      confirmarSenhaError.style.display = 'none';
    }

    // Se houver erros, não prossegue
    if (hasError) return;

    try {
      // Cria o objeto do usuário com nome completo
      const newUser = {
        nome: `${nomeInput.value.trim()} ${sobrenomeInput.value.trim()}`, // Junta nome e sobrenome
        cpf: cpfInput.value.replace(/\D/g, ''), // Remove a máscara do CPF
        dateBirth: nascimentoInput.value.trim(),
        email: emailInput.value.trim(),
        senha: senhaInput.value.trim(),
      };

      // Envia a requisição para a API
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao cadastrar usuário.');
      }

      alert('Usuário cadastrado com sucesso!');
      window.location.href = '../login/index.html'; // Redireciona para a página de login
    } catch (error) {
      alert(error.message);
    }
  });
});