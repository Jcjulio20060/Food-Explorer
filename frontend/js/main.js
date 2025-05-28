// main.js
import { getCategoriasDisponiveis, getPratosPorCategoria } from './api.js';
import { criarBotaoCategoria, renderizarPratos } from './ui.js';
import { redirecionarUsuario } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const containerCategorias = document.getElementById('categorias');
  const containerPratos = document.getElementById('pratos');

  try {
    const categorias = await getCategoriasDisponiveis();

    categorias.forEach(categoria => {
      const btn = criarBotaoCategoria(categoria, async () => {
        const pratos = await getPratosPorCategoria(categoria);
        renderizarPratos(containerPratos, pratos);
      });

      containerCategorias.appendChild(btn);
    });

  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
  }

  // Redirecionar usuário se estiver logado
  const userBtn = document.getElementById('botao-usuario');
  if (userBtn) {
    userBtn.addEventListener('click', redirecionarUsuario);
  }
});
