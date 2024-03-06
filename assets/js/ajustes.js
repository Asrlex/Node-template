const btnAddEmpresa = document.querySelector('#btnAddEmpresa');
const btnAddDelegacion = document.querySelector('#btnAddDelegacion');
const btnAddSector = document.querySelector('#btnAddSector');
const btnAddDivision = document.querySelector('#btnAddDivision');
const btnAddSubdivision = document.querySelector('#btnAddSubdivision');
const btnAddActividad = document.querySelector('#btnAddActividad');
const btnAddCliente = document.querySelector('#btnAddCliente');
const btnAddCica = document.querySelector('#btnAddCICA');
const btnAddResponsable = document.querySelector('#btnAddResponsable');
const busquedaCICAs = document.querySelector('#busquedaCICAs');
const searchCICAButton = document.querySelector('#searchCICAButton');
const busquedaClientes = document.querySelector('#busquedaClientes');
const searchClienteButton = document.querySelector('#searchClienteButton');
const checkBtn = document.querySelector('#checkBtn');
const extraerBtn = document.querySelector('#extraerBtn');
const loader = document.querySelector('.loader');
let timeout = null;

addEventListener('DOMContentLoaded', () => {
    btnAddEmpresa.addEventListener('click', () => {
        nuevaParamDialog('empresas');
    });
    btnAddDelegacion.addEventListener('click', () => {
        nuevaParamDialog('delegaciones');
    });
    btnAddSector.addEventListener('click', () => {
        nuevaParamDialog('sectores');
    });
    btnAddDivision.addEventListener('click', () => {
        nuevaParamDialog('divisiones');
    });
    btnAddSubdivision.addEventListener('click', () => {
        nuevaParamDialog('subdivisiones');
    });
    btnAddActividad.addEventListener('click', () => {
        nuevaParamDialog('actividades');
    });
    btnAddResponsable.addEventListener('click', () => {
        nuevaParamDialog('responsables');
    });
    btnAddCliente.addEventListener('click', () => {
        nuevoClienteDialog();
    });
    btnAddCica.addEventListener('click', () => {
        nuevoCICADialog('cicas');
    });

    busquedaCICAs.addEventListener('keyup', e => {
        if(e.keyCode === 13)
            searchCICAButton.click();
        else if(e.keyCode === 27)
            busquedaCICAs.value = '';
        else if(e.keyCode === 8 && busquedaCICAs.value.length === 0)
            return;
        else if (busquedaCICAs.value.length >= 3){
            clearTimeout(timeout);
            loader.classList.remove('d-none');
            timeout = setTimeout(() => {
                searchCICAButton.click();
                loader.classList.add('d-none');
            } , 1000);
        }
    });
    busquedaClientes.addEventListener('keyup', e => {
        if(e.keyCode === 13)
            searchClienteButton.click();
        else if(e.keyCode === 27)
            busquedaClientes.value = '';
        else if(e.keyCode === 8 && busquedaClientes.value.length === 0)
            return;
        else if (busquedaClientes.value.length >= 3){
            clearTimeout(timeout);
            loader.classList.remove('d-none');
            timeout = setTimeout(() => {
                searchClienteButton.click();
                loader.classList.add('d-none');
            } , 1000);
        }
    });

    searchCICAButton.addEventListener('click', () => {
        let busqueda = busquedaCICAs.value;
        if(busqueda.length > 0){
            let url = `/gestion/ajustes/cica/buscar/${busqueda}`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                let cicas = data.cicas;
                let tablaCICAs = document.querySelector('.tablaCICASearch').getElementsByTagName('tbody')[0];
                tablaCICAs.innerHTML = '';
                cicas.forEach(cica => {
                    let tr = document.createElement('tr');
                    let tdCica = document.createElement('td');
                    let tdSubcica = document.createElement('td');
                    let tdTipo = document.createElement('td');
                    let tdEmpresa = document.createElement('td');
                    let tdDescripcion = document.createElement('td');
                    let tdResponsable = document.createElement('td');
                    let tdCliente = document.createElement('td');
                    let tdProyecto = document.createElement('td');
                    let tdPresupuesto = document.createElement('td');
                    let tdPto = document.createElement('td');
                    let tdContrato = document.createElement('td');
                    let tdDivision = document.createElement('td');
                    let tdSubdivision = document.createElement('td');
                    let tdDelegacion = document.createElement('td');
                    let tdSector = document.createElement('td');
                    let tdActividad = document.createElement('td');
                    let tdEditar = document.createElement('td');
                    tdCica.innerText = cica.cica;
                    tdSubcica.innerText = cica.subcica;
                    tdTipo.innerText = cica.tipo;
                    tdEmpresa.innerText = cica.empresa;
                    tdDescripcion.innerText = cica.descripcion;
                    tdResponsable.innerText = cica.responsable;
                    tdCliente.innerText = cica.cliente;
                    tdProyecto.innerText = cica.proyecto;
                    tdPresupuesto.innerText = cica.id_presupuesto;
                    tdPto.innerText = cica.pto;
                    tdContrato.innerText = cica.tipo_contrato;
                    tdDivision.innerText = cica.division;
                    tdSubdivision.innerText = cica.subdivision;
                    tdDelegacion.innerText = cica.delegacion;
                    tdSector.innerText = cica.sector;
                    tdActividad.innerText = cica.actividad;
                    let linkEditar = document.createElement('a');
                    linkEditar.classList.add('editBtn');
                    linkEditar.href = `#`;
                    linkEditar.innerHTML = `<i class="fas fa-pencil"></i>`;
                    linkEditar.addEventListener('click', () => {
                        editCICADialog(cica);
                    });
                    tdEditar.appendChild(linkEditar);
                    tr.appendChild(tdCica);
                    tr.appendChild(tdSubcica);
                    tr.appendChild(tdTipo);
                    tr.appendChild(tdEmpresa);
                    tr.appendChild(tdDescripcion);
                    tr.appendChild(tdResponsable);
                    tr.appendChild(tdCliente);
                    tr.appendChild(tdProyecto);
                    tr.appendChild(tdPresupuesto);
                    tr.appendChild(tdPto);
                    tr.appendChild(tdContrato);
                    tr.appendChild(tdDivision);
                    tr.appendChild(tdSubdivision);
                    tr.appendChild(tdDelegacion);
                    tr.appendChild(tdSector);
                    tr.appendChild(tdActividad);
                    tr.appendChild(tdEditar);
                    tablaCICAs.appendChild(tr);
                }
            )}
            ).catch(err => console.log(err));
        }
    });
    searchClienteButton.addEventListener('click', () => {
        let busqueda = busquedaClientes.value;
        if(busqueda.length > 0){
            let url = `/gestion/ajustes/cliente/buscar/${busqueda}`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                let clientes = data.clientes;
                let tablaClientes = document.querySelector('.tablaClientesSearch').getElementsByTagName('tbody')[0];
                tablaClientes.innerHTML = '';
                console.log(clientes);
                clientes.forEach(cliente => {
                    let tr = document.createElement('tr');
                    let tdId = document.createElement('td');
                    let tdNombre = document.createElement('td');
                    let tdActividad = document.createElement('td');
                    let tdResponsable = document.createElement('td');
                    let tdEmpresa = document.createElement('td');
                    let tdEditar = document.createElement('td');
                    tdId.innerText = cliente.id;
                    tdNombre.innerText = cliente.nombre;
                    tdActividad.innerText = cliente.actividad;
                    tdResponsable.innerText = cliente.responsable_comercial;
                    tdEmpresa.innerText = cliente.empresa;
                    let linkEditar = document.createElement('a');
                    linkEditar.classList.add('editBtn');
                    linkEditar.href = `#`;
                    linkEditar.innerHTML = `<i class="fas fa-pencil"></i>`;
                    linkEditar.addEventListener('click', () => {
                        editClienteDialog(cliente);
                    });
                    tdEditar.appendChild(linkEditar);
                    tr.appendChild(tdId);
                    tr.appendChild(tdNombre);
                    tr.appendChild(tdActividad);
                    tr.appendChild(tdResponsable);
                    tr.appendChild(tdEmpresa);
                    tr.appendChild(tdEditar);
                    tablaClientes.appendChild(tr);
                }
            )}
            ).catch(err => console.log(err));
        }
    });

    checkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let def = false;
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        def = checkboxes[0].checked;
        checkboxes.forEach(checkbox => {
            checkbox.checked = !def;
        });
    });

    extraerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let checked = [];
        checkboxes.forEach(checkbox => {
            if(checkbox.checked)
                checked.push(checkbox.value);
        });
        // send in get request to receive file

        if(checked.length > 0){
            let url = `/gestion/ajustes/extraccion?`;
            checked.forEach(check => {
                url += `param=${check}&`;
            });

            fetch(url)
            .then(res => res.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                let date = new Date();
                let nombreArchivo = `parametros_${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}.xlsx`;
                a.download = nombreArchivo;
                a.click();
            })
            .catch(err => console.log(err));
        } else {
            Swal.fire({
                title: 'No hay datos seleccionados',
            })
        }
    });

});

