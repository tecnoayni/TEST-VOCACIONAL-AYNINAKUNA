import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

document.querySelector(".btn-siguiente").addEventListener("click", async () => {

    const idEstudiante = localStorage.getItem("idEstudiante");

    if (!idEstudiante) {
        alert("No se encontró el registro del estudiante.");
        return;
    }

    try {

        await updateDoc(doc(db, "datosEstudiante", idEstudiante), {

            "medicina.C58": document.getElementById("C58").value,
            "medicina.C59": document.getElementById("C59").value,
            "medicina.C60": document.getElementById("C60").value,
            "medicina.C61": document.getElementById("C61").value,
            "medicina.C62": document.getElementById("C62").value,
            "medicina.C63": document.getElementById("C63").value,
            "medicina.C64": document.getElementById("C64").value,
            "medicina.C65": document.getElementById("C65").value,
            "medicina.C66": document.getElementById("C66").value,
            "medicina.C67": document.getElementById("C67").value,
            "medicina.C68": document.getElementById("C68").value,
            "medicina.C69": document.getElementById("C69").value,
            "medicina.C70": document.getElementById("C70").value

        });

        window.location.href = "TestArq.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar las respuestas.");

    }

});