// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyArt75lYAbu0hIEi5VyjSnHqh_mF-1N9cs",
    authDomain: "test-vocacional-c0ff2.firebaseapp.com",
    projectId: "test-vocacional-c0ff2",
    storageBucket: "test-vocacional-c0ff2.firebasestorage.app",
    messagingSenderId: "552677620980",
    appId: "1:552677620980:web:73ed6e9e01e1fe9739f2a1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Authentication
const auth = getAuth(app);

// Exportar
export { db, auth };