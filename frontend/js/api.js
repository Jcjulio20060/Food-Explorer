/**
 * Carrega os pratos da API externa e insere no HTML
 * Carrega todas as categorias da API TheMealDB e renderiza os pratos
 * de cada categoria nos seus respectivos containers da página.
 */
window.carregarPratos = function (containersPorCategoria) {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then(response => response.json())
        .then(categoriasData => {
            if (!categoriasData.meals) {
                console.error('Nenhuma categoria encontrada na API TheMealDB.');
                return;
            }

            categoriasData.meals.forEach(categoria => {
                const categoriaAPI = categoria.strCategory;
                const categoriaLocal = window.mapeamentoCategorias[categoriaAPI];

                // Só continua se a categoria estiver mapeada e o container existir
                if (categoriaLocal && containersPorCategoria[categoriaLocal]) {
                    const container = containersPorCategoria[categoriaLocal];
                    container.innerHTML = '';

                    // Busca os pratos da categoria
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaAPI}`)
                        .then(response => response.json())
                        .then(pratosData => {
                            if (!pratosData.meals) {
                                console.warn(`Nenhum prato encontrado para a categoria '${categoriaAPI}'.`);
                                return;
                            }

                            // Seleciona os primeiros 6 pratos e gera os cards
                            const pratosParaExibir = pratosData.meals.slice(0, 6);
                            pratosParaExibir.forEach(prato => {
                                const card = window.criarCardPrato(prato, categoriaLocal, window.addToCart);
                                container.appendChild(card);
                            });
                        })
                        .catch(error => console.error(`Erro ao buscar pratos da categoria '${categoriaAPI}':`, error));
                } else {
                    console.warn(`Categoria '${categoriaAPI}' não mapeada ou container não encontrado.`);
                }
            });
        })
        .catch(error => console.error('Erro ao buscar categorias principais da TheMealDB:', error));
};
