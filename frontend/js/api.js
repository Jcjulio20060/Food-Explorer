// api.js
const BASE_URL = 'http://localhost:3000/pratos';

// Array das categorias disponíveis (só precisa pegar 1 vez)
export async function getCategoriasDisponiveis() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await res.json();
  return data.meals.map(m => m.strCategory);
}

// Busca pratos pela categoria (só no seu backend)
export async function getPratosPorCategoria(categoria) {
  const res = await fetch(`${BASE_URL}/categoria/${encodeURIComponent(categoria)}`);
  if (!res.ok) throw new Error(`Erro ao buscar pratos da categoria: ${categoria}`);
  return res.json();
}

// Busca prato por nome
export async function buscarPorNome(nome) {
  const res = await fetch(`${BASE_URL}/nome/${encodeURIComponent(nome)}`);
  if (!res.ok) throw new Error(`Erro ao buscar prato por nome: ${nome}`);
  return res.json();
}
