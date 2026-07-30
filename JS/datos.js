import { db } from "./firebase-config.js";
import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const btn = document.getElementById("btnSiguiente");

btn.addEventListener("click", async () => {

    // Datos del estudiante
    const carnet = document.querySelector('input[name="carnet"]').value.trim();
    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const correo = document.querySelector('input[name="correo"]').value.trim();
    const celular = document.querySelector('input[name="celular"]').value.trim();
    const unidad = document.querySelector('input[name="unidad"]').value.trim();
    const fechaNacimiento = document.querySelector('input[name="fecha"]').value;
    const edad = document.querySelector('input[name="edad"]').value;
    const sexo = document.querySelector('select[name="sexo"]').value;
    const curso = document.querySelector('input[name="curso"]').value.trim();
    const hobbies = document.querySelector("textarea").value.trim();

    // Validación básica
    if (
        carnet === "" ||
        nombre === "" ||
        correo === "" ||
        unidad === "" ||
        sexo === ""
    ) {
        alert("Complete los campos obligatorios.");
        return;
    }

    try {

        const docRef = await addDoc(collection(db, "datosEstudiante"), {

            carnet,
            nombre,
            correo,
            celular,
            unidadEducativa: unidad,
            fechaNacimiento,
            edad: Number(edad),
            sexo,
            curso,
            hobbies,

            estado: "En progreso",
            paginaActual: 1,

            fechaInicio: serverTimestamp(),

            respuestas: {}

        });

        // Guardar el ID para las siguientes páginas
        localStorage.setItem("idEstudiante", docRef.id);

        // Ir a la siguiente página
        window.location.href = "psico1.html";

    } catch (error) {

        console.error(error);
        alert("Error al guardar la información.");

    }

});