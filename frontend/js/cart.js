// Controla a sacola de comrpas (adicionar, remover, atualizar e remover)


// Array global que armazena os itens da sacola (carrinho)
window.cart = [];

// Elementos do DOM relacionados ao carrinho
window.cartItemCountSpan = document.getElementById('cartItemCount');
window.cartTotalSpan = document.getElementById('cartTotal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const checkoutButton = document.getElementById('checkoutButton');
/**
 * Atualiza a interface do carrinho: mostra os itens, calcula o total e exibe mensagens.
 */
window.updateCartDisplay = function () {
    // Limpa o conteúdo atual do container
    cartItemsContainer.innerHTML = '';

    // Se a sacola estiver vazia
    if (window.cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        checkoutButton.disabled = true;
    } else {
        // Se tiver itens, mostra eles e ativa o botão
        emptyCartMessage.style.display = 'none';
        checkoutButton.disabled = false;

        let total = 0;
        // Para cada item da sacola, cria o HTML correspondente
        window.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item-btn" data-id="${item.id}">Remover</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        // Atualiza o total na tela
        window.cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    // Atualiza o número de itens no ícone da sacola
    window.cartItemCountSpan.textContent = window.cart.reduce((sum, item) => sum + item.quantity, 0);
};
/**
 * Adiciona item à sacola ou aumenta a quantidade se já existir.
 */
window.addToCart = function (itemDetails) {
    const existingItem = window.cart.find(item => item.id === itemDetails.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        window.cart.push({ ...itemDetails, quantity: 1 });
    }
    window.updateCartDisplay();
    alert(`"${itemDetails.name}" adicionado à sacola! Quantidade: ${existingItem ? existingItem.quantity : 1}`);
};
/**
 * Remove completamente um item da sacola.
 */
window.removeFromCart = function (itemId) {
    const index = window.cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        window.cart.splice(index, 1);
        window.updateCartDisplay();
    }
};
/**
 * Altera a quantidade de um item (aumenta ou diminui). Remove se chegar a 0.
 */
window.updateItemQuantity = function (itemId, change) {
    const item = window.cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            window.removeFromCart(itemId);
        }
        window.updateCartDisplay();
    }
};
