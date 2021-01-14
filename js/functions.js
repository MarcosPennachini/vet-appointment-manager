import { editando, mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './app.js';
import { Cita } from "./classes/Cita.js";
import { UI } from "./classes/Ui.js";

// Instancias
export const citas = new Cita();
export const ui = new UI();


/* -------------
*   FUNCIONES 
---------------- */

export function validarFormulario(e){
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

export function llamaEliminarCita(identificador){
    citas.eliminarCita(identificador);
    ui.imprimirHTML(citas);
}

export function cargarEdicion(identificador){

    //Obtiene los datos de la cita
    const auxCitas = citas.obtenerCita(identificador);
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = auxCitas[0];

    // Carga los datos en los inputs
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