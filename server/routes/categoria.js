const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('./../middlewares/authentication');
const Categoria = require('../models/categoria');
const app = express();

// ===============================
// Mostrar todas las categorias
app.get('/categoria', (req, res) => {

});


//Mostrar categoria por ID
app.get('/categoria/:id', (req, res) => {

});

//Crear una nueva categoria
app.post('/categoria', (req, res) => {

});


//Actualizar una categoria
app.put('/categoria/:id', (req, res) => {

});

//Elimina una categoria
app.delete('/categoria/:id', (req, res) => {


});


module.exports = app;