const nuevaParamDialog = tipo => {
    Swal.fire({
        title: 'Introduzca los datos de la nueva paramétrica',
        html: `
            <div class="container-fluid">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID</span>
                    <input type="text" id="idParam" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                    <input type="text" id="nombreParam" class="form-control" spellcheck="false">
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const id = Swal.getPopup().querySelector('#idParam').value;
            const nombre = Swal.getPopup().querySelector('#nombreParam').value;
            if (!id || !nombre) {
                Swal.showValidationMessage(`Datos incorrectos`)
            }
            return fetch(`/gestion/ajustes/parametricas/${tipo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, nombre: nombre })
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
                title: `Paramétrica añadida`,
            }).then(() => {
                location.reload();
            })
        }
    })
}

const editParamDialog = (tipo, paramEdit) => {
    Swal.fire({
        title: 'Datos de la paramétrica',
        html: `
            <div class="container-fluid">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID</span>
                    <input type="text" id="idParam" class="form-control" value="${paramEdit.id}">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                    <input type="text" id="nombreParam" class="form-control" value="${paramEdit.nombre}" spellcheck="false">
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const id = Swal.getPopup().querySelector('#idParam').value;
            const nombre = Swal.getPopup().querySelector('#nombreParam').value;
            if (!id || !nombre) {
                Swal.showValidationMessage(`Datos incorrectos`)
            }
            return fetch(`/gestion/ajustes/parametricas/${tipo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, nombre: nombre })
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
                title: `Paramétrica añadida`,
            }).then(() => {
                location.reload();
            })
        }
    })
}

