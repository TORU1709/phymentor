async function enviarMensaje(){

    const input = document.getElementById("mensaje");

    const chat = document.getElementById("chat");

    const mensaje = input.value.trim();

    if(mensaje==="") return;

    chat.innerHTML += `
        <div class="user">
            ${mensaje}
        </div>
    `;

    input.value="";

    chat.innerHTML += `
        <div class="bot" id="esperando">
            🤖 PhyMentor está escribiendo...
        </div>
    `;

    chat.scrollTo({
    top: chat.scrollHeight,
    behavior:"smooth"
});

    const respuesta = await fetch("/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            mensaje:mensaje

        })

    });

    const datos = await respuesta.json();

    await new Promise(resolve => setTimeout(resolve, 1000));

    document.getElementById("esperando").remove();

    chat.innerHTML += `
        <div class="bot">
            ${datos.respuesta.replace(/\n/g,"<br>")}
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

}

function preguntaRapida(tema){

    document.getElementById("mensaje").value=tema;

    enviarMensaje();

}

document.getElementById("mensaje").addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        enviarMensaje();

    }

});
function mostrarQuiz(){

    document.getElementById("quiz-container").style.display="block";

    document.getElementById("chat-container").style.display="none";


    iniciarQuiz();

}

function mostrarChat(){

    document.getElementById("quiz-container").style.display="none";

    document.getElementById("chat-container").style.display="block";

}
let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;


async function iniciarQuiz(){

    const respuesta = await fetch("/quiz");

    preguntas = await respuesta.json();

    preguntaActual = 0;

    puntaje = 0;

    mostrarPregunta();

}



function mostrarPregunta(){

    const contenedor = document.getElementById("quiz-content");


    let pregunta = preguntas[preguntaActual];


    let progreso = 
    ((preguntaActual) / preguntas.length) * 100;



    contenedor.innerHTML = `


        <div class="progreso-texto">

            Pregunta ${preguntaActual + 1} de ${preguntas.length}

        </div>



        <div class="barra-progreso">

            <div class="progreso" style="width:${progreso}%">

            </div>

        </div>



        <h3>

        ${pregunta.pregunta}

        </h3>



        <div class="opciones">

            ${pregunta.opciones.map((opcion,index)=>`

                <button onclick="responder(${index})">

                    ${opcion}

                </button>


            `).join("")}

        </div>


    `;

}



function responder(opcionElegida){


    let pregunta = preguntas[preguntaActual];

    let correcta = pregunta.respuesta;


    const botones = document.querySelectorAll(".opciones button");


    botones.forEach((boton,index)=>{

        boton.disabled = true;


        if(index === correcta){

            boton.style.background="#16a34a";

        }


        if(index === opcionElegida && opcionElegida !== correcta){

            boton.style.background="#dc2626";

        }


    });



    let mensaje="";


    if(opcionElegida === correcta){

        puntaje++;

        mensaje=`
        <p style="color:#4ade80; font-size:20px;">
        🎉 ¡Correcto!
        </p>
        `;


    }

    else{


        mensaje=`

        <p style="color:#f87171; font-size:20px;">

        ❌ Incorrecto

        </p>


        <p>

        La respuesta correcta era:

        <b>${pregunta.opciones[correcta]}</b>

        </p>

        `;


    }



    document.getElementById("quiz-content").innerHTML += mensaje;



    setTimeout(()=>{


        preguntaActual++;



        if(preguntaActual < preguntas.length){


            mostrarPregunta();


        }

        else{


            document.getElementById("quiz-content").innerHTML=`

            <h2>
            🏆 Quiz terminado
            </h2>


            <p style="font-size:22px;">

            Tu puntaje:

            ⭐ ${puntaje}/${preguntas.length}

            </p>


            `;


        }


    },2500);



}


