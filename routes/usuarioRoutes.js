const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const rotas = require('./routeMaps');


router.get(rotas.USUARIOS_LISTAR, usuarioController.listar);
router.post(rotas.USUARIOS_CADASTRAR, usuarioController.cadastrar);

module.exports = router;
