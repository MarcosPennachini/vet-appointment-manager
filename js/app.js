import { validarFormulario } from "./functions.js";

/* -------------
*   VARIABLES 
---------------- */

export const mascotaInput = document.querySelector('#mascota');
export const propietarioInput = document.querySelector('#propietario');
export const telefonoInput = document.querySelector('#telefono');
export const fechaInput = document.querySelector('#fecha');
export const horaInput = document.querySelector('#hora');
export const sintomasInput = document.querySelector('#sintomas');
export const formulario = document.querySelector('#nueva-cita');
export const ulCitas = document.querySelector('#citas');

// Objeto flag cuando se activa la edición
export let editando = {
    estado: false, 
    identificador: ''
};

/* -------------
*   EVENTOS 
---------------- */

formulario.addEventListener('submit', validarFormulario);

