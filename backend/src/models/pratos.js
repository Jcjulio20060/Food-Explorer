const mongoose = require('mongoose');

const pratoSchema = new mongoose.Schema(
  {
    nome:        { type: String, required: true },
    descricao:   { type: String, required: true },
    preco:       { type: Number, required: true, min: 0 },
    categoria:   { type: String, enum: ['Entrada', 'Principal', 'Sobremesa', 'Bebida'], required: true },
    imagemUrl:   { type: String },           // opcional: link da imagem
    criadoPor:   { type: mongoose.Types.ObjectId, ref: 'Usuario' } // se quiser saber quem cadastrou
  },
  { timestamps: true }                       // createdAt / updatedAt automáticos
);

module.exports = mongoose.model('Prato', pratoSchema);
