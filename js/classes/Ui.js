import { llamaEliminarCita, cargarEdicion } from "../functions.js";
import { formulario, ulCitas } from "../app.js";

export class UI {

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