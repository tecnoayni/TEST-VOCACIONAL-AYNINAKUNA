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
        paginaActual: 5
    };

    for (let i = 31; i <= 40; i++) {

        const respuesta = document.querySelector(`input[name="p${i}"]:checked`);

        if (!respuesta) {
            alert(`Debe responder la pregunta ${i}.`);
            return;
        }

        datosActualizar[`respuestas.P${i}`] = respuesta.value;
    }

    try {

        await updateDoc(
            doc(db, "datosEstudiante", idEstudiante),
            datosActualizar
        );

        window.location.href = "psico5.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar las respuestas.");

    }

});