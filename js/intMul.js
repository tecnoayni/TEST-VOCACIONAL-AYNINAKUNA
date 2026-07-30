import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

console.log("Test Inteligencias cargado");

document.getElementById("guardar").addEventListener("click", async (e) => {

    e.preventDefault();

    const idEstudiante = localStorage.getItem("idEstudiante");

    if (!idEstudiante) {

        alert("No se encontró el estudiante.");

        return;

    }

    const datos = {};

    // Recorre las 80 preguntas
    for (let i = 1; i <= 80; i++) {

        const respuesta = document.querySelector(`input[name="p${i}"]:checked`);

        if (respuesta) {

            datos[`inteligencias.p${i}`] = Number(respuesta.value);

        }

    }

    try {

        await updateDoc(
            doc(db, "datosEstudiante", idEstudiante),
            datos
        );

        console.log("Inteligencias guardadas");

        window.location.href = "TestEA.html";

    } catch (error) {

        console.error(error);

        alert("Ocurrió un error al guardar.");

    }

});