const nuevoClienteDialog = () => {
    let strAactividades = '';
    let strEmpresas = '';
    actividades.forEach(element => {
        strAactividades += `<option value="${element.id}">${element.nombre}</option>`;
    });
    empresas.forEach(element => {
        strEmpresas += `<option value="${element.id}">${element.nombre}</option>`;
    });
    Swal.fire({
        title: 'Introduzca los datos del nuevo cliente',
        width: '40em',
        html: `
            <div class="container-fluid">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID Cliente</span>
                    <input type="text" id="idCliente" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nombre Cliente</span>
                    <input type="text" id="nombreCliente" class="form-control" spellcheck="false">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Actividad</span>
                    <select id="idActividad" class="form-select">
                        <option value="0">Seleccione una actividad</option>
                        ${strAactividades}
                    </select>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Responsable Comercial</span>
                    <input type="text" id="idResp" class="form-control" spellcheck="false">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Empresa</span>
                    <select id="idEmpresa" class="form-select">
                        <option value="0">Seleccione una empresa</option>
                        ${strEmpresas}
                    </select>
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const id = Swal.getPopup().querySelector('#idCliente').value;
            const nombre = Swal.getPopup().querySelector('#nombreCliente').value;
            const actividad = Swal.getPopup().querySelector('#idActividad').value;
            const responsable = Swal.getPopup().querySelector('#idResp').value;
            const empresa = Swal.getPopup().querySelector('#idEmpresa').value;
            if (!id || !nombre || !actividad || !responsable || !empresa) {
                Swal.showValidationMessage(`Datos incorrectos`)
            }
            return fetch(`/gestion/ajustes/cliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, nombre: nombre, actividad: actividad, responsable: responsable, empresa: empresa })
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
                title: `Cliente añadido`,
            }).then(() => {
                location.reload();
            })
        }
    })
}

