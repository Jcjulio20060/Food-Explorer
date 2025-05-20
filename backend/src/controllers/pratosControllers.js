const Prato = require('../models/pratos');
const fetch = (...args) => import('node-fetch').then(({default:f}) => f(...args));

// GET /pratos
exports.listar = async (req, res) => {
  try {
    const filtro = req.query.categoria ? { categoria: req.query.categoria } : {};
    const pratos = await Prato.find(filtro);
    res.json(pratos);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
};

// GET /pratos/:id
exports.detalhar = async (req, res) => {
  try {
    const prato = await Prato.findById(req.params.id);
    if (!prato) return res.status(404).json({ erro: 'Prato não encontrado.' });
    res.json(prato);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
};

// POST /pratos
exports.criar = async (req, res) => {
  try {
    const novo = await Prato.create(req.body);
    res.status(201).json(novo);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
};

// PUT /pratos/:id
exports.atualizar = async (req, res) => {
  try {
    const upd = await Prato.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!upd) return res.status(404).json({ erro: 'Prato não encontrado.' });
    res.json(upd);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
};

// DELETE /pratos/:id
exports.remover = async (req, res) => {
  try {
    const del = await Prato.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ erro: 'Prato não encontrado.' });
    res.json({ mensagem: 'Prato removido com sucesso.' });
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
};

// GET Importar pratos da API externa
exports.importar = async (_req, res) => {
  try {
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (!api.ok) {
      return res.status(api.status).json({ erro: 'Erro ao acessar a API externa' });
    }
    const { meals } = await api.json();
    if (!Array.isArray(meals)) {
      return res.status(500).json({ erro: 'Resposta inesperada da API externa' });
    }

    if (!meals) {
      return res.status(404).json({ erro: 'Nenhum prato encontrado na API externa' });
    }

    const docs = meals.map(m => ({
      nome: m.strMeal,
      categoria: m.strCategory,
      instrucoes: m.strInstructions,
      imagem: m.strMealThumb,
      preco: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)), // preço aleatório entre 20 e 80
      descricao: m.strInstructions?.slice(0, 100) + '...' || 'Sem descrição'
    }));

    await Prato.deleteMany();
    await Prato.insertMany(docs);

    res.json({ ok: true, total: docs.length });
  } catch (error) {
    console.error('Erro ao importar pratos:', error.message);
    res.status(500).json({ erro: 'Erro ao importar pratos' });
  }
};