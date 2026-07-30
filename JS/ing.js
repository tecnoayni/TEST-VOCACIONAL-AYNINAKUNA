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

            "ingenieria.C36": document.getElementById("C36").value,
            "ingenieria.C37": document.getElementById("C37").value,
            "ingenieria.C38": document.getElementById("C38").value,
            "ingenieria.C39": document.getElementById("C39").value,
            "ingenieria.C40": document.getElementById("C40").value,
            "ingenieria.C41": document.getElementById("C41").value,
            "ingenieria.C42": document.getElementById("C42").value,
            "ingenieria.C43": document.getElementById("C43").value,
            "ingenieria.C44": document.getElementById("C44").value,
            "ingenieria.C45": document.getElementById("C45").value,
            "ingenieria.C46": document.getElementById("C46").value,
            "ingenieria.C47": document.getElementById("C47").value,
            "ingenieria.C48": document.getElementById("C48").value,
            "ingenieria.C49": document.getElementById("C49").value,
            "ingenieria.C50": document.getElementById("C50").value,
            "ingenieria.C51": document.getElementById("C51").value,
            "ingenieria.C52": document.getElementById("C52").value,
            "ingenieria.C53": document.getElementById("C53").value,
            "ingenieria.C54": document.getElementById("C54").value,
            "ingenieria.C55": document.getElementById("C55").value,
            "ingenieria.C56": document.getElementById("C56").value,
            "ingenieria.C57": document.getElementById("C57").value

        });

        window.location.href = "TestMed.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar las respuestas.");

    }

});