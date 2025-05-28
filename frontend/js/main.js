/**
 * INICIA O SISTEMA: CHAMA O CARREGAMENTO DOS PRATOS E ATIVA OS EVENTOS
 * Mapeia containers HTML das categorias para inserção dinâmica dos cards.
 * Cada chave representa uma categoria local e é ligada ao seu respectivo container no HTML.
 */
const containersPorCategoria = {
    'destaques': document.getElementById('pratos-container-destaques'),
    'executivos': document.getElementById('pratos-container-executivos'),
    'massas': document.getElementById('pratos-container-massas'),
    'sobremesas': document.getElementById('pratos-container-sobremesas'),
    'bebidas': document.getElementById('pratos-container-bebidas')
};

// Carrega os pratos de cada categoria usando a API externa
carregarPratos(containersPorCategoria);

// Ativa todos os eventos da interface: carrossel, sacola, busca, etc.
inicializarEventos(containersPorCategoria);