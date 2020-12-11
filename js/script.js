//Carga de app

$(window).load(function () {
    $(".cargando").fadeOut("slow");
});


//Variables

let nombre=document.querySelector("#nombre")
let botonJugarInicio=document.querySelector(".modal-inicio-jugar")
let botonJugarOpciones=document.querySelector(".modal-opciones-jugar")
let botonVolverJugar=document.querySelector(".modal-fin-rejugar")
let botonCerrar=document.querySelector(".marcador-salir")
let botonInicio=document.querySelector(".cabecera-menu-inicio")
let botonPuntuaciones=document.querySelector(".cabecera-menu-inicio")
let temporizador=document.querySelector(".juego-temporizador")
let tematica=document.querySelector(".juego-tematica")
let ahorcado=document.querySelector(".juego-ahorcado")
let palabra=document.querySelector(".juego-palabra")
let teclado=document.querySelector(".juego-teclado")
let nombreJugador=document.querySelector(".juego-datos-nombre")
let partidas=document.querySelector(".juego-datos-partidas")
/*let jugador={
  nombre: nombre,
  partidasGanadas:,
  fecha : new Date()
}*/

//Inciamos partida

botonJugarInicio.onclick=()=>{
  if(nombre.value=="")
    document.querySelector(".modal-inicio-alerta").classList.remove("oculto")
  else{
    document.querySelector(".modal-inicio").classList.add("oculto")
    nombreJugador.textContent=nombre.value
  }
}




