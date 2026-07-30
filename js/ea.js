import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


const btn = document.querySelector(".btn-siguiente");


btn.addEventListener("click", async () => {

    const idEstudiante = localStorage.getItem("idEstudiante");

    if (!idEstudiante) {
        alert("No se encontró el estudiante.");
        window.location.href = "index.html";
        return;
    }

    const datosActualizar = {

        paginaActual: "TestPE"

    };


    // Guardar respuestas de Economía y Administración
    for (let i = 1; i <= 22; i++) {

        const respuesta = document.getElementById(`C${i}`);

        if (!respuesta) {
            alert(`Falta la pregunta ${i}`);
            return;
        }

        datosActualizar[`economiaAdministracion.C${i}`] = respuesta.value;

    }


    try {

        await updateDoc(
            doc(db, "datosEstudiante", idEstudiante),
            datosActualizar
        );

        window.location.href = "TestPE.html";

    } catch (error) {

        console.error(error);
        alert("Error guardando Economía y Administración");

    }

});