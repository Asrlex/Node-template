module.exports.queries_usuarios = {
    buscarUsuario: `select * from usuarios where usuario = ?`,
    buscarUsuarioPorId: `select * from usuarios where id = ?`,
    buscarUsuarios: `select * from usuarios`,
    crearUsuario: `
        insert into usuarios 
        (nombre, usuario, pwd, admin) 
        values (?, ?, ?, ?)`,
    actualizarUsuario: `
        update usuarios 
        set nombre = ?, usuario = ?, pwd = ?, admin = ?, ultima_modificacion = now()
        where id = ?`,
    borrarUsuario: `delete from usuarios where id = ?`,
    guardarLogin: `insert into login (usuario) values (?)`,
}