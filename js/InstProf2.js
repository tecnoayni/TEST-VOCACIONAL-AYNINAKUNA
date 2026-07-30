import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

console.log("TestOcupaciones cargado");

const OCUPACIONES = [

    "peluqueria",
    "carpinteria",
    "chef",
    "costura",
    "chofer",
    "artesano",
    "soldador",
    "pintor",
    "albanil"

];

const SECCIONES = [

    "P",
    "S",
    "E"

];



// ===============================
// CREAR TABLA
// ===============================

const tbody = document.getElementById("tablaBody");

OCUPACIONES.forEach((ocupacion, index) => {

    const nombres = {

        peluqueria: "Peluquería",
        carpinteria: "Carpintería",
        chef: "Chef",
        costura: "Costura",
        chofer: "Chofer",
        artesano: "Artesano",
        soldador: "Soldador",
        pintor: "Pintor",
        albanil: "Albañil"

    };

    const tr = document.createElement("tr");

    tr.innerHTML = `

        <td>${index + 1}) ${nombres[ocupacion]}</td>

        <td><input type="radio" name="${ocupacion}P" value="D"></td>
        <td><input type="radio" name="${ocupacion}P" value="R"></td>
        <td><input type="radio" name="${ocupacion}P" value="E"></td>

        <td><input type="radio" name="${ocupacion}S" value="1"></td>
        <td><input type="radio" name="${ocupacion}S" value="2"></td>
        <td><input type="radio" name="${ocupacion}S" value="3"></td>

        <td><input type="radio" name="${ocupacion}E" value="1"></td>
        <td><input type="radio" name="${ocupacion}E" value="2"></td>
        <td><input type="radio" name="${ocupacion}E" value="3"></td>

    `;

    tbody.appendChild(tr);

});



// ===============================
// OBTENER RESPUESTA
// ===============================

function obtenerSeleccion(nombre){

    const seleccionado =
    document.querySelector(`input[name="${nombre}"]:checked`);

    return seleccionado ? seleccionado.value : null;

}



// ===============================
// VALIDAR
// ===============================

function validar(){

    for(const ocupacion of OCUPACIONES){

        for(const seccion of SECCIONES){

            if(!obtenerSeleccion(ocupacion + seccion)){

                alert("Por favor responde todas las opciones antes de enviar.");

                return false;

            }

        }

    }

    return true;

}



// ===============================
// RECOLECTAR DATOS
// ===============================

function recolectarDatos(){

    const datos = {};

    OCUPACIONES.forEach(ocupacion => {

        SECCIONES.forEach(seccion => {

            datos[`vocacionalOcupacion.${ocupacion}${seccion}`] =
                obtenerSeleccion(ocupacion + seccion);

        });

    });

    return datos;

}



// ===============================
// GUARDAR
// ===============================

document.getElementById("btnEnviar").addEventListener("click", async () => {

    const idEstudiante =
        localStorage.getItem("idEstudiante");

    if(!idEstudiante){

        alert("No se encontró el estudiante.");

        return;

    }

    if(!validar()){

        return;

    }

    const datos = recolectarDatos();

    console.log(datos);

    try{

        await updateDoc(

            doc(
                db,
                "datosEstudiante",
                idEstudiante
            ),

            datos

        );

        console.log("Guardado correctamente");

        window.location.href = "resultados.html";

    }
    catch(error){

        console.error(error);

        alert("Ocurrió un error al guardar.");

    }

});