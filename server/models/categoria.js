const mongoose = require('mongoose');
// const UniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String
    }
});


module.exports = mongoose.model("Categoria", categoriaSchema);