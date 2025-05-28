const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/pratosControllers');

router.get('/',       ctrl.listar);
router.get('/importar',       ctrl.importar);
router.get('/:id',    ctrl.detalhar);
router.get('/categoria/:categoria', ctrl.pesquisarPorCategoria);
router.get('/nome/:nome', ctrl.pesquisarPorNome);
router.post('/',      ctrl.criar);
router.put('/:id',    ctrl.atualizar);
router.delete('/:id', ctrl.remover);

module.exports = router;