/**
 * Cria visualmente os cards dos pratos (imagem, nome, descrição, preço)
 * Gera um preço aleatório entre R$ 30 e R$ 120 para exibir nos pratos.
 */
window.gerarPrecoAleatorio = function () {
    const min = 30;
    const max = 120;
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};
/**
 * Retorna uma descrição aleatória de acordo com a categoria local (massas, sobremesas, etc).
 */
window.getDescricaoGenerica = function (categoriaLocal) {
    const descricoes = window.descricoesGenericas[categoriaLocal];
    if (descricoes && descricoes.length > 0) {
        const randomIndex = Math.floor(Math.random() * descricoes.length);
        return descricoes[randomIndex];
    }
    return 'Delicioso prato preparado com ingredientes frescos e muito carinho.';
};
/**
 * Cria e retorna um card de prato com imagem, nome, descrição, preço e botões de ação.
 */
window.criarCardPrato = function (pratoResumido, categoriaLocal, addToCart) {
    // Nome original e traduzido do prato
    const nomeOriginal = pratoResumido.strMeal;
    const nomeTraduzido = window.nomePratoTraduzido[nomeOriginal] || nomeOriginal;

    // Descrição e preço aleatório
    const descricaoPrato = window.getDescricaoGenerica(categoriaLocal);
    const precoPrato = window.gerarPrecoAleatorio();

    // Criação do container do card
    const card = document.createElement('div');
    card.className = 'card';

    // Imagem do prato
    const img = document.createElement('img');
    img.src = pratoResumido.strMealThumb;
    img.alt = nomeTraduzido;
    card.appendChild(img);

    // Nome do prato
    const h2 = document.createElement('h2');
    h2.textContent = nomeTraduzido;
    card.appendChild(h2);

    // Descrição do prato
    const pDescription = document.createElement('p');
    pDescription.textContent = descricaoPrato;
    card.appendChild(pDescription);

    // Preço do prato
    const pPrice = document.createElement('p');
    pPrice.classList.add('dish-price');
    pPrice.textContent = `R$ ${precoPrato.toFixed(2).replace('.', ',')}`;
    card.appendChild(pPrice);

    // Container dos botões
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('card-buttons');
    card.appendChild(buttonContainer);

    // Botão "Detalhes" com alerta
    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-details');
    detailsButton.textContent = 'Detalhes';
    detailsButton.addEventListener('click', () => {
        alert(`Detalhes do prato: ${nomeTraduzido}\nPreço: R$ ${precoPrato.toFixed(2)}\nDescrição: ${descricaoPrato}`);
    });
    buttonContainer.appendChild(detailsButton);

    // Botão "+" para adicionar à sacola
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn', 'btn-add-to-cart');
    addToCartButton.textContent = '+';
    addToCartButton.addEventListener('click', () => {
        addToCart({
            id: pratoResumido.idMeal,
            name: nomeTraduzido,
            price: precoPrato,
            image: pratoResumido.strMealThumb
        });
    });
    buttonContainer.appendChild(addToCartButton);

    // Retorna o card pronto para ser inserido no DOM
    return card;
};
