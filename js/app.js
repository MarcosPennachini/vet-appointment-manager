/* -------------
*   VARIABLES 
---------------- */

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const ulCitas = document.querySelector('#citas');

// Objeto flag cuando se activa la edición
let editando = {
    estado: false, 
    identificador: ''
};


/* -------------
*   CLASES 
---------------- */

class cita {
    constructor(){
        this.citas = [];
    }

    cargarCitas(citaObj){
        this.citas = [...this.citas, citaObj];
        console.log(this.citas);
    }

    eliminarCita(identificador){
        this.citas = this.citas.filter((cita) => cita.id != identificador);
        ui.imprimirHTML(citas);
    }

    obtenerCita(identificador){
        const auxCitas = this.citas.filter((cita) => cita.id == identificador);
        return auxCitas;
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }
}

class UI {

    mostrarAlerta(mensaje, tipo){
        if (tipo === 'error'){
            formulario.insertAdjacentHTML('afterbegin', `<div class="alert alert-danger" role="alert">${mensaje}</div>`);
        } else {
            formulario.insertAdjacentHTML('afterbegin', `<div class="alert alert-success" role="alert">${mensaje}</div>`);
        }
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3500);
    }

    resetForm(){
        formulario.reset();
    }

    imprimirHTML({citas}){
        this.limpiarHtml();
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            ulCitas.insertAdjacentHTML('beforeend', `<li class="list-group-item" data-id="${id}"><h3>${mascota}</h3> <p><small>Propietario:</small> ${propietario}</p> <p><small>Teléfono:</small> ${telefono}</p> <p><small>Fecha:</small> ${fecha}</p> <p><small>Hora:</small> ${hora}</p> <p><span class="badge badge-primary badge-pill"> ${sintomas} </span></p> <button type="button" class="btn btn-outline-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Eliminar</button> <button type="button" class="btn btn-outline-info btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>Editar</button> </li>`);
        });

        // Evento del botón "eliminar"
        const btnEliminar = document.querySelectorAll('.btn-outline-danger');
        btnEliminar.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const id = e.target.parentElement.getAttribute('data-id');
                llamaEliminarCita(id);
            });
        })

        // Evento del botón "editar"
        const btnEditar = document.querySelectorAll('.btn-outline-info');
        btnEditar.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                const id = e.target.parentElement.getAttribute('data-id');
                cargarEdicion(id);
            });
        })
    }

    limpiarHtml(){
        while (ulCitas.firstChild){
            ulCitas.removeChild(ulCitas.firstChild);
        }
    }
}

// Instancias
const citas = new cita();
const ui = new UI();

/* -------------
*   EVENTOS 
---------------- */

formulario.addEventListener('submit', validarFormulario);

/* -------------
*   FUNCIONES 
---------------- */

function validarFormulario(e){
    e.preventDefault();
    
    if (mascotaInput.value === '' || propietarioInput.value === '' || telefonoInput.value === '' || fechaInput.value === '' || horaInput.value === '' || sintomasInput.value === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
    } else {

        // Modo edición
        if (editando.estado){
            console.log('Modo edición');

            // Objeto local con las modificaciones de los inputs
            const editadoObj = {
                id: editando.identificador,
                mascota: mascotaInput.value,
                propietario: propietarioInput.value,
                telefono: telefonoInput.value,
                fecha: fechaInput.value,
                hora: horaInput.value,
                sintomas: sintomasInput.value
            }
            citas.editarCita(editadoObj);
            formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
            ui.mostrarAlerta('La cita se actualizó correctamente', 'success');
            editando.estado = false;

        } else {
            console.log('Modo Crear');
            const datosObj = {
                id: Date.now(),
                mascota: mascotaInput.value,
                propietario: propietarioInput.value,
                telefono: telefonoInput.value,
                fecha: fechaInput.value,
                hora: horaInput.value,
                sintomas: sintomasInput.value
            }
            
            citas.cargarCitas(datosObj);
            ui.mostrarAlerta('La cita se cargó correctamente', 'exito');
        }
        ui.resetForm();
        ui.imprimirHTML(citas);
    }
}

function llamaEliminarCita(id){
    citas.eliminarCita(id);
}

function cargarEdicion(identificador){

    //Obtiene los datos de la cita
    const auxCitas = citas.obtenerCita(identificador);
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = auxCitas[0];

    // CArga los datos en los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando.estado = true;
    editando.identificador = id;
}