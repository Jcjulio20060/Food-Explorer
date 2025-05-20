const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/userController');

router.get('/',       ctrl.listar);
router.get('/buscar',    ctrl.searchCPF);
router.get('/:id',    ctrl.detalhar);
router.post('/',      ctrl.criar);
router.put('/:id',    ctrl.atualizar);
router.delete('/:id', ctrl.remover);

module.exports = router;
