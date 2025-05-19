const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () =>
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🟢 MongoDB conectado'))
    .catch(err => console.error('Erro MongoDB:', err));