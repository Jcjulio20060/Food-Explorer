const { Router } = require('express');
const pratoRoutes   = require('./routes/pratos');
const usuarioRoutes = require('./routes/usuarios');

const router = Router();

router.use('/pratos',   pratoRoutes);
router.use('/usuarios', usuarioRoutes);

module.exports = router;
