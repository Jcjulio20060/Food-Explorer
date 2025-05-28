document.addEventListener('DOMContentLoaded', () => {
  const userTableBody = document.querySelector('.user-table tbody');
  const addUserButton = document.querySelector('.add-user-button');
  const modalTitle = document.getElementById('modal-title');
  const userForm = document.getElementById('user-form');
  const userNameInput = document.getElementById('user-name');
  const userEmailInput = document.getElementById('user-email');
  const userCpfInput = document.getElementById('user-cpf');
  const userTypeInput = document.getElementById('user-type');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  let editingUserId = localStorage.getItem('editingUserId');

  // Redirecionar para a página de login ao clicar no botão "Adicionar Usuário"
  addUserButton.addEventListener('click', () => {
    window.location.href = '../../login/index.html'; // Caminho para a página de login
  });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://food-explorer-687u.onrender.com/usuarios', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Erro ao buscar usuários.');
      const users = await response.json();
      renderUsers(users);
    } catch (error) {
      alert(error.message);
    }
  };

  // Função para buscar usuários pelo nome
  const searchUsersByName = async (name) => {
    try {
      const response = await fetch(`https://food-explorer-687u.onrender.com/usuarios/buscar/nome=${name}`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Erro ao buscar usuário pelo nome.');
      const users = await response.json();
      renderUsers(users); // Renderiza os usuários encontrados
    } catch (error) {
      alert(error.message);
    }
  };

  // Adicionar evento ao botão de busca
  searchButton.addEventListener('click', () => {
    const name = searchInput.value.trim();
    if (name) {
      searchUsersByName(name);
    } else {
      alert('Por favor, insira um nome para buscar.');
    }
  });

  // Render users in the table
  const renderUsers = (users) => {
    userTableBody.innerHTML = '';
    users.forEach((user) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td>${user.cpf}</td>
        <td>${user.tipo || 'Não especificado'}</td>
        <td class="actions">
          <button class="edit-button" data-id="${user._id}">Editar</button>
          <button class="delete-button" data-id="${user._id}">Excluir</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  };

  // Redirecionar para a página de conta ao clicar no botão "Editar"
  userTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
      const userId = event.target.dataset.id;

      // Salva o ID do usuário no localStorage
      localStorage.setItem('editingUserId', userId);

      // Redireciona para a página de conta
      window.location.href = '../account/index.html'; // Caminho para a página de conta
    }
  });

  // Delete user
  userTableBody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
      const userId = event.target.dataset.id;
      const confirmDelete = confirm('Tem certeza de que deseja excluir este usuário?');
      if (!confirmDelete) return;

      try {
        const response = await fetch(`https://food-explorer-687u.onrender.com/usuarios/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao excluir usuário.');
        fetchUsers();
      } catch (error) {
        alert(error.message);
      }
    }
  });

  // Create or update user
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userData = {
      nome: userNameInput.value.trim(),
      email: userEmailInput.value.trim(),
      cpf: userCpfInput.value.trim(),
      tipo: userTypeInput.value, // Adiciona o tipo do usuário
    };

    try {
      if (editingUserId) {
        await updateUser(editingUserId, userData);
      } else {
        await createUser(userData);
      }

      closeModal();
      fetchUsers();
    } catch (error) {
      alert(error.message);
    }
  });

  const openModal = (title, user = {}) => {
    modalTitle.textContent = title;
    userNameInput.value = user.nome || '';
    userEmailInput.value = user.email || '';
    userCpfInput.value = user.cpf || '';
    userTypeInput.value = user.tipo || ''; // Preenche o tipo do usuário
    editingUserId = user._id || null;
    modal.classList.remove('hidden');
  };

  // Initial fetch
  fetchUsers();
});