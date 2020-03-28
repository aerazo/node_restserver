const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

app.use(fileUpload());

app.post('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'no contain files'
            }
        })
    }

    let tipos = ['productos', 'usuarios'];
    // validar tipo
    if (tipos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'no es un tipo válido, estos son: ' + tipos.join()
            }
        });
    }




    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let file = archivo.name.split('.');
    let ext = file[file.length - 1];
    //Extension validas
    let extensionsValid = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionsValid.indexOf(ext) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'no es una extension válida, estas son: ' + extensionsValid.join(),
                extension: ext
            }
        });
    }

    //cambiar nombre archivo

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${ext}`

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${archivo.name}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, archivo.name);
        } else {
            imagenProducto(id, res, archivo.name);
        }
    });
});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'user not exist'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioModificado) => {
            res.json({
                ok: true,
                usuario: usuarioModificado,
                img: nombreArchivo
            })
        });


    });
}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'product not exist'
                }
            });
        }

        borraArchivo(productoDB.img, 'productos');

        productoDB.img = nombreArchivo;

        productoDB.save((err, productoModificado) => {
            res.json({
                ok: true,
                producto: productoModificado,
                img: nombreArchivo
            })
        });


    });
}


function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}


module.exports = app;