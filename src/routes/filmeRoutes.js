const express = require('express');
const router = express.Router();

const filmeController = require('../controllers/filmeController');

router.get('/filmes', filmeController.listarFilmes);
router.post('/filmes', filmeController.adicionarFilme);
router.delete('/filmes/:id', filmeController.removerFilme);

module.exports = router;