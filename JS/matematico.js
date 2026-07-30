import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


const btn = document.getElementById("btnSiguiente");


btn.addEventListener("click", async () => {


    const idEstudiante = localStorage.getItem("idEstudiante");


    if (!idEstudiante) {

        alert("No se encontró el estudiante.");
        window.location.href = "index.html";
        return;

    }


    const datosActualizar = {

        paginaActual: "TestPerson"

    };


    // Guardar respuestas matemáticas

    for (let i = 1; i <= 20; i++) {


        const respuesta = document.querySelector(
            `input[name="pregunta${i}"]:checked`
        );


        if (!respuesta) {

            alert(`Debe responder el ejercicio ${i}`);
            return;

        }


        datosActualizar[`matematico.pregunta${i}`] = respuesta.value;


    }



    try {


        await updateDoc(

            doc(db, "datosEstudiante", idEstudiante),

            datosActualizar

        );


        window.location.href = "TestPerson.html";


    } catch(error) {


        console.error(error);

        alert("Error guardando el test matemático");


    }



});