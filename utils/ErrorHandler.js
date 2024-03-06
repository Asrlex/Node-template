const Logger = require("./Logger");

const errorLogger = (err, req, res, next) => {
    Logger.log(err.message, req.session.usuario);
    next(err);
}

const errorHandler = (err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Algo salió mal";
    err.statusDesc = errorDesc[statusCode];
    res.status(statusCode).render("error", { err });
}

const errorDesc = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',

    1000: 'Error de conexión a la base de datos',
    1001: 'Error de consulta a la base de datos',
    1002: 'Error de inserción a la base de datos',
    1003: 'Error de actualización a la base de datos',
    1004: 'Error de borrado a la base de datos',
    1005: 'Error de validación de datos',
}

module.exports = {
    errorLogger,
    errorHandler
}