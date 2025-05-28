/**
 * CONTROLA A BUSCA POR NOME DE PRATOS FEITA PELO USUARIO
 * Busca pratos na API TheMealDB com base no termo digitado pelo usuário
 * e exibe os resultados dinamicamente na tela, escondendo as seções padrão.
 */
window.searchMeals = async function (query, containersPorCategoria, searchResultsContainer) {
    searchResultsContainer.innerHTML = '';
    searchResultsContainer.style.display = 'block';

    // Oculta as seções principais durante a busca
    for (const key in containersPorCategoria) {
        if (containersPorCategoria[key]) {
            containersPorCategoria[key].closest('.category-content').style.display = 'none';
        }
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.meals) {
            // Exibe título dos resultados
            const searchHeading = document.createElement('h2');
            searchHeading.textContent = `Resultados para "${query}"`;
            searchHeading.style.color = '#ebdd8f';
            searchHeading.style.fontSize = '2em';
            searchHeading.style.marginBottom = '10px';
            searchResultsContainer.appendChild(searchHeading);

            // Cria container de cards encontrados
            const resultsGrid = document.createElement('div');
            resultsGrid.classList.add('pratos-categoria-container');

            const mealsToDisplay = data.meals.slice(0, 12);
            mealsToDisplay.forEach(meal => {
                const categoriaTheMealDB = meal.strCategory;
                const categoriaLocal = window.mapeamentoCategorias[categoriaTheMealDB] || 'executivos';
                const card = window.criarCardPrato(meal, categoriaLocal, window.addToCart);
                resultsGrid.appendChild(card);
            });

            searchResultsContainer.appendChild(resultsGrid);
        } else {
            // Exibe mensagem se não encontrar nenhum prato
            const noResults = document.createElement('p');
            noResults.textContent = `Nenhum prato encontrado para "${query}".`;
            noResults.style.color = '#CCCCCC';
            noResults.style.fontSize = '1.2em';
            noResults.style.textAlign = 'center';
            searchResultsContainer.appendChild(noResults);
        }
    } catch (error) {
        // Exibe mensagem de erro se a API falhar
        console.error('Erro ao buscar pratos:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Ocorreu um erro ao buscar os pratos. Tente novamente mais tarde.';
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        searchResultsContainer.appendChild(errorMessage);
    }
};

/**
 * Restaura a visualização padrão do site após uma busca.
 */
window.resetView = function (searchResultsContainer, searchInput, containersPorCategoria) {
    if (searchResultsContainer) {
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.style.display = 'none';
    }

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.style.display = 'block';
    }

    // Reexibe as seções principais
    for (const key in containersPorCategoria) {
        if (containersPorCategoria[key]) {
            containersPorCategoria[key].closest('.category-content').style.display = 'block';
        }
    }

    // Limpa o campo de busca
    if (searchInput) {
        searchInput.value = '';
    }
};
