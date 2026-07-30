import { db } from "./firebase-config.js";
import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

console.log("TS cargado");

document.querySelector(".btn-siguiente").addEventListener("click", async () => {

    console.log("Botón presionado");

    const idEstudiante = localStorage.getItem("idEstudiante");
    console.log("ID:", idEstudiante);

    try {

        const datos = {
            "social.C88": document.getElementById("C88").value,
            "social.C89": document.getElementById("C89").value,
            "social.C90": document.getElementById("C90").value,
            "social.C91": document.getElementById("C91").value,
            "social.C92": document.getElementById("C92").value,
            "social.C93": document.getElementById("C93").value,
            "social.C94": document.getElementById("C94").value
        };

        console.log(datos);

        await updateDoc(doc(db, "datosEstudiante", idEstudiante), datos);

        console.log("Guardado correctamente");

        window.location.href = "TestDer.html";

    } catch (error) {
        console.error(error);
    }

});