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
        paginaActual: "TestEA"
    };


    // Preguntas SI / NO

    for (let i = 1; i <= 3; i++) {


        const respuesta = document.querySelector(
            `input[name="pregunta${i}"]:checked`
        );


        if (!respuesta) {

            alert(`Debe responder la pregunta ${i}`);
            return;

        }


        datosActualizar[`personalidad.pregunta${i}`] = respuesta.value;

    }



    // Pregunta 4 - Estilo de aprendizaje

    let aprendizaje = [];

    document.querySelectorAll(
        'input[type="checkbox"]:checked'
    ).forEach(check => {

        if (
            check.value === "Visual" ||
            check.value === "Auditivo" ||
            check.value === "Kinestético/Táctil"
        ) {
            aprendizaje.push(check.value);
        }

    });


    if (aprendizaje.length === 0) {

        alert("Seleccione al menos un estilo de aprendizaje.");
        return;

    }


    datosActualizar["personalidad.aprendizaje"] = aprendizaje;




    // Pregunta 5 - Inteligencias múltiples

    let inteligencias = [];


    const valoresInteligencia = [
        "Verbal/lingüístico",
        "Lógica/Matematica",
        "visual/Espacial",
        "Kinestético/Táctil",
        "Naturalista",
        "Musical/Ritmica",
        "Interpersonal",
        "Intrapersonal"
    ];


    document.querySelectorAll(
        'input[type="checkbox"]:checked'
    ).forEach(check => {


        if (valoresInteligencia.includes(check.value)) {

            inteligencias.push(check.value);

        }


    });



    if (inteligencias.length < 2) {

        alert("Seleccione mínimo 2 inteligencias múltiples.");
        return;

    }


    datosActualizar["personalidad.inteligencias"] = inteligencias;




    // Pregunta 6 - Personalidad vocacional

    let personalidad = [];


    const tiposPersonalidad = [
        "Realista",
        "Investigativa",
        "Artística",
        "Social",
        "Empresarial",
        "Convencional"
    ];


    document.querySelectorAll(
        'input[type="checkbox"]:checked'
    ).forEach(check => {


        if (tiposPersonalidad.includes(check.value)) {

            personalidad.push(check.value);

        }


    });



    if (personalidad.length < 3) {

        alert("Seleccione mínimo 3 tipos de personalidad.");
        return;

    }


    datosActualizar["personalidad.tiposVocacionales"] = personalidad;




    try {


        await updateDoc(

            doc(db, "datosEstudiante", idEstudiante),

            datosActualizar

        );


        window.location.href = "intMulti1.html";


    } catch(error) {


        console.error(error);

        alert("Error guardando personalidad");


    }


});