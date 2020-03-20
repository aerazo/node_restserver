const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('./../middlewares/authentication');
const Categoria = require('../models/categoria');
const app = express();

// ===============================
// Mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find()
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias,
            });

        });
});


//Mostrar categoria por ID
app.get('/categoria/:id', (req, res) => {

});

//Crear una nueva categoria
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });
});


//Actualizar una categoria
app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let categoriaDesc = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, categoriaDesc, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });

});

//Elimina una categoria
app.delete('/categoria/:id', (req, res) => {


});


module.exports = app;