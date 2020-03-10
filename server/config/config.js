//Puerto
process.env.PORT = process.env.PORT || 3000;


//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';


//Base de datos
let urlBD;

if (process.env.NODE_ENV === 'DEV') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URL;
}

process.env.URL_DB = urlBD;