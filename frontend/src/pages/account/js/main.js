document.addEventListener('DOMContentLoaded', () => {
  const nomeInput = document.getElementById('nome');
  const sobrenomeInput = document.getElementById('sobrenome');
  const cpfInput = document.getElementById('cpf');
  const emailInput = document.getElementById('email');
  const nascimentoInput = document.getElementById('data-nascimento');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmar-senha');
  const saveButton = document.querySelector('.save-button');
  const deleteButton = document.querySelector('.delete-button'); // Botão de deletar conta

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
      if (user.dateBirth) {
        const data = new Date(user.dateBirth);
        nascimentoInput.value = data.toISOString().split('T')[0]; // Formata para YYYY-MM-DD
      } else {
        nascimentoInput.value = '';
      }
    } catch (error) {
      alert(error.message);
      window.location.href = '../login/index.html';
    }
  };

  fetchUserData();

  // Lógica para deletar a conta
  deleteButton.addEventListener('click', async () => {
    const confirmDelete = confirm('Tem certeza de que deseja deletar sua conta? Esta ação não pode ser desfeita.');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao deletar a conta.');
      }

      alert('Conta deletada com sucesso!');
      localStorage.clear(); // Limpa o localStorage
      window.location.href = '../login/index.html'; // Redireciona para a página de login
    } catch (error) {
      alert(error.message);
    }
  });

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

    // Valida E-mail
    if (emailInput.value.trim() === '') {
      alert('Por favor, insira seu e-mail.');
      hasError = true;
    }

    // Valida Senha
    let senha = undefined;
    if (senhaInput.value.trim() !== '' || confirmarSenhaInput.value.trim() !== '') {
      if (senhaInput.value !== confirmarSenhaInput.value) {
        alert('As senhas não coincidem.');
        hasError = true;
      } else {
        senha = senhaInput.value.trim(); // Define a nova senha
      }
    }

    // Se houver erros, não prossegue
    if (hasError) return;

    try {
      // Cria o objeto com os dados atualizados
      const updatedUser = {
        nome: `${nomeInput.value.trim()} ${sobrenomeInput.value.trim()}`, // Junta nome e sobrenome
        dataNascimento: nascimentoInput.value.trim(),
        email: emailInput.value.trim(),
        ...(senha && { senha }), // Inclui a senha apenas se ela for definida
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