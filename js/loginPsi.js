import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const btn = document.getElementById("btnLogin");

// Cambia este correo cuando tengas el definitivo
const CORREO_AUTORIZADO = "psicologa@ayninakuna.org";

btn.addEventListener("click", async () => {

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    if (!correo || !password) {
        alert("Complete todos los campos.");
        return;
    }

    try {

        const credencial = await signInWithEmailAndPassword(
            auth,
            correo,
            password
        );

        // Verificar que sea el correo autorizado
        if (credencial.user.email !== CORREO_AUTORIZADO) {

            await signOut(auth);

            alert("No tiene permisos para acceder.");

            return;
        }

        // Acceso correcto
        window.location.href = "reporte.html";

    } catch (error) {

        alert("Correo o contraseña incorrectos.");
        console.error(error);

    }

});
