const Usuario = require('../models/usuarioModel');

exports.listar = (req, res) => {
  Usuario.listarTodos((err, resultados) => {
    if (err) return res.status(500).send('Erro ao buscar usuários');
    res.render('usuarios', { usuarios: resultados });
  });
};

exports.cadastrar = (req, res) => {
  Usuario.criar(req.body, (err) => {
    if (err) return res.status(500).send('Erro ao cadastrar usuário');
    res.redirect('/usuarios');
  });
};
