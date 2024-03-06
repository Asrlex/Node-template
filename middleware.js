/**
 * Verifica que el usuario está logado. Si no, redirige a la página de login
 * @param {request} req - petición
 * @param {response} res - respuesta
 * @param {next} next - siguiente paso en el middleware
 */
module.exports.verifyLogin = (req, res, next) => {
    if (req.session.loggedin == undefined || !req.session.loggedin) {
        res.redirect("/gestion/usuarios/login?redirected=true");
    } else{
        next();
    }
}

/**
 * Verifica que el usuario está logado para no permitir doble login
 * @param {request} req - petición
 * @param {response} res - respuesta
 * @param {next} next - siguiente paso en el middleware
 */
module.exports.noDobleLogin = (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect("/gestion/main");
    } else{
        next();
    }
}

/**
 * Verifica que el usuario es un administrador. Si no, redirige a la página principal
 * @param {request} req - petición
 * @param {response} res - respuesta
 * @param {next} next - siguiente paso en el middleware
 */
module.exports.verifyAdmin = (req, res, next) => {
    if (!req.session.admin) {
        res.redirect("/gestion/main");
    } else{
        next();
    }
}

/**
 * Verifica que el usuario es un el gestionado
 * @param {request} req - petición
 * @param {response} res - respuesta
 * @param {next} next - siguiente paso en el middleware
 */
module.exports.verifyUsuario = (req, res, next) => {
    let result = req.url.split("/")[3] == req.session.idUsuario;
    if (!req.session.admin || result) {
        res.redirect("/gestion/main");
    } else{
        next();
    }
}
