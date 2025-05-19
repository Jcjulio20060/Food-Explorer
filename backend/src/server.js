require('dotenv').config();
const connect = require('./config/db');
const app = require('./app');

connect();                             // conecta Mongo

app.listen(process.env.PORT, () =>
  console.log(`🚀 API rodando na porta ${process.env.PORT}`)
);