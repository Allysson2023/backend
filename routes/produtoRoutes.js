const express = require('express');
const router = express.Router();

const controller = require('../controllers/produtoController');

router.get('/produtos', controller.listar);
router.post('/produtos', controller.criar);
router.delete('/produtos/:id', controller.delete);
router.put('/produtos/:id', controller.atualizar);

module.exports = router