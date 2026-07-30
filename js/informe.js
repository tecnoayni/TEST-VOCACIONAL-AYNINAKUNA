import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const tabla = document.getElementById("tablaEstudiantes");
const txtBuscar = document.getElementById("txtBuscar");
const btnBuscar = document.getElementById("btnBuscar");

const modal = document.getElementById("modalDetalle");
const contenidoModal = document.getElementById("contenidoModal");
const cerrarModal = document.getElementById("cerrarModal");

const btnCrearPDF = document.getElementById("btnCrearPDF");
const btnDescargarPDF = document.getElementById("btnDescargarPDF");

let estudiantes = [];
let estudianteActual = null;
let pdfActual = null;

/*==========================================
CARGAR ESTUDIANTES
==========================================*/

async function cargarEstudiantes() {

    tabla.innerHTML = `
        <tr>
            <td colspan="7">Cargando estudiantes...</td>
        </tr>
    `;

    try {

        const consulta = await getDocs(collection(db, "datosEstudiante"));

        estudiantes = [];

        consulta.forEach(documento => {

            const d = documento.data();

            estudiantes.push({
                id: documento.id,
                nombre: d.nombre || "",
                edad: d.edad || "",
                colegio: d.unidadEducativa || "",
                fecha: d.fechaInicio || "",
                estado: "Finalizado",
                datos: d
            });

        });

        mostrarTabla(estudiantes);

    } catch (error) {

        console.error(error);

        tabla.innerHTML = `
            <tr>
                <td colspan="7">Error al cargar estudiantes.</td>
            </tr>
        `;

    }

}

/*==========================================
MOSTRAR TABLA
==========================================*/

function mostrarTabla(lista) {

    tabla.innerHTML = "";

    if (lista.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="7">No existen registros.</td>
            </tr>
        `;
        return;
    }

    lista.forEach((estudiante, i) => {

        tabla.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.edad}</td>
            <td>${estudiante.colegio}</td>
            <td>${formatearFecha(estudiante.fecha)}</td>
            <td>${estudiante.estado}</td>
            <td>
                <div class="acciones-tabla">
                    <button class="btn-ver" data-id="${estudiante.id}">Ver</button>
                </div>
            </td>
        </tr>
        `;

    });

    agregarEventos();

}

/*==========================================
BUSCADOR
==========================================*/

txtBuscar.addEventListener("keyup", () => filtrarEstudiantes());

if (btnBuscar) {
    btnBuscar.addEventListener("click", () => filtrarEstudiantes());
}

function filtrarEstudiantes() {
    const texto = txtBuscar.value.toLowerCase();
    const filtrados = estudiantes.filter(e => e.nombre.toLowerCase().includes(texto));
    mostrarTabla(filtrados);
}

/*==========================================
EVENTOS DE LOS BOTONES DE LA TABLA
==========================================*/

function agregarEventos() {

    document.querySelectorAll(".btn-ver").forEach(btn => {
        btn.onclick = () => abrirModal(btn.dataset.id);
    });

}

/*==========================================
ABRIR MODAL Y MOSTRAR INFORMACIÓN
==========================================*/

async function abrirModal(id) {

    modal.classList.add("activo");

    contenidoModal.innerHTML = "<p>Cargando información...</p>";

    btnDescargarPDF.disabled = true;
    pdfActual = null;

    try {

        const referencia = doc(db, "datosEstudiante", id);
        const documento = await getDoc(referencia);

        if (!documento.exists()) {
            contenidoModal.innerHTML = "<p>No existe el estudiante.</p>";
            return;
        }

        estudianteActual = documento.data();

        mostrarInformacion();

    } catch (error) {
        console.error(error);
        contenidoModal.innerHTML = "<p>Error al cargar la información.</p>";
    }

}

/*==========================================
CERRAR MODAL
==========================================*/

cerrarModal.onclick = () => modal.classList.remove("activo");

window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("activo");
};

/*==========================================
FORMATEAR FECHA
==========================================*/

function formatearFecha(fecha) {
    if (!fecha) return "";
    try {
        if (fecha.toDate) return fecha.toDate().toLocaleString("es-BO");
        return fecha;
    } catch {
        return fecha;
    }
}

/*==========================================
MOSTRAR INFORMACIÓN EN EL MODAL (HTML)
==========================================*/

function mostrarInformacion() {

    const d = estudianteActual;

    let html = "";

    html += `<h3>Datos Personales</h3>`;
    html += tablaDatosHTML([
        ["Nombre", d.nombre],
        ["Carnet", d.carnet],
        ["Edad", d.edad],
        ["Sexo", d.sexo],
        ["Celular", d.celular],
        ["Correo", d.correo],
        ["Unidad Educativa", d.unidadEducativa],
        ["Curso", d.curso],
        ["Fecha", formatearFecha(d.fechaInicio)]
    ]);

    if (d.respuestas) html += seccionObjetoHTML("CHASIDE", d.respuestas);
    if (d.personalidad) html += seccionObjetoHTML("Personalidad", d.personalidad);
    if (d.social) html += seccionObjetoHTML("Área Social", d.social);
    if (d.matematico) html += seccionObjetoHTML("Área Matemática", d.matematico);
    if (d.ingenieria) html += seccionObjetoHTML("Ingeniería", d.ingenieria);
    if (d.medicina) html += seccionObjetoHTML("Medicina", d.medicina);
    if (d.arquitectura) html += seccionObjetoHTML("Arquitectura", d.arquitectura);
    if (d.economiaAdministracion) html += seccionObjetoHTML("Economía y Administración", d.economiaAdministracion);
    if (d.militar) html += seccionObjetoHTML("Militar", d.militar);
    if (d.derecho) html += seccionObjetoHTML("Derecho", d.derecho);

    if (d.vocacional) html += seccionVocacionalHTML("Intereses Profesionales", d.vocacional);
    if (d.vocacionalTecnico) html += seccionVocacionalHTML("Técnico Superior", d.vocacionalTecnico);
    if (d.vocacionalOcupacion) html += seccionVocacionalHTML("Ocupaciones", d.vocacionalOcupacion);

    contenidoModal.innerHTML = html;

}

function tablaDatosHTML(datos) {
    let filas = datos.map(([label, valor]) =>
        `<tr><td><b>${label}</b></td><td>${valor ?? ""}</td></tr>`
    ).join("");
    return `<table class="tablaDatos">${filas}</table>`;
}

function seccionObjetoHTML(titulo, objeto) {

    let filas = Object.keys(objeto)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map(campo => `<tr><td>${campo}</td><td>${objeto[campo]}</td></tr>`)
        .join("");

    return `
        <h3>${titulo}</h3>
        <table class="tablaResultados">
            <thead><tr><th>Pregunta</th><th>Respuesta</th></tr></thead>
            <tbody>${filas}</tbody>
        </table>
    `;

}

function seccionVocacionalHTML(titulo, objeto) {

    const carreras = {};

    Object.keys(objeto).forEach(clave => {

        let nombre = clave;

        if (clave.endsWith("P")) {
            nombre = clave.slice(0, -1);
            carreras[nombre] ??= {};
            carreras[nombre].P = objeto[clave];
        } else if (clave.endsWith("S")) {
            nombre = clave.slice(0, -1);
            carreras[nombre] ??= {};
            carreras[nombre].S = objeto[clave];
        } else if (clave.endsWith("E")) {
            nombre = clave.slice(0, -1);
            carreras[nombre] ??= {};
            carreras[nombre].E = objeto[clave];
        }

    });

    let filas = Object.keys(carreras)
        .sort((a, b) => a.localeCompare(b))
        .map(nombre => `
            <tr>
                <td>${nombre}</td>
                <td>${carreras[nombre].P ?? ""}</td>
                <td>${carreras[nombre].S ?? ""}</td>
                <td>${carreras[nombre].E ?? ""}</td>
            </tr>
        `).join("");

    return `
        <h3>${titulo}</h3>
        <table class="tablaResultados">
            <thead>
                <tr>
                    <th>Carrera / Ocupación</th>
                    <th>Personal</th>
                    <th>Social</th>
                    <th>Economía</th>
                </tr>
            </thead>
            <tbody>${filas}</tbody>
        </table>
    `;

}

/*==========================================
CREAR PDF (jsPDF + AutoTable)
==========================================*/

