const express = require('express');
const router = express.Router();

const controller = require('../controllers/produtoController');
const upload = require('../middlewares/upload');

router.get('/produtos', controller.listar);

router.post('/produtos', upload.single('imagem'), controller.criar);
router.delete('/produtos/:id', controller.deletar);
router.put('/produtos/:id', controller.atualizar);

module.exports = router