import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


console.log("TestVocacional cargado");


// ===============================
// PROFESIONES
// ===============================

const PROFESIONES = [

    { key: "Civil", nombre: "Ingeniería Civil" },
    { key: "Industrial", nombre: "Ingeniería Industrial" },
    { key: "Mecanica", nombre: "Ingeniería Mecánica" },
    { key: "Mecatronica", nombre: "Ingeniería Mecatrónica" },
    { key: "Electromecanica", nombre: "Ingeniería Electromecánica" },
    { key: "Electrica", nombre: "Ingeniería Eléctrica" },
    { key: "Telecom", nombre: "Ingeniería en Telecomunicaciones" },
    { key: "Informatica", nombre: "Ingeniería Informática" },
    { key: "Sistemas", nombre: "Ingeniería de Sistemas" },
    { key: "Energias", nombre: "Ingeniería en Energías Renovables" },
    { key: "Ambiental", nombre: "Ingeniería Ambiental" },
    { key: "Alimentos", nombre: "Ingeniería de Alimentos" },
    { key: "Metalurgica", nombre: "Ingeniería Metalúrgica" },
    { key: "Petrolera", nombre: "Ingeniería Petrolera" },

    { key: "Fisica", nombre: "Física" },
    { key: "Matematicas", nombre: "Matemáticas" },
    { key: "Quimica", nombre: "Química" },

    { key: "Medicina", nombre: "Medicina" },
    { key: "Enfermeria", nombre: "Enfermería" },
    { key: "Odontologia", nombre: "Odontología" },
    { key: "Fisioterapia", nombre: "Fisioterapia" },
    { key: "Nutricion", nombre: "Nutrición" },
    { key: "Bioquimica", nombre: "Bioquímica y Farmacia" },

    { key: "Biologia", nombre: "Biología" },
    { key: "Biotecnologia", nombre: "Biotecnología" },

    { key: "Administracion", nombre: "Administración de Empresas" },
    { key: "IngComercial", nombre: "Ingeniería Comercial" },
    { key: "Contaduria", nombre: "Contaduría Pública" },
    { key: "Auditoria", nombre: "Auditoría" },
    { key: "Economia", nombre: "Economía" },
    { key: "IngFinanciera", nombre: "Ingeniería Financiera" },

    { key: "Marketing", nombre: "Publicidad y Marketing" },
    { key: "ComercioInt", nombre: "Comercio Internacional" },
    { key: "Turismo", nombre: "Hotelería y Turismo" },

    { key: "Arquitectura", nombre: "Arquitectura" },
    { key: "DisenoGrafico", nombre: "Diseño Gráfico" },
    { key: "DisenoInteriores", nombre: "Diseño de Interiores" },
    { key: "DisenoModas", nombre: "Diseño de Modas" },

    { key: "ArtesPlasticas", nombre: "Artes Plásticas" },
    { key: "ArtesEscenicas", nombre: "Artes Escénicas" },
    { key: "Musica", nombre: "Música" },
    { key: "Cine", nombre: "Cine y Producción Audiovisual" },
    { key: "Fotografia", nombre: "Fotografía" },
    { key: "ProdMultimedia", nombre: "Producción Multimedia" },

    { key: "Psicologia", nombre: "Psicología" },
    { key: "Sociologia", nombre: "Sociología" },
    { key: "TrabajoSocial", nombre: "Trabajo Social" },
    { key: "Gastronomia", nombre: "Gastronomía" },

    { key: "Antropologia", nombre: "Antropología" },
    { key: "Historia", nombre: "Historia" },
    { key: "Linguistica", nombre: "Lingüística" },
    { key: "Filosofia", nombre: "Filosofía" },

    { key: "CienciasPoliticas", nombre: "Ciencias Políticas" },
    { key: "Derecho", nombre: "Derecho" },
    { key: "RelacionesInt", nombre: "Relaciones Internacionales" },

    { key: "Agronomia", nombre: "Agronomía" },
    { key: "IngForestal", nombre: "Ingeniería Forestal" },
    { key: "IngRecursosHidricos", nombre: "Ingeniería en Recursos Hídricos" },

    { key: "EducacionInicial", nombre: "Educación Inicial" },
    { key: "EducacionPrimaria", nombre: "Educación Primaria" },
    { key: "EducacionSecundaria", nombre: "Educación Secundaria" },

    { key: "Pedagogia", nombre: "Pedagogía" },
    { key: "Policia", nombre: "Policía Boliviana" },
    { key: "FuerzasArmadas", nombre: "Fuerzas Armadas" }

];



// ===============================
// SECCIONES
// ===============================

const SECCIONES = [

    {
        sufijo:"P",
        valores:["D","R","E"]
    },

    {
        sufijo:"S",
        valores:["1","2","3"]
    },

    {
        sufijo:"E",
        valores:["1","2","3"]
    }

];



// ===============================
// CREAR TABLA
// ===============================

function crearCeldaRadio(name,value){

    const td=document.createElement("td");

    const input=document.createElement("input");


    input.type="radio";
    input.name=name;
    input.value=value;


    td.appendChild(input);


    return td;

}



function crearFila(profesion,numero){


    const tr=document.createElement("tr");


    const td=document.createElement("td");


    td.textContent =
    `${numero}) ${profesion.nombre}`;


    tr.appendChild(td);



    SECCIONES.forEach(seccion=>{


        const name =
        profesion.key + seccion.sufijo;



        seccion.valores.forEach(valor=>{


            tr.appendChild(
                crearCeldaRadio(
                    name,
                    valor
                )
            );


        });


    });



    return tr;

}




function renderTabla(){


    const tbody =
    document.getElementById("tablaBody");


    const fragment =
    document.createDocumentFragment();



    PROFESIONES.forEach((prof,index)=>{


        fragment.appendChild(
            crearFila(
                prof,
                index+1
            )
        );


    });



    tbody.appendChild(fragment);

}




// ===============================
// VALIDAR
// ===============================

function validarRespuestas(){


    let faltantes=0;



    PROFESIONES.forEach(profesion=>{


        SECCIONES.forEach(seccion=>{


            const name =
            profesion.key + seccion.sufijo;


            const marcado =
            document.querySelector(
                `input[name="${name}"]:checked`
            );



            if(!marcado){

                faltantes++;

            }


        });


    });



    if(faltantes>0){


        alert(
            "Debes completar todas las opciones antes de continuar."
        );


        return false;

    }



    return true;

}





// ===============================
// OBTENER DATOS
// ===============================

function recolectarDatos(){


    const datos={};



    PROFESIONES.forEach(profesion=>{


        SECCIONES.forEach(seccion=>{


            const name =
            profesion.key + seccion.sufijo;



            const seleccionado =
            document.querySelector(
                `input[name="${name}"]:checked`
            );



            if(seleccionado){


                datos[
                    `vocacional.${name}`
                ] =
                seleccionado.value;


            }



        });


    });



    return datos;

}





// ===============================
// GUARDAR FIREBASE
// ===============================

document
.getElementById("btnSiguiente")
.addEventListener(
"click",
async()=>{


    console.log("Botón presionado");


    const idEstudiante =
    localStorage.getItem("idEstudiante");


    console.log(
        "ID:",
        idEstudiante
    );



    if(!idEstudiante){

        alert(
            "No se encontró el estudiante."
        );

        return;

    }



    if(!validarRespuestas()){

        return;

    }



    const datos =
    recolectarDatos();



    console.log(datos);



    try{


        await updateDoc(
            doc(
                db,
                "datosEstudiante",
                idEstudiante
            ),
            datos
        );



        console.log(
            "Guardado correctamente"
        );



        window.location.href =
        "TestIntProf1.html";



    }catch(error){


        console.error(
            "Error guardando:",
            error
        );


    }


});





// ===============================
// INICIO
// ===============================

document.addEventListener(
"DOMContentLoaded",
()=>{

    renderTabla();

});