const Usuario = require('../models/users');
const bcrypt = require('bcrypt');

// GET /usuarios
exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-senha'); // não manda a senha!
    res.json(usuarios);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
};

// GET /usuarios/:id
exports.detalhar = async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.id, '-senha');
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json(user);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
};

// GET /usuarios?cpf=12345678900
exports.searchCPF = async (req, res) => {
  try {
    const { cpf, senha } = req.query;

    // Verifica se o CPF e a senha foram fornecidos
    if (!cpf || !senha) {
      return res.status(400).json({ erro: 'CPF e senha são obrigatórios.' });
    }

    // Remove caracteres não numéricos do CPF
    const cpfNormalizado = cpf.replace(/\D/g, '');

    // Busca o usuário pelo CPF normalizado
    const user = await Usuario.findOne({ cpf: cpfNormalizado });
    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    // Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida.' });
    }

    // Remove a senha do objeto antes de retornar
    const { senha: _, ...userSemSenha } = user.toObject();

    res.json(userSemSenha);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
};

// POST /usuarios
exports.criar = async (req, res) => {
  try {
    const novo = await Usuario.create(req.body);
    const { senha, ...userSemSenha } = novo.toObject();
    res.status(201).json(userSemSenha);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
};

// PUT /usuarios/:id
exports.atualizar = async (req, res) => {
  try {
    const { nome, dataNascimento, email, senha } = req.body;

    // Atualiza os dados do usuário
    const updates = { nome, dataNascimento, email };
    if (senha) {
      updates.senha = await bcrypt.hash(senha, 10); // Criptografa a nova senha
    }

    const user = await Usuario.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// DELETE /usuarios/:id
exports.remover = async (req, res) => {
  try {
    const del = await Usuario.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json({ mensagem: 'Usuário removido com sucesso.' });
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
};
