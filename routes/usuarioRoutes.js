// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota GET que chama o controller
router.get('/usuarios', usuarioController.listar);

// Rota POST que chama o controller
router.post('/usuarios', usuarioController.cadastrar);

module.exports = router;
