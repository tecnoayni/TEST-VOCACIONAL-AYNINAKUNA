import { db } from "./firebase-config.js";
import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const btn = document.getElementById("btnSiguiente");

btn.addEventListener("click", async () => {

    const idEstudiante = localStorage.getItem("idEstudiante");

    if (!idEstudiante) {
        alert("No se encontró el estudiante. Vuelva a iniciar el test.");
        window.location.href = "index.html";
        return;
    }

    const respuestas = {};

    // Obtener respuestas de las 10 preguntas
    for (let i = 1; i <= 10; i++) {

        const seleccion = document.querySelector(`input[name="p${i}"]:checked`);

        if (!seleccion) {
            alert(`Debe responder la pregunta ${i}.`);
            return;
        }

        respuestas[`P${i}`] = seleccion.value;
    }

    try {

        await updateDoc(doc(db, "datosEstudiante", idEstudiante), {

            respuestas,
            paginaActual: 2

        });

        window.location.href = "psico2.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar las respuestas.");

    }

});