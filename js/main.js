const userId = localStorage.getItem('userId');
if (userId) {
  console.log(`Usuário logado: ${userId}`);
} else {
  // Redireciona para a página de login se não houver usuário logado
  window.location.href = '/login.html';
}