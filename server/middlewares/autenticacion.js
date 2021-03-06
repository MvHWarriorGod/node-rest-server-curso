const jwt = require('jsonwebtoken');
//==============================
//Verficar token
//==============================
let verificarToken = (req, res, next) => {
    let token = req.get('token');
    //req.get('token') jala al token del header
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

};
//veruficar el rol del usuario
let verficarUsuarioRole = (req, res, next) => {
    let usuario = req.usuario;
    //preguntar si el rol es admin
    if (usuario.role === "ADMIN_ROLE") {
        next();
    } else {
        //sinoretorna un json con un false y un mesaje de error
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

};
//verifica token para imagen
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    //req.get('token') jala al token del header
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}


//exportar los mudulos
module.exports = {
    verificarToken,
    verficarUsuarioRole,
    verificaTokenImg
}