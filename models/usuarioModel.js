
const db = require('../db');

module.exports = {

    listarTodos: (callback) => {
        db.query( 'SELECT * FROM usuarios' , callback);
    },

    criar: (dados, callback) => {
        console.log(dados);
    const { nome, email, senha, cpf } = dados;
    db.query("INSERT INTO usuarios (usuario_nome, usuario_email, usuario_senha, usuario_cpf) VALUES (?, ?, ?, ?)", [nome, email, senha, cpf], callback);
    }

};


