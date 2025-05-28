// ui.js

export function criarBotaoCategoria(nome, callback) {
    const btn = document.createElement('button');
    btn.textContent = nome;
    btn.className = 'btn-categoria'; // estiliza via CSS se quiser
    btn.addEventListener('click', () => callback(nome));
    return btn;
  }
  
  export function renderizarPratos(container, pratos) {
    container.innerHTML = ''; // Limpa antes
  
    if (!pratos.length) {
      container.textContent = 'Nenhum prato encontrado!';
      return;
    }
  
    pratos.forEach(prato => {
      const card = document.createElement('div');
      card.className = 'card-prato';
  
      card.innerHTML = `
        <img src="${prato.imagem}" alt="${prato.nome}" class="img-prato" />
        <h3>${prato.nome}</h3>
        <p><strong>Categoria:</strong> ${prato.categoria}</p>
        <p><strong>Preço:</strong> R$ ${prato.preco?.toFixed(2) ?? '---'}</p>
        <details>
          <summary>Instruções</summary>
          <p>${prato.instrucoes}</p>
        </details>
      `;
  
      container.appendChild(card);
    });
  }
  