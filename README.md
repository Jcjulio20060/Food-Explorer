# Food Explorer 🍴

Bem-vindo ao **Food Explorer**, um projeto desenvolvido para explorar e gerenciar pedidos de alimentos de forma prática e intuitiva.

## 📋 Descrição

O **Food Explorer** é uma aplicação web integrada com um backend que permite aos usuários realizar login, explorar menus, criar contas, gerenciar pedidos e acessar informações da conta. Este projeto utiliza tecnologias modernas para oferecer uma experiência de usuário agradável e eficiente.

## 🚀 Funcionalidades

- Login com validação de CPF e senha utilizando `bcrypt`.
- Máscara para CPF no campo de entrada.
- Cadastro de novos usuários com validação de campos e envio para a API.
- Redirecionamento para a página principal após login bem-sucedido.
- Armazenamento do ID do usuário e informações completas no `localStorage`.
- Página de "Minha Conta" para visualização e edição de informações do usuário.
- API RESTful para gerenciamento de usuários e pratos.
- Interface estilizada com variáveis CSS para fácil personalização.

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5**: Estrutura do projeto.
- **CSS3**: Estilização com variáveis globais e design responsivo.
- **JavaScript (ES6+)**: Lógica de validação e interatividade.
- **Font Awesome**: Ícones para melhorar a interface.
- **LocalStorage**: Armazenamento de dados do usuário.

### **Backend**
- **Node.js**: Ambiente de execução.
- **Express.js**: Framework para criação da API.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: ODM para modelagem de dados no MongoDB.
- **bcrypt**: Hashing de senhas para segurança.
- **dotenv**: Gerenciamento de variáveis de ambiente.

## 📂 Estrutura de Pastas

```plaintext
Food-Explorer/
├── backend/
│   ├── .env                 # Variáveis de ambiente
│   ├── package.json         # Configurações do backend
│   ├── src/
│   │   ├── app.js           # Configuração do servidor Express
│   │   ├── server.js        # Inicialização do servidor
│   │   ├── router.js        # Rotas principais
│   │   ├── config/
│   │   │   └── db.js        # Conexão com o MongoDB
│   │   ├── controllers/
│   │   │   ├── pratosControllers.js  # Lógica para pratos
│   │   │   └── userController.js     # Lógica para usuários
│   │   ├── models/
│   │   │   ├── pratos.js     # Modelo de pratos
│   │   │   └── users.js      # Modelo de usuários
│   │   ├── routes/
│   │       ├── pratos.js     # Rotas para pratos
│   │       └── usuarios.js   # Rotas para usuários
├── frontend/
│   ├── index.html           # Página inicial
│   ├── src/
│   │   ├── config/
│   │   │   ├── main.css      # Variáveis globais de estilo
│   │   │   └── users.js      # Dados de usuários (mock)
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   │   ├── index.html  # Página de login
│   │   │   │   ├── css/
│   │   │   │   │   └── style.css # Estilos da página de login
│   │   │   │   └── js/
│   │   │   │       └── main.js   # Lógica de login
│   │   │   ├── register/
│   │   │   │   ├── index.html  # Página de cadastro
│   │   │   │   ├── css/
│   │   │   │   │   └── style.css # Estilos da página de cadastro
│   │   │   │   └── js/
│   │   │   │       └── main.js   # Lógica de cadastro
│   │   │   ├── account/
│   │   │       ├── index.html  # Página de "Minha Conta"
│   │   │       ├── css/
│   │   │       │   └── style.css # Estilos da página de conta
│   │   │       └── js/
│   │   │           └── main.js   # Lógica de edição de informações
├── assets/                  # Imagens e outros recursos
├── README.md                # Documentação do projeto
```

## ✅ Requisitos

### **Requisitos para o Backend**
- **Node.js** (versão 16 ou superior)
- **NPM** (ou **Yarn**) para gerenciar pacotes
- **Docker** (para executar o MongoDB em um container)
- **MongoDB** (caso prefira executar o banco de dados localmente)

### **Requisitos para o Frontend**
- Navegador moderno (Google Chrome, Mozilla Firefox, etc.)
- Extensão "Live Server" (opcional, para servir o frontend localmente)

### **Requisitos Opcionais**
- **Postman** ou **Insomnia** para testar as rotas da API
- **Git** para clonar o repositório

## ⚙️ Como Executar

### **Backend**
1. Configure o MongoDB utilizando Docker:
   - Execute o seguinte comando para iniciar um container MongoDB:
     ```bash
     docker run -d --name mongo -p 27017:27017 mongo:6
     ```
   - O MongoDB estará disponível em `mongodb://127.0.0.1:27017`.

2. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` no diretório `backend` com o seguinte conteúdo:
     ```env
     PORT=3000
     MONGO_URI=mongodb://127.0.0.1:27017/foodexplorer
     ```

5. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:3000`.

### **Frontend**
1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Abra o arquivo `index.html` no navegador ou utilize uma extensão como "Live Server" no Visual Studio Code para servir o frontend.

## 📌 Próximos Passos

- Integrar o frontend com a API do backend para autenticação e gerenciamento de dados.
- Adicionar uma página para explorar o menu de alimentos.
- Melhorar a responsividade para dispositivos móveis.
- Implementar a funcionalidade de logout para limpar os dados do usuário no `localStorage`.

## 🖼️ Prévia do Projeto

- **Tela de Login**  
  Permite que o usuário faça login com CPF e senha.

- **Tela de Cadastro**  
  Permite que novos usuários se registrem no sistema.

- **Tela de Minha Conta**  
  Permite que o usuário visualize e edite suas informações pessoais.

## 🧑‍💻 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.