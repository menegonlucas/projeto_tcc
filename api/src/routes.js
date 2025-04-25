const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca Virtual' });
});

// Controllers (você pode criar arquivos separados para cada um depois)
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/usuarioController');
const registroController = require('./controllers/registroController');

// Rotas para Livro
router.get('/livros', livroController.getAll);
router.get('/livros/:id', livroController.getOne);
router.post('/livros', livroController.create);
router.put('/livros/:id', livroController.update);
router.delete('/livros/:id', livroController.remove);

// Rotas para Usuario
router.get('/usuarios', usuarioController.getAll);
router.get('/usuarios/:id', usuarioController.getOne);
router.post('/usuarios', usuarioController.create);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.remove);

// Rotas para Registro
router.get('/registros', registroController.getAll);
router.get('/registros/:id', registroController.getOne);
router.post('/registros', registroController.create);
router.put('/registros/:id', registroController.update);
router.delete('/registros/:id', registroController.remove);


module.exports = routes;