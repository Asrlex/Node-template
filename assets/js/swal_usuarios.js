const nuevoUsuarioDialog = () => {
    Swal.fire({
        title: 'Introduzca los datos del nuevo usuario',
        html: `
            <div class="container-fluid">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Usuario</span>
                    <input type="text" id="usuario" class="form-control" placeholder="Usuario" spellcheck="false">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Contraseña</span>
                    <input type="password" id="pwd" class="form-control" placeholder="Contraseña" name="pwd">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Repetir contraseña</span>
                    <input type="password" id="pwd2" class="form-control" placeholder="Contraseña" name="pwd">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                    <input type="text" id="nombre" class="form-control" placeholder="Nombre completo" spellcheck="false">
                </div>
                <div class="input-group mb-1">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" id="admin">
                    </div>
                    <input type="text" class="form-control" aria-label="Text input with checkbox" value="Admin" readonly>
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const usuario = Swal.getPopup().querySelector('#usuario').value;
            const pwd = Swal.getPopup().querySelector('#pwd').value;
            const pwd2 = Swal.getPopup().querySelector('#pwd2').value;
            const nombre = Swal.getPopup().querySelector('#nombre').value;
            const admin = Swal.getPopup().querySelector('#admin').checked;
            if (!usuario || !pwd || !nombre || !pwd2) {
                Swal.showValidationMessage(`Faltan datos`)
            }
            if(pwd !== pwd2){
                Swal.showValidationMessage(`Las contraseñas no coinciden`)
            }
            return fetch(`/gestion/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario: usuario, pwd: pwd, nombre: nombre, admin: admin })
            })
                .then(response => {
                    if (!response.ok) {
                        console.log("Error");
                        throw new Error(response.statusText)
                    }
                    return response
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Error: ${error}`
                    )
                })
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Usuario creado`,
            }).then(() => {
                location.reload();
            })
        }
    })
}

const editUsuarioDialog = (userEdit) => {
    Swal.fire({
        title: 'Datos del usuario',
        html: `
            <div class="container-fluid">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Usuario</span>
                    <input type="text" id="usuario" class="form-control" value='${userEdit.usuario}' required spellcheck="false">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Contraseña</span>
                    <input type="password" id="pwd" class="form-control"  name="pwd" required>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Repetir contraseña</span>
                    <input type="password" id="pwd2" class="form-control"  name="pwd" required>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                    <input type="text" id="nombre" class="form-control" value='${userEdit.nombre}' required spellcheck="false">
                </div>
                <div class="input-group mb-1">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" id="admin">
                    </div>
                    <input type="text" class="form-control" aria-label="Text input with checkbox" value="Admin" readonly>
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const usuario = Swal.getPopup().querySelector('#usuario').value;
            const pwd = Swal.getPopup().querySelector('#pwd').value;
            const pwd2 = Swal.getPopup().querySelector('#pwd2').value;
            const nombre = Swal.getPopup().querySelector('#nombre').value;
            const admin = Swal.getPopup().querySelector('#admin').checked;
            if (!usuario || !pwd || !nombre || !pwd2) {
                Swal.showValidationMessage(`Faltan datos`)
            }
            if(pwd !== pwd2){
                Swal.showValidationMessage(`Las contraseñas no coinciden`)
            }
            return fetch(`/gestion/usuarios`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario: usuario, pwd: pwd, nombre: nombre, admin: admin })
            })
                .then(response => {
                    if (!response.ok) {
                        console.log("Error");
                        throw new Error(response.statusText)
                    }
                    return response
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Error: ${error}`
                    )
                })
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Usuario modificado`,
            }).then(() => {
                location.reload();
            })
        }
    })
}

const borrarUsuarioDialog = (userDelete) => {
    Swal.fire({
        title: `¿Borrar usuario ${userDelete.usuario}?`,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            return fetch(`/gestion/usuarios/${userDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    console.log("Error");
                    throw new Error(response.statusText)
                }
                return response
            })
            .catch(error => {
                Swal.showValidationMessage(
                    `Error: ${error}`
                )
            })
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Usuario borrado`,
            }).then(() => {
                location.reload();
            })
        }
    })
}