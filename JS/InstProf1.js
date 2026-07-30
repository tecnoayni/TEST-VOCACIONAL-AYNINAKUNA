import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

console.log("TestTecSup cargado");

const TECNICOS = [

    "auxEnfer",
    "Diseño",
    "Constru",
    "Topografo",
    "Radiologia",
    "Instrumentador"

];

const SECCIONES = [

    "P",
    "S",
    "E"

];



function obtenerSeleccion(nombre){

    const seleccionado =
    document.querySelector(
        `input[name="${nombre}"]:checked`
    );

    return seleccionado ?
        seleccionado.value :
        null;

}



function validarRespuestas(){

    let faltantes = [];

    TECNICOS.forEach(tecnico => {

        SECCIONES.forEach(seccion => {

            const nombre = tecnico + seccion;

            if(!obtenerSeleccion(nombre)){

                faltantes.push(nombre);

            }

        });

    });



    if(faltantes.length > 0){

        alert(
            "Debes responder todas las opciones antes de continuar."
        );

        return false;

    }

    return true;

}



function recolectarDatos(){

    const datos = {};

    TECNICOS.forEach(tecnico => {

        SECCIONES.forEach(seccion => {

            const nombre = tecnico + seccion;

            datos[`vocacionalTecnico.${nombre}`] =
                obtenerSeleccion(nombre);

        });

    });

    return datos;

}



document
.getElementById("btnSiguiente")
.addEventListener(
"click",
async()=>{

    console.log("Botón presionado");

    const idEstudiante =
    localStorage.getItem("idEstudiante");

    console.log(
        "ID:",
        idEstudiante
    );

    if(!idEstudiante){

        alert(
            "No se encontró el estudiante."
        );

        return;

    }

    if(!validarRespuestas()){

        return;

    }

    const datos =
    recolectarDatos();

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

        console.log(
            "Guardado correctamente"
        );

        window.location.href =
        "TestIntProf2.html";

    }
    catch(error){

        console.error(
            "Error:",
            error
        );

        alert(
            "Ocurrió un error al guardar."
        );

    }

});