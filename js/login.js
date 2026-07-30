import { auth } from "./firebase-config.js";

import {

signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const correo=document.getElementById("correo");

const password=document.getElementById("password");

const btn=document.getElementById("btnLogin");

const mensaje=document.getElementById("mensaje");

btn.addEventListener("click",async()=>{

    mensaje.textContent="";

    try{

        const credencial=await signInWithEmailAndPassword(

            auth,

            correo.value,

            password.value

        );

        localStorage.setItem(

            "uid",

            credencial.user.uid

        );

        window.location.href="datos.html";

    }

    catch(error){

        mensaje.textContent="Correo o contraseña incorrectos.";

    }

});
