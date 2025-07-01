const Usuario = require('../models/usuarioModel');

exports.listar = (req, res) => {
  Usuario.listarTodos((err, resultados) => {
    if (err) return res.status(500).send('Erro ao buscar usuários');
    res.render('usuarios', { 
      dados: resultados, 
      title: 'Cadastro de usuarios'
     });
  });
};

exports.cadastrar = (req, res) => {
  Usuario.criar(req.body, (err) => {
    if (err) return res.status(500).send('Erro ao cadastrar usuário', err);
    res.redirect('/usuarios');
  });
};
