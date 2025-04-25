const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca Virtual' });
});

module.exports = routes;