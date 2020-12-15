//Carga de app

$(window).load(function () {
    $(".cargando").fadeOut("slow");
});

//Información del HTML

let nombre=document.querySelector("#nombre")
let botonJugarInicio=document.querySelector(".modal-inicio-jugar")
let botonJugarOpciones=document.querySelector(".modal-opciones-jugar")
let botonVolverJugar=document.querySelector(".modal-fin-rejugar")
let botonCerrar=document.querySelector(".marcador-salir")
let botonInicio=document.querySelector(".cabecera-menu-inicio")
let botonPuntuaciones=document.querySelector(".cabecera-menu-puntuacion")
let temporizador=document.querySelector(".juego-temporizador")
let tematica=document.querySelector(".juego-tematica")
let ahorcado=document.querySelector(".juego-ahorcado")
let palabra=document.querySelector(".juego-palabra")
let teclado=document.querySelector(".juego-teclado")
let nombreJugador=document.querySelector(".juego-datos-nombre")
let partidas=document.querySelector(".juego-datos-partidas")

//Variables

let seleccion=0

/*let jugador={
  nombre: nombre,
  partidasGanadas:,
  fecha : new Date()
}*/

//Array de temáticas

let palabras=[
  {palabra:"PERRO",tema:"Animales"},
  {palabra:"GATO",tema:"Animales"},
  {palabra:"ESPAÑA",tema:"Países"},
  {palabra:"AUSTRALIA",tema:"Países"}
]

//Modal Inicio

botonJugarInicio.onclick=()=>{
  if(nombre.value=="")
    document.querySelector(".modal-inicio-alerta").classList.remove("oculto")
  else{
    document.querySelector(".modal-inicio").classList.add("oculto")
    nombreJugador.textContent=nombre.value
    borrarAbecedario()
    crearAbecedario()
    seleccion=Math.round(Math.random()*(palabras.length-1))
    tematica.innerHTML=palabras[seleccion].tema
    let palabraElegida=palabras[seleccion].palabra
    let palabraElegidaOculta=""
    for(let i=0;i<palabraElegida.length;i++){
      palabraElegidaOculta+=palabraElegida[i].replace(palabraElegida[i],"_ ")
    }
    palabra.innerHTML=palabraElegidaOculta
  }
}

//Pantalla Principal

function borrarAbecedario(){
    while(teclado.firstChild){
      teclado.firstChild.remove()
    }
  }

  function crearAbecedario(){
    let abecedario=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let letras=document.createElement("div")
    let imgs=document.createElement("img") 
    imgs.classList.add("pulsada")
    letras.classList.add("letra")
    abecedario.forEach(l => {
        let letra=letras.cloneNode()
        letra.innerHTML=l
        letra.onclick=()=>{
          if(letra.firstElementChild==null){
            if(palabras[seleccion].palabra.indexOf(letra.textContent)==-1)
              imgs.setAttribute("src","./img/letraMal.png")
            else
              imgs.setAttribute("src","./img/letraBien.png")
            let img=imgs.cloneNode()
            letra.insertAdjacentElement("afterbegin",img)
            console.log(letra.textContent)
          }
        }
        teclado.appendChild(letra)
    })
  }

//Botones cabecera

botonInicio.onclick=()=>{
  document.querySelector(".modal-inicio").classList.remove("oculto")
  nombre.value=""
}

botonPuntuaciones.onclick=()=>{
  document.querySelector(".modal-puntuacion").classList.remove("oculto")
}

//Modal Puntuaciones

botonCerrar.onclick=()=>{
  document.querySelector(".modal-puntuacion").classList.add("oculto")
}
