import React from 'react';
import LoginForm from '../../components/form';
import './style.css'; // Estilos específicos da tela de login

function LoginScreen() {
  return (
    <div className="login-screen">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}

export default LoginScreen;