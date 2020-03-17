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


//Fecha ExpireToken
process.env.EXPIRE_TOKEN = 60 * 60 * 24 * 30;

//SeedAuth
process.env.SEED = process.env.SEED || 'development';

//GoogleClientId
process.env.CLIENT_ID = process.env.CLIENT_ID || '966640448609-miajbkckoepee9od5l4idrp5nghb5dpd.apps.googleusercontent.com';