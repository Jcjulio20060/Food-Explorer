document.addEventListener('DOMContentLoaded', () => {
  const nomeInput = document.getElementById('nome');
  const sobrenomeInput = document.getElementById('sobrenome');
  const cpfInput = document.getElementById('cpf');
  const emailInput = document.getElementById('email');
  const nascimentoInput = document.getElementById('data-nascimento');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmar-senha');
  const saveButton = document.querySelector('.save-button');

  // Obtém o ID do usuário do localStorage
  const userId = localStorage.getItem('userId');

  if (!userId) {
    alert('Nenhum usuário logado. Redirecionando para a página de login.');
    window.location.href = '../login/index.html';
    return;
  }

  // Busca os dados do usuário na API
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados do usuário.');
      }

      const user = await response.json();

      // Preenche os campos com os dados do usuário
      nomeInput.value = user.nome.split(' ')[0] || ''; // Primeiro nome
      sobrenomeInput.value = user.nome.split(' ').slice(1).join(' ') || ''; // Sobrenome
      cpfInput.value = user.cpf || '';
      emailInput.value = user.email || '';
      nascimentoInput.value = user.dataNascimento || '';
    } catch (error) {
      alert(error.message);
      window.location.href = '../login/index.html';
    }
  };

  fetchUserData();

  // Validação e salvamento das alterações
  saveButton.addEventListener('click', async (event) => {
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

    try {
      // Cria o objeto com os dados atualizados
      const updatedUser = {
        nome: `${nomeInput.value.trim()} ${sobrenomeInput.value.trim()}`, // Junta nome e sobrenome
        dataNascimento: nascimentoInput.value.trim(),
        senha: senhaInput.value.trim() || undefined, // Envia a senha apenas se for alterada
      };

      // Envia a requisição para atualizar os dados do usuário
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao atualizar os dados do usuário.');
      }

      alert('Alterações salvas com sucesso!');
      window.location.reload(); // Recarrega a página para exibir os dados atualizados
    } catch (error) {
      alert(error.message);
    }
  });
});