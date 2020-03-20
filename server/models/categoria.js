const mongoose = require('mongoose');
// const UniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        type: String
    }
});


module.exports = mongoose.model("Categoria", categoriaSchema);