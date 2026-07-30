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

            "militar.C79": document.getElementById("C79").value,
            "militar.C80": document.getElementById("C80").value,
            "militar.C81": document.getElementById("C81").value,
            "militar.C82": document.getElementById("C82").value,
            "militar.C83": document.getElementById("C83").value,
            "militar.C84": document.getElementById("C84").value,
            "militar.C85": document.getElementById("C85").value,
            "militar.C86": document.getElementById("C86").value,
            "militar.C87": document.getElementById("C87").value

        });

        window.location.href = "TestTS.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar las respuestas.");

    }

});