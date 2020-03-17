require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
//parse app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse app/json
app.use(bodyParser.json());


//habilitar public folder
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index.js'));


mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log('DB Online..!!');
    });

app.listen(process.env.PORT, () => console.log(`listen in ${process.env.PORT}`));