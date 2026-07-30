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
        return;
    }

    try {

        await updateDoc(doc(db, "datosEstudiante", idEstudiante), {

            personalidad: {
                C23: document.getElementById("C23").value,
                C24: document.getElementById("C24").value,
                C25: document.getElementById("C25").value,
                C26: document.getElementById("C26").value,
                C27: document.getElementById("C27").value,
                C28: document.getElementById("C28").value,
                C29: document.getElementById("C29").value,
                C30: document.getElementById("C30").value,
                C31: document.getElementById("C31").value,
                C32: document.getElementById("C32").value,
                C33: document.getElementById("C33").value,
                C34: document.getElementById("C34").value,
                C35: document.getElementById("C35").value
            }

        });

        window.location.href = "TestING.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar las respuestas.");

    }

});