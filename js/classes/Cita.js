import { ui } from "../functions.js";

export class Cita {
    constructor(){
        this.citas = [];
    }

    cargarCitas(citaObj){
        this.citas = [...this.citas, citaObj];
        console.log(this.citas);
    }

    eliminarCita(identificador){
        this.citas = this.citas.filter((cita) => cita.id != identificador);
        //ui.imprimirHTML(this.citas);
    }

    obtenerCita(identificador){
        const auxCitas = this.citas.filter((cita) => cita.id == identificador);
        return auxCitas;
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }
}
