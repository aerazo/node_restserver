const jwt = require('jsonwebtoken');

//Verificar Token
let verificaToken = (req, res, next) => {

    let token = req.get('token'); //token

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};


let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};

//Verifica AdminRole
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role !== "ADMIN_ROLE") {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'el usuario debe ser administrador'
            }
        });
    } else {
        next();
    }



};

module.exports = { verificaToken, verificaAdmin_Role, verificaTokenImg };