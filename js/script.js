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
let puntuaciones=document.querySelector(".marcador-listado")
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
let fallos=0
let aciertos=0
let partidasGanadas=0

let jugador={
  nombre: "",
  puntuacion: 0,
  fecha: new Date()
}

//Array de temáticas

let palabras=[
  {palabra:"AB",tema:"Animales"},
  {palabra:"DEF",tema:"Animales"},
  {palabra:"GHIJ",tema:"Países"},
  {palabra:"JKLMN",tema:"Países"}
]

//Modal Inicio

botonJugarInicio.onclick=IniciarPartida

function IniciarPartida(){
  fallos=0
  aciertos=0
  jugador.nombre=nombre.value
  ahorcado.setAttribute("src","./img/ahorcado0.png")
  partidas.textContent=`Partidas ganadas: ${partidasGanadas}`
  if(nombre.value=="")
    document.querySelector(".modal-inicio-alerta").classList.remove("oculto")
  else{
    document.querySelector(".modal-inicio").classList.add("oculto")
    nombreJugador.textContent=nombre.value
    jugador.nombre=nombre.value
    borrar()
    crearAbecedario()
    seleccion=Math.round(Math.random()*(palabras.length-1))
    tematica.innerHTML=palabras[seleccion].tema
    let palabraElegida=palabras[seleccion].palabra
    let palabraElegidaArray=Array.from(palabraElegida)
    let letrasPalabraContenedor=document.createElement("div")
    let letraPalabra=document.createElement("p")
    letrasPalabraContenedor.classList.add("borde-inferior")
    letraPalabra.classList.add("oculto")
    palabraElegidaArray.forEach(l=>{
      let p=letraPalabra.cloneNode()
      p.innerHTML=l
      let letra=letrasPalabraContenedor.cloneNode()
      letra.insertAdjacentElement("beforeend",p)
      palabra.insertAdjacentElement("beforeend",letra)
    })
    console.log(palabraElegidaArray)
  }
}

//Pantalla Principal

function borrar(){
  while(teclado.firstChild)
    teclado.firstChild.remove()
  while(palabra.firstChild)
    palabra.firstChild.remove()
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
            if(palabras[seleccion].palabra.indexOf(letra.textContent)==-1){
              imgs.setAttribute("src","./img/letraMal.png")
              fallos++
              ahorcado.setAttribute("src","./img/ahorcado"+fallos+".png")
            }
            else{
              imgs.setAttribute("src","./img/letraBien.png")
              let comparacionLetra = Array.from(document.querySelectorAll(".juego-palabra div p"))
              comparacionLetra.forEach(l=>{
                if(l.textContent==letra.textContent){
                  l.classList.remove("oculto")
                  aciertos++
                }
              })           
            }
            comprobarJugada()  
            let img=imgs.cloneNode()
            letra.insertAdjacentElement("afterbegin",img)
          }
        }
        teclado.appendChild(letra)
    })
  }

  function comprobarJugada(){
    if(fallos>=6){
      teclado.classList.add("invisible")
      guardarDatos()
      setTimeout(() => {
        document.querySelector(".modal-fin").classList.remove("oculto")
        partidasGanadas=0
      }, 1500)
    }
    if(aciertos==palabras[seleccion].palabra.length){
      partidasGanadas++
      setTimeout(() => {
        IniciarPartida()
      }, 1500)
    }
  }

//Botones cabecera

botonInicio.onclick=()=>{
  document.querySelector(".modal-inicio").classList.remove("oculto")
  nombre.value=""
  partidasGanadas=0
}

botonPuntuaciones.onclick=()=>{
  puntuaciones.textContent=""
  document.querySelector(".modal-puntuacion").classList.remove("oculto")
  for(let i=0;i<5;i++){
    puntuaciones.textContent+=jugadores[i].nombre
    puntuaciones.textContent+=jugadores[i].puntuacion
  }
}

//Modal Puntuaciones

botonCerrar.onclick=()=>{
  document.querySelector(".modal-puntuacion").classList.add("oculto")
  
}

function guardarDatos(){
  jugador.puntuacion=partidasGanadas
  let puntuaciones=localStorage.getItem("puntuaciones")
  if(puntuaciones==undefined)
    jugadores=[]
  else
    jugadores=JSON.parse(puntuaciones)
  jugadores.unshift(jugador)
  localStorage.setItem("puntuaciones",JSON.stringify(jugadores))
}

//Modal Perder

botonVolverJugar.onclick=()=>{
  IniciarPartida()
  teclado.classList.remove("invisible")
  document.querySelector(".modal-fin").classList.add("oculto")
  
}


