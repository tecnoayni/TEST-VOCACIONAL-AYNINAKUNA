import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

console.log("der.js cargado");

document.querySelector(".btn-siguiente").addEventListener("click", async () => {

    console.log("Botón presionado");

    const idEstudiante = localStorage.getItem("idEstudiante");
    console.log("ID:", idEstudiante);

    if (!idEstudiante) {
        alert("No se encontró el registro del estudiante.");
        return;
    }

    try {

        const datos = {
            "derecho.C95": document.getElementById("C95").value,
            "derecho.C96": document.getElementById("C96").value,
            "derecho.C97": document.getElementById("C97").value,
            "derecho.C98": document.getElementById("C98").value,
            "derecho.C99": document.getElementById("C99").value,
            "derecho.C100": document.getElementById("C100").value
        };

        console.log(datos);

        await updateDoc(doc(db, "datosEstudiante", idEstudiante), datos);

        console.log("Guardado correctamente");

        window.location.href = "TestInstProf.html";

    } catch (error) {

        console.error("ERROR FIREBASE:", error);
        alert(error.message);

    }

});