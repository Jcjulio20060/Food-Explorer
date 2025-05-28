document.addEventListener('DOMContentLoaded', () => {
  const foodTableBody = document.querySelector('.food-table tbody');
  const addFoodButton = document.querySelector('.add-food-button');
  const modal = document.querySelector('.modal');
  const modalTitle = document.getElementById('modal-title');
  const foodForm = document.getElementById('food-form');
  const foodNameInput = document.getElementById('food-name');
  const foodDescriptionInput = document.getElementById('food-description');
  const foodPriceInput = document.getElementById('food-price');
  const foodImageInput = document.getElementById('food-image');
  const foodCategoryInput = document.getElementById('food-category'); // Adiciona o campo de categoria
  const cancelButton = document.querySelector('.cancel-button');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  let editingFoodId = null;

  // Fetch foods from API
  const fetchFoods = async () => {
    try {
      const response = await fetch('https://food-explorer-687u.onrender.com/pratos', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Erro ao buscar alimentos.');
      const foods = await response.json();
      renderFoods(foods);
    } catch (error) {
      alert(error.message);
    }
  };

  // Função para buscar pratos pelo nome
  const searchFoodsByName = async (name) => {
    try {
      const response = await fetch(`https://food-explorer-687u.onrender.com/pratos/nome/${name}`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Erro ao buscar pratos pelo nome.');
      const foods = await response.json();
      renderFoods(foods);
    } catch (error) {
      alert(error.message);
    }
  };

  // Render foods in the table
  const renderFoods = (foods) => {
    foodTableBody.innerHTML = '';
    foods.forEach((food) => {
      const price = typeof food.preco === 'number' ? food.preco.toFixed(2) : '0.00';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${food.imagemUrl}" alt="${food.nome}" style="width: 50px; height: 50px; object-fit: cover;"></td>
        <td>${food.nome}</td>
        <td>${food.descricao}</td>
        <td>${food.categoria || 'Sem Categoria'}</td>
        <td>R$ ${price}</td>
        <td class="actions">
          <button class="edit-button" data-id="${food._id}">Editar</button>
          <button class="delete-button" data-id="${food._id}">Excluir</button>
        </td>
      `;
      foodTableBody.appendChild(row);
    });
  };

  // Open modal
  const openModal = (title, food = {}) => {
    modalTitle.textContent = title;
    foodNameInput.value = food.nome || '';
    foodDescriptionInput.value = food.descricao || '';
    foodPriceInput.value = food.preco || '';
    foodImageInput.value = food.imagemUrl || '';
    foodCategoryInput.value = food.categoria || ''; // Preenche a categoria
    editingFoodId = food._id || null;
    modal.classList.remove('hidden');
  };

  // Close modal
  const closeModal = () => {
    modal.classList.add('hidden');
    foodForm.reset();
    editingFoodId = null;
  };

  // Save food
  foodForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Cria o objeto com os dados do alimento
    const foodData = {
      nome: foodNameInput.value.trim(),
      descricao: foodDescriptionInput.value.trim(),
      preco: parseFloat(foodPriceInput.value),
      imagemUrl: foodImageInput.value.trim(),
      categoria: foodCategoryInput.value, // Adiciona a categoria
    };

    try {
      if (editingFoodId) {
        // Lógica para editar o alimento (PUT)
        await updateFood(editingFoodId, foodData);
      } else {
        // Lógica para criar um novo alimento (POST)
        await createFood(foodData);
      }

      // Fecha o modal e atualiza a lista de alimentos
      closeModal();
      fetchFoods();
    } catch (error) {
      alert(error.message);
    }
  });

  // Função para criar um novo alimento (POST)
  const createFood = async (foodData) => {
    // Validação dos dados do alimento
    if (!foodData.nome || !foodData.descricao || isNaN(foodData.preco) || !foodData.imagemUrl || !foodData.categoria) {
      throw new Error('Todos os campos são obrigatórios e o preço deve ser um número válido.');
    }

    const response = await fetch('https://food-explorer-687u.onrender.com/pratos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodData),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar alimento.');
    }
  };

  // Função para editar um alimento existente (PUT)
  const updateFood = async (id, foodData) => {
    const response = await fetch(`https://food-explorer-687u.onrender.com/pratos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodData),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar alimento.');
    }
  };

  // Delete food
  foodTableBody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
      const foodId = event.target.dataset.id;
      const confirmDelete = confirm('Tem certeza de que deseja excluir este alimento?');
      if (!confirmDelete) return;

      try {
        const response = await fetch(`https://food-explorer-687u.onrender.com/pratos/${foodId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao excluir alimento.');
        fetchFoods();
      } catch (error) {
        alert(error.message);
      }
    }

    if (event.target.classList.contains('edit-button')) {
      const foodId = event.target.dataset.id;
      try {
        const response = await fetch(`https://food-explorer-687u.onrender.com/pratos/${foodId}`, {
          method: 'GET',
        });
        if (!response.ok) throw new Error('Erro ao buscar alimento para edição.');
        const food = await response.json();
        openModal('Editar Alimento', food);
      } catch (error) {
        alert(error.message);
      }
    }
  });

  // Adicionar evento ao botão de busca
  searchButton.addEventListener('click', () => {
    const name = searchInput.value.trim();
    if (name) {
      searchFoodsByName(name);
    } else {
      alert('Por favor, insira um nome para buscar.');
    }
  });

  // Event listeners
  addFoodButton.addEventListener('click', () => openModal('Adicionar Alimento'));
  cancelButton.addEventListener('click', closeModal);

  // Initial fetch
  fetchFoods();
});