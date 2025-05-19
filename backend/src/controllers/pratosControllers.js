const Prato = require('../models/pratos');

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