btnCrearPDF.addEventListener("click", () => {

    if (!estudianteActual) {
        alert("Seleccione primero un estudiante.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const docPDF = new jsPDF({ unit: "pt", format: "letter" });

    const d = estudianteActual;
    let y = 40;

    docPDF.setFontSize(16);
    docPDF.text("Reporte del Estudiante", 40, y);
    y += 20;

    docPDF.autoTable({
        startY: y,
        head: [["Dato", "Valor"]],
        body: [
            ["Nombre", d.nombre ?? ""],
            ["Carnet", d.carnet ?? ""],
            ["Edad", d.edad ?? ""],
            ["Sexo", d.sexo ?? ""],
            ["Celular", d.celular ?? ""],
            ["Correo", d.correo ?? ""],
            ["Unidad Educativa", d.unidadEducativa ?? ""],
            ["Curso", d.curso ?? ""],
            ["Fecha", formatearFecha(d.fechaInicio)]
        ]
    });

    y = docPDF.lastAutoTable.finalY + 20;

    const secciones = [
        ["CHASIDE", d.respuestas],
        ["Personalidad", d.personalidad],
        ["Área Social", d.social],
        ["Área Matemática", d.matematico],
        ["Ingeniería", d.ingenieria],
        ["Medicina", d.medicina],
        ["Arquitectura", d.arquitectura],
        ["Economía y Administración", d.economiaAdministracion],
        ["Militar", d.militar],
        ["Derecho", d.derecho]
    ];

    secciones.forEach(([titulo, objeto]) => {

        if (!objeto) return;

        if (y > 700) {
            docPDF.addPage();
            y = 40;
        }

        docPDF.setFontSize(13);
        docPDF.text(titulo, 40, y);
        y += 10;

        const filas = Object.keys(objeto)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
            .map(campo => [campo, String(objeto[campo])]);

        docPDF.autoTable({
            startY: y,
            head: [["Pregunta", "Respuesta"]],
            body: filas
        });

        y = docPDF.lastAutoTable.finalY + 20;

    });

    const vocacionales = [
        ["Intereses Profesionales", d.vocacional],
        ["Técnico Superior", d.vocacionalTecnico],
        ["Ocupaciones", d.vocacionalOcupacion]
    ];

    vocacionales.forEach(([titulo, objeto]) => {

        if (!objeto) return;

        if (y > 700) {
            docPDF.addPage();
            y = 40;
        }

        const carreras = {};

        Object.keys(objeto).forEach(clave => {
            let nombre = clave;
            if (clave.endsWith("P")) {
                nombre = clave.slice(0, -1);
                carreras[nombre] ??= {};
                carreras[nombre].P = objeto[clave];
            } else if (clave.endsWith("S")) {
                nombre = clave.slice(0, -1);
                carreras[nombre] ??= {};
                carreras[nombre].S = objeto[clave];
            } else if (clave.endsWith("E")) {
                nombre = clave.slice(0, -1);
                carreras[nombre] ??= {};
                carreras[nombre].E = objeto[clave];
            }
        });

        const filas = Object.keys(carreras)
            .sort((a, b) => a.localeCompare(b))
            .map(nombre => [
                nombre,
                carreras[nombre].P ?? "",
                carreras[nombre].S ?? "",
                carreras[nombre].E ?? ""
            ]);

        docPDF.setFontSize(13);
        docPDF.text(titulo, 40, y);
        y += 10;

        docPDF.autoTable({
            startY: y,
            head: [["Carrera / Ocupación", "Personal", "Social", "Economía"]],
            body: filas
        });

        y = docPDF.lastAutoTable.finalY + 20;

    });

    pdfActual = docPDF;
    btnDescargarPDF.disabled = false;

    alert("PDF generado. Ya puede descargarlo.");

});

/*==========================================
DESCARGAR PDF
==========================================*/

btnDescargarPDF.addEventListener("click", () => {

    if (!pdfActual) {
        alert("Primero debe crear el PDF.");
        return;
    }

    const nombreArchivo = `Reporte_${(estudianteActual?.nombre || "Estudiante").replace(/\s+/g, "_")}.pdf`;

    pdfActual.save(nombreArchivo);

});

/*==========================================
INICIO
==========================================*/

cargarEstudiantes();

const btnCerrarSesion = document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", async () => {

    if (!confirm("¿Desea cerrar la sesión?")) return;

    try {

        await signOut(auth);

        window.location.href = "loginPsi.html";

    } catch (error) {

        console.error(error);
        alert("Error al cerrar sesión.");

    }

});
