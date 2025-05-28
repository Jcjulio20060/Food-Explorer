/**
 * Inicializa todos os eventos do site: carrossel, botões da sacola, busca, rolagem e cliques.
 * Controla os eventos da interface
 */
window.inicializarEventos = function (containersPorCategoria) {
    document.addEventListener('DOMContentLoaded', () => {

        // Elementos relacionados à busca e à logo
        const searchForm = document.querySelector('header nav form');
        const searchInput = document.querySelector('header nav input[type="text"]');
        const searchResultsContainer = document.getElementById('searchResultsContainer');
        const logoLink = document.getElementById('logoLink');

        // --- LÓGICA DO CARROSSEL ---
        const carouselContainer = document.querySelector('.carousel-container');
        const carouselSlide = document.querySelector('.carousel-slide');

        if (carouselSlide && carouselContainer) {
            const images = document.querySelectorAll('.carousel-slide img');
            const numOriginalImages = images.length;

            // Clona primeira e última imagem para efeito de looping
            if (numOriginalImages > 0) {
                const firstImageClone = images[0].cloneNode(true);
                const lastImageClone = images[numOriginalImages - 1].cloneNode(true);
                carouselSlide.appendChild(firstImageClone);
                carouselSlide.prepend(lastImageClone);
            }

            const allImages = document.querySelectorAll('.carousel-slide img');
            const totalImages = allImages.length;

            let counter = 1;
            let slideWidth = carouselContainer.clientWidth;

            // Define largura e posição inicial
            carouselSlide.style.width = `${slideWidth * totalImages}px`;
            carouselSlide.style.transition = 'none';
            carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;

            setTimeout(() => {
                carouselSlide.style.transition = "transform 0.5s ease-in-out";
            }, 0);

            // Função para movimentar o carrossel
            function slideCarousel() {
                carouselSlide.style.transition = "transform 0.5s ease-in-out";
                carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
            }

            // Avança automaticamente a cada 3 segundos
            setInterval(() => {
                counter++;
                slideCarousel();
            }, 3000);

            // Faz o looping do carrossel ao chegar no final/início
            carouselSlide.addEventListener('transitionend', () => {
                if (counter >= totalImages - 1) {
                    carouselSlide.style.transition = 'none';
                    counter = 1;
                    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
                }
                if (counter <= 0) {
                    carouselSlide.style.transition = 'none';
                    counter = numOriginalImages;
                    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
                }
            });

            // Ajusta o carrossel se a janela for redimensionada
            window.addEventListener('resize', () => {
                slideWidth = carouselContainer.clientWidth;
                carouselSlide.style.width = `${slideWidth * totalImages}px`;
                carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
                setTimeout(() => {
                    carouselSlide.style.transition = "transform 0.5s ease-in-out";
                }, 0);
            });
        }

        // --- BOTÃO "VOLTAR AO TOPO" ---
        const backToTopButton = document.getElementById('scrollToTopBtn');
        const scrollThreshold = 300;

        window.addEventListener('scroll', () => {
            if (backToTopButton) {
                backToTopButton.style.display = window.scrollY > scrollThreshold ? 'block' : 'none';
            }
        });

        if (backToTopButton) {
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // --- MODAL DA SACOLA (CARRINHO) ---
        const cartModal = document.getElementById('cartModal');
        const closeButton = document.querySelector('.close-button');
        const cartIcon = document.getElementById('cartIcon');

        // Abrir modal ao clicar no ícone da sacola
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                if (cartModal) {
                    cartModal.style.display = 'flex';
                    window.updateCartDisplay();
                }
            });
        }

        // Fechar modal pelo botão X
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                if (cartModal) cartModal.style.display = 'none';
            });
        }

        // Fechar modal clicando fora da caixa
        if (cartModal) {
            window.addEventListener('click', (event) => {
                if (event.target === cartModal) cartModal.style.display = 'none';
            });
        }

        // --- CONTROLE DOS BOTÕES DE QUANTIDADE E REMOVER ---
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (event) => {
                const target = event.target;
                const itemId = target.dataset.id;

                if (target.classList.contains('increase-quantity')) {
                    window.updateItemQuantity(itemId, 1);
                } else if (target.classList.contains('decrease-quantity')) {
                    window.updateItemQuantity(itemId, -1);
                } else if (target.classList.contains('remove-item-btn')) {
                    window.removeFromCart(itemId);
                }
            });
        }

        // --- FINALIZAR PEDIDO ---
        const checkoutButton = document.getElementById('checkoutButton');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (window.cart.length > 0) {
                    alert('Pedido finalizado! Obrigado por sua compra.');
                    window.cart.length = 0;
                    window.updateCartDisplay();
                    cartModal.style.display = 'none';
                } else {
                    alert('Sua sacola está vazia. Adicione itens antes de finalizar o pedido.');
                }
            });
        }

        // --- BUSCA POR PRATO ---
        if (searchForm) {
            searchForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const searchTerm = searchInput.value.trim();

                if (searchTerm) {
                    const carouselContainerCheck = document.querySelector('.carousel-container');
                    if (carouselContainerCheck) carouselContainerCheck.style.display = 'none';
                    await window.searchMeals(searchTerm, containersPorCategoria, searchResultsContainer);
                } else {
                    alert('Por favor, digite um termo para buscar.');
                }
            });
        }

        // --- CLICAR NA LOGO PARA RESETAR A VISUALIZAÇÃO ---
        if (logoLink) {
            logoLink.addEventListener('click', (event) => {
                event.preventDefault();
                window.resetView(searchResultsContainer, searchInput, containersPorCategoria);
            });
        }
    });
};