const editClienteDialog = clienteEdit => {
    let strAactividades = '';
    let strEmpresas = '';
    actividades.forEach(element => {
        if (element.id == clienteEdit.actividad) {
            strAactividades += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strAactividades += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    empresas.forEach(element => {
        if (element.id == clienteEdit.empresa) {
            strEmpresas += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strEmpresas += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    Swal.fire({
        title: 'Datos del cliente',
        width: '40em',
        html: `
            <div class="container-fluid">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID Cliente</span>
                    <input type="text" id="idCliente" class="form-control" value="${clienteEdit.id}">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nombre Cliente</span>
                    <input type="text" id="nombreCliente" class="form-control" value="${clienteEdit.nombre}" spellcheck="false">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Actividad</span>
                    <select id="idActividad" class="form-select">
                        <option value="0">Seleccione una actividad</option>
                        ${strAactividades}
                    </select>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Responsable Comercial</span>
                    <input type="text" id="idResp" class="form-control" value="${clienteEdit.responsable_comercial}" spellcheck="false">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Empresa</span>
                    <select id="idEmpresa" class="form-select">
                        <option value="0">Seleccione una empresa</option>
                        ${strEmpresas}
                    </select>
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const id = Swal.getPopup().querySelector('#idCliente').value;
            const nombre = Swal.getPopup().querySelector('#nombreCliente').value;
            const actividad = Swal.getPopup().querySelector('#idActividad').value;
            const responsable = Swal.getPopup().querySelector('#idResp').value;
            const empresa = Swal.getPopup().querySelector('#idEmpresa').value;
            if (!id || !nombre || !actividad || !responsable || !empresa) {
                Swal.showValidationMessage(`Datos incorrectos`)
            }
            return fetch(`/gestion/ajustes/cliente/${clienteEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, nombre: nombre, actividad: actividad, responsable: responsable, empresa: empresa })
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
                title: `Cliente actualizado`,
            }).then(() => {
                location.reload();
            })
        }
    })
}

const nuevoCICADialog = () => {
    let strAactividades = '';
    let strEmpresas = '';
    let strClientes = '';
    let strDivisiones = '';
    let strSubdivisiones = '';
    let strDelegaciones = '';
    let strSectores = '';
    let strResponsables = '';
    actividades.forEach(element => {
        strAactividades += `<option value="${element.id}">${element.nombre}</option>`;
    });
    empresas.forEach(element => {
        strEmpresas += `<option value="${element.id}">${element.nombre}</option>`;
    });
    clientes.forEach(element => {
        strClientes += `<option value="${element.id}">${element.nombre}</option>`;
    });
    divisiones.forEach(element => {
        strDivisiones += `<option value="${element.id}">${element.nombre}</option>`;
    });
    subdivisiones.forEach(element => {
        strSubdivisiones += `<option value="${element.id}">${element.nombre}</option>`;
    });
    delegaciones.forEach(element => {
        strDelegaciones += `<option value="${element.id}">${element.nombre}</option>`;
    });
    sectores.forEach(element => {
        strSectores += `<option value="${element.id}">${element.nombre}</option>`;
    });
    responsables.forEach(element => {
        strResponsables += `<option value="${element.id}">${element.nombre}</option>`;
    });

    Swal.fire({
        title: 'Introduzca los datos del nuevo CICA',
        width: '90em',
        html: `
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">CICA</span>
                            <input type="text" id="cica" class="form-control" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">SubCICA</span>
                            <input type="text" id="subCICA" class="form-control" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tipo A/M</span>
                            <input type="text" id="tipo" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Descripción</span>
                            <input type="text" id="descripcion" class="form-control" spellcheck="false">
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Responsable Comercial</span>
                            <select id="responsable" class="form-select">
                                <option value="0">Seleccione un responsable</option>
                                ${strResponsables}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Cliente</span>
                            <select id="cliente" class="form-select">
                                <option value="0">Seleccione un cliente</option>
                                ${strClientes}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Proyecto</span>
                            <input type="text" id="proyecto" class="form-control" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Presupuesto</span>
                            <input type="text" id="presupuesto" class="form-control" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">PTO</span>
                            <input type="text" id="pto" class="form-control" spellcheck="false">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Contrato</span>
                            <select id="contrato" class="form-select">
                                <option value="0">Seleccione un tipo de contrato</option>
                                <option value="1">NN</option>
                                <option value="2">Recurrente</option>
                                <option value="2">Renovación</option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">División</span>
                            <select id="division" class="form-select">
                                <option value="0">Seleccione una división</option>
                                ${strDivisiones}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Subdivisión</span>
                            <select id="subdivision" class="form-select">
                                <option value="0">Seleccione una subdivisión</option>
                                ${strSubdivisiones}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Delegación</span>
                            <select id="delegacion" class="form-select">
                                <option value="0">Seleccione una delegación</option>
                                ${strDelegaciones}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">División</span>
                            <select id="sector" class="form-select">
                                <option value="0">Seleccione un sector</option>
                                ${strSectores}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Subdivisión</span>
                            <select id="actividad" class="form-select">
                                <option value="0">Seleccione una actividad</option>
                                ${strAactividades}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const cica = Swal.getPopup().querySelector('#cica').value;
            const tipo = Swal.getPopup().querySelector('#tipo').value;
            const descripcion = Swal.getPopup().querySelector('#descripcion').value;
            const responsable = Swal.getPopup().querySelector('#responsable').value;
            const subCICA = Swal.getPopup().querySelector('#subCICA').value;
            const cliente = Swal.getPopup().querySelector('#cliente').value;
            const proyecto = Swal.getPopup().querySelector('#proyecto').value;
            const presupuesto = Swal.getPopup().querySelector('#presupuesto').value;
            const pto = Swal.getPopup().querySelector('#pto').value;
            const contrato = Swal.getPopup().querySelector('#contrato').value;
            const division = Swal.getPopup().querySelector('#division').value;
            const subdivision = Swal.getPopup().querySelector('#subdivision').value;
            const delegacion = Swal.getPopup().querySelector('#delegacion').value;
            const sector = Swal.getPopup().querySelector('#sector').value;
            const actividad = Swal.getPopup().querySelector('#actividad').value;
            return fetch(`/gestion/ajustes/cica`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cica: cica, tipo: tipo, descripcion: descripcion, responsable: responsable, subCICA: subCICA, cliente: cliente, proyecto: proyecto, presupuesto: presupuesto, pto: pto, contrato: contrato, division: division, subdivision: subdivision, delegacion: delegacion, sector: sector, actividad: actividad })
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
                title: `CICA añadido`,
            }).then(() => {
                location.reload();
            })
        }
    })
}

const editCICADialog = cicaEdit => {
    let strAactividades = '';
    let strEmpresas = '';
    let strClientes = '';
    let strDivisiones = '';
    let strSubdivisiones = '';
    let strDelegaciones = '';
    let strSectores = '';
    let strContratos = '';
    let strResponsables = '';
    actividades.forEach(element => {
        if (element.id == cicaEdit.actividad) {
            strAactividades += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strAactividades += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    empresas.forEach(element => {
        if (element.id == cicaEdit.empresa) {
            strEmpresas += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strEmpresas += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    clientes.forEach(element => {
        if (element.id == cicaEdit.cliente) {
            strClientes += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strClientes += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    divisiones.forEach(element => {
        if (element.id == cicaEdit.division) {
            strDivisiones += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strDivisiones += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    subdivisiones.forEach(element => {
        if (element.id == cicaEdit.subdivision) {
            strSubdivisiones += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strSubdivisiones += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    delegaciones.forEach(element => {
        if (element.id == cicaEdit.delegacion) {
            strDelegaciones += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strDelegaciones += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    sectores.forEach(element => {
        if (element.id == cicaEdit.sector) {
            strSectores += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strSectores += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });
    responsables.forEach(element => {
        if (element.id == cicaEdit.responsable) {
            strResponsables += `<option value="${element.id}" selected>${element.nombre}</option>`;
        } else {
            strResponsables += `<option value="${element.id}">${element.nombre}</option>`;
        }
    });

    if (cicaEdit.tipo_contrato == 'NN') {
        strContratos = `
            <option value="1" selected>NN</option>
            <option value="2">Recurrente</option>
            <option value="3">Renovación</option>
        `;
    } else if (cicaEdit.tipo_contrato == 'Recurrente') {
        strContratos = `
            <option value="1">NN</option>
            <option value="2" selected>Recurrente</option>
            <option value="3">Renovación</option>
        `;
    } else if (cicaEdit.tipo_contrato == 'Renovación') {
        strContratos = `
            <option value="1">NN</option>
            <option value="2">Recurrente</option>
            <option value="3" selected>Renovación</option>
        `;
    }

    Swal.fire({
        title: 'Introduzca los datos del nuevo CICA',
        width: '90em',
        html: `
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">CICA</span>
                            <input type="text" id="cica" class="form-control" value="${cicaEdit.cica}" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">SubCICA</span>
                            <input type="text" id="subCICA" class="form-control" value="${cicaEdit.subcica}" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tipo A/M</span>
                            <input type="text" id="tipo" class="form-control" value="${cicaEdit.tipo}" spellcheck="false">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Descripción</span>
                            <input type="text" id="descripcion" class="form-control" value="${cicaEdit.descripcion}" spellcheck="false">
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Responsable Comercial</span>
                            <select id="responsable" class="form-select">
                                <option value="0">Seleccione un responsable</option>
                                ${strResponsables}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Cliente</span>
                            <select id="cliente" class="form-select">
                                <option value="0">Seleccione un cliente</option>
                                ${strClientes}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Proyecto</span>
                            <input type="text" id="proyecto" class="form-control" value="${cicaEdit.proyecto}" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Presupuesto</span>
                            <input type="text" id="presupuesto" class="form-control" value="${cicaEdit.id_presupuesto}" spellcheck="false">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">PTO</span>
                            <input type="text" id="pto" class="form-control" value="${cicaEdit.pto}" spellcheck="false">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Contrato</span>
                            <select id="contrato" class="form-select">
                                <option value="0">Seleccione un tipo de contrato</option>
                                ${strContratos}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">División</span>
                            <select id="division" class="form-select">
                                <option value="0">Seleccione una división</option>
                                ${strDivisiones}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Subdivisión</span>
                            <select id="subdivision" class="form-select">
                                <option value="0">Seleccione una subdivisión</option>
                                ${strSubdivisiones}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Delegación</span>
                            <select id="delegacion" class="form-select">
                                <option value="0">Seleccione una delegación</option>
                                ${strDelegaciones}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">División</span>
                            <select id="sector" class="form-select">
                                <option value="0">Seleccione un sector</option>
                                ${strSectores}
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Subdivisión</span>
                            <select id="actividad" class="form-select">
                                <option value="0">Seleccione una actividad</option>
                                ${strAactividades}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const cica = Swal.getPopup().querySelector('#cica').value;
            const tipo = Swal.getPopup().querySelector('#tipo').value;
            const descripcion = Swal.getPopup().querySelector('#descripcion').value;
            const responsable = Swal.getPopup().querySelector('#responsable').value;
            const subCICA = Swal.getPopup().querySelector('#subCICA').value;
            const cliente = Swal.getPopup().querySelector('#cliente').value;
            const proyecto = Swal.getPopup().querySelector('#proyecto').value;
            const id_presupuesto = Swal.getPopup().querySelector('#presupuesto').value;
            const pto = Swal.getPopup().querySelector('#pto').value;
            const tipo_contrato = Swal.getPopup().querySelector('#contrato').value;
            const division = Swal.getPopup().querySelector('#division').value;
            const subdivision = Swal.getPopup().querySelector('#subdivision').value;
            const delegacion = Swal.getPopup().querySelector('#delegacion').value;
            const sector = Swal.getPopup().querySelector('#sector').value;
            const actividad = Swal.getPopup().querySelector('#actividad').value;
            return fetch(`/gestion/ajustes/cica/${cicaEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cica: cica, tipo: tipo, descripcion: descripcion, responsable: responsable, subCICA: subCICA, cliente: cliente, proyecto: proyecto, presupuesto: id_presupuesto, pto: pto, contrato: tipo_contrato, division: division, subdivision: subdivision, delegacion: delegacion, sector: sector, actividad: actividad})
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
                title: `CICA actualizado`,
            }).then(() => {
                location.reload();
            })
        }
    })
}
