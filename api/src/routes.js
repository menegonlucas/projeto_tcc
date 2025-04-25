const express = require('express');
const routes = express.Router(); 

// Rota raiz (teste)
routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca Virtual' });
});

// Controllers
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/usuarioController');
const registroController = require('./controllers/registroController');

// Rotas para Livro
routes.get('/livros', livroController.getAll);
routes.get('/livros/:id', livroController.getOne);
routes.post('/livros', livroController.create);
routes.put('/livros/:id', livroController.update);
routes.delete('/livros/:id', livroController.remove);

// Rotas para Usuario
routes.get('/usuarios', usuarioController.getAll);
routes.get('/usuarios/:id', usuarioController.getOne);
routes.post('/usuarios', usuarioController.create);
routes.put('/usuarios/:id', usuarioController.update);
routes.delete('/usuarios/:id', usuarioController.remove);

// Rotas para Registro
routes.get('/registros', registroController.getAll);
routes.get('/registros/:id', registroController.getOne);
routes.post('/registros', registroController.create);
routes.put('/registros/:id', registroController.update);
routes.delete('/registros/:id', registroController.remove);


module.exports = routes;
