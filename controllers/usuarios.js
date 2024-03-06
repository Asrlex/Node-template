const{ ejecutarQueryConsultaSingular, 
    ejecutarQueryInsertSingular, 
    ejecutarQueryConsultaMultiple} = require("../db/dbutils");
const Logger = require("../utils/Logger.js");
const bcrypt = require("bcrypt");
const {queries_usuarios} = require("../db/queries");
const rootURL = "/gestion";


/** Renderiza la página de login */ 
module.exports.mostrarLogin = (req, res) => {
    let redirected = req.query.redirected;
    let credentials = req.query.credentials;
    res.render("login.ejs", { 
        redirected: redirected, 
        credentials: credentials
    });
}

/** Recibe las credenciales introducidas, las valida y crea una sesión */
module.exports.iniciarSesion = async (req, res) => {
    let { usuario, pwd } = req.body;
    if (usuario && pwd) {
        let result = await buscarUsuario(usuario);
        if(result && await bcrypt.compare(pwd, result.pwd)) {
            await guardarLogin(usuario);
            req.session.loggedin = true;
            req.session.username = usuario;
            req.session.idUsuario = result.id;
            Logger.log(`Logged in`, req.session.username);
            req.session.admin = result.admin;
            res.redirect("/");
        } else {
            res.redirect(`${rootURL}/usuarios/login?credentials=true`); 
        }
    } else {
        res.redirect("/");
    }
}

/**
 * Evaluación y validación de credenciales
 * @param {*} usuario - usuario que quiere logarse
 * @param {*} pwd - contraseña del usuario que quiere logarse
 * @returns - si se validan las credenciales, se devuelve la Promise cumplida
 */
const buscarUsuario = async (usuario) => {
    let query = queries_usuarios.buscarUsuario;
    let params = [usuario];
    return await ejecutarQueryConsultaSingular(query, params);
};

/**
 * Guarda en la DB un log del momento de login del usuario
 * @param {string} usuario - usuario logeado
 * @returns {boolean} - si se ha guardado correctamente o no
 */
const guardarLogin = async (usuario) => {
    let query = queries_usuarios.guardarLogin;
    let params = [usuario];
    return await ejecutarQueryInsertSingular(query, params);
};

/** Cierra sesión */
module.exports.cerrarSesion = (req, res) => {
    Logger.log(`Logged out`, req.session.username);
    req.session = null;
    res.redirect("${rootURL}/main");
};

/** Obtiene y muestra todos los usuarios */
module.exports.mostrarTodosUsuarios = async (req, res) => {
    let admin = req.session.admin;
    let query = admin ? queries_usuarios.buscarUsuarios : queries_usuarios.buscarUsuarioPorId;
    let usuarios = admin ? await ejecutarQueryConsultaMultiple(query) : await ejecutarQueryConsultaSingular(query, [req.session.idUsuario]);
    res.render("usuarios/usuarios.ejs", {
        usuarios: usuarios
    });
};

/** Permite crear un nuevo usuario */
module.exports.crearUsuario = async (req, res) => {
    const { usuario, pwd, admin, nombre } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedpwd = bcrypt.hashSync(pwd, salt);
    let query = queries_usuarios.crearUsuario;
    let params = [nombre, usuario, hashedpwd, admin];
    let result = await ejecutarQueryInsertSingular(query, params);
    if(result){
        Logger.log(`Usuario ${usuario} creado`, req.session.username);
        res.sendStatus(200);
    }
};

/** Muestra el usuario logado */
module.exports.mostrarMiUsuario = async (req, res) => {
    res.redirect("${rootURL}/usuarios/" + req.session.idUsuario);
};

/** Obtiene y muestra un usuario */
module.exports.mostrarUsuario = async (req, res) => {
    let {id} = req.params;
    let query = queries_usuarios.buscarUsuarioPorId;
    let params = [id];
    let usuario = await ejecutarQueryConsultaSingular(query, params);
    res.render("usuario.ejs", {
        usuario: usuario
    });
};

/** Actualiza datos de un usuario */
module.exports.actualizarInfoUsuario = async (req, res) => {
    let {id} = req.params;
    const { usuario, pwd, admin, nombre } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedpwd = await bcrypt.hash(pwd, salt);
    let query = queries_usuarios.actualizarUsuario;
    let result = await ejecutarQueryInsertSingular(query, [nombre, usuario, hashedpwd, admin, id]);
    if(result){
        Logger.log(`Usuario ${id} actualizado`, req.session.username);
        res.sendStatus(200);
    }
};

/** Borra un usuario */
module.exports.borrarUsuario = async (req, res) => {
    let {id} = req.params;
    let query = queries_usuarios.borrarUsuario;
    let result = await ejecutarQueryInsertSingular(query, [id]);
    if(result){
        Logger.log(`Usuario ${id} borrado`, req.session.username);
        res.sendStatus(200);
    }
};