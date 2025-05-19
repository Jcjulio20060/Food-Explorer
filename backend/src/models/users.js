const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const usuarioSchema = new mongoose.Schema(
  {
    nome:      { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    senha:     { type: String, required: true, minlength: 6 },
    cpf:       { type: String, required: true, unique: true },
    dateBirth: { type: Date,   required: true },
    tipo:      { type: String, enum: ['CLIENTE', 'ADMIN'], default: 'CLIENTE' }
  },
  { timestamps: true }
);

/* Hash de senha automático */
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

/* Método para conferir password futuramente */
usuarioSchema.methods.validarSenha = function (senhaTexto) {
  return bcrypt.compare(senhaTexto, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
