const express = require('express');
const { verificaToken } = require('../middlewares/authentication');
let app = express();

let Producto = require('../models/producto');

//Obtener todos los productos
app.get('/producto', verificaToken, (req, res) => {

});

//Obtener un producto por id
app.get('/producto/:id', verificaToken, (req, res) => {

});

//Crear un producto with user and category
app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });
});

//Actualizar un producto
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let productoDesc = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        disponible: body.disponible,
        descripcion: body.descripcion
    };

    Producto.findByIdAndUpdate(id, productoDesc, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'id not exists'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    });
});

//Eliminar un producto cambiar el disponible a false
app.delete('/producto', verificaToken, (req, res) => {

});

module.exports = app;