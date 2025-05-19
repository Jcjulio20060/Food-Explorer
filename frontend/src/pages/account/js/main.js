document.addEventListener('DOMContentLoaded', () => {
  const nomeInput = document.getElementById('nome');
  const sobrenomeInput = document.getElementById('sobrenome');
  const cpfInput = document.getElementById('cpf');
  const emailInput = document.getElementById('email');
  const nascimentoInput = document.getElementById('data-nascimento');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmar-senha');
  const saveButton = document.querySelector('.save-button');

  // Carrega os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    nomeInput.value = user.name || '';
    sobrenomeInput.value = user.surname || '';
    cpfInput.value = user.cpf || '';
    emailInput.value = user.email || '';
    nascimentoInput.value = user.birthDate || '';
  } else {
    alert('Nenhum usuário logado. Redirecionando para a página de login.');
    window.location.href = '../login/index.html';
  }

  // Validação e salvamento das alterações
  saveButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita o envio do formulário

    let hasError = false;

    // Valida Nome
    if (nomeInput.value.trim() === '') {
      alert('Por favor, insira seu nome.');
      hasError = true;
    }

    // Valida Sobrenome
    if (sobrenomeInput.value.trim() === '') {
      alert('Por favor, insira seu sobrenome.');
      hasError = true;
    }

    // Valida Data de Nascimento
    if (nascimentoInput.value.trim() === '') {
      alert('Por favor, insira sua data de nascimento.');
      hasError = true;
    }

    // Valida Senha
    if (senhaInput.value.trim() !== '' || confirmarSenhaInput.value.trim() !== '') {
      if (senhaInput.value !== confirmarSenhaInput.value) {
        alert('As senhas não coincidem.');
        hasError = true;
      }
    }

    // Se houver erros, não prossegue
    if (hasError) return;

    // Atualiza os dados do usuário
    const updatedUser = {
      ...user,
      name: nomeInput.value.trim(),
      surname: sobrenomeInput.value.trim(),
      birthDate: nascimentoInput.value.trim(),
      password: senhaInput.value.trim() || user.password, // Mantém a senha antiga se não for alterada
    };

    // Salva os dados atualizados no localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    alert('Alterações salvas com sucesso!');
  });
});