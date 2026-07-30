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

            "arquitectura.C71": document.getElementById("C71").value,
            "arquitectura.C72": document.getElementById("C72").value,
            "arquitectura.C73": document.getElementById("C73").value,
            "arquitectura.C74": document.getElementById("C74").value,
            "arquitectura.C75": document.getElementById("C75").value,
            "arquitectura.C76": document.getElementById("C76").value,
            "arquitectura.C77": document.getElementById("C77").value,
            "arquitectura.C78": document.getElementById("C78").value

        });

        window.location.href = "TestMil.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar las respuestas.");

    }

});