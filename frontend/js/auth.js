// auth.js

// Verifica se o usuário está logado
export function usuarioLogado() {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }
  
  // Redireciona para a tela correta ao clicar no botão de usuário
  export function redirecionarUsuario() {
    const user = usuarioLogado();
    if (user) {
      window.location.href = '/account.html';
    } else {
      window.location.href = '/login.html';
    }
  }