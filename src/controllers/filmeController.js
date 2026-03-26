const filmes = require('../models/filmeModel');

// GET
exports.listarFilmes = (req, res) => {
  res.json(filmes);
};

// POST
exports.adicionarFilme = (req, res) => {
  const { nome } = req.body;

  const novoFilme = {
    id: filmes.length + 1,
    nome
  };

  filmes.push(novoFilme);

  res.status(201).json(novoFilme);
};