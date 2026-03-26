const express = require('express');
const router = express.Router();

const filmeController = require('../controllers/filmeController');

router.get('/filmes', filmeController.listarFilmes);

module.exports = router;