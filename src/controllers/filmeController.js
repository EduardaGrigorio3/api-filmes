const filmes = require('../models/filmeModel');

// GET
exports.listarFilmes = (req, res) => {
  res.json(filmes);
};

// POST
exports.adicionarFilme = (req, res) => {
  const { nome, ano, descricao } = req.body;

  // valida se prrencheu todos os campos
  if (!nome || !ano || !descricao) {
    return res.status(400).json({
      erro: "Preencha nome, ano e descrição"
    });
  }

  const novoFilme = {
    id: filmes.length + 1,
    nome,
    ano,
    descricao
  };

  filmes.push(novoFilme);

  res.status(201).json(novoFilme);
};

// DELETE
exports.removerFilme = (req, res) => {
  const id = parseInt(req.params.id);

  const index = filmes.findIndex(filme => filme.id === id);

  // se não existir
  if (index === -1) {
    return res.status(404).json({
      erro: "Filme não encontrado"
    });
  }

  // remove
  filmes.splice(index, 1);

  return res.status(204).send();
};