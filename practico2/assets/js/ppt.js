let scorePlayer = 0, scoreComputer = 0, scoreMax = 0; //Variables de puntajes
let usuario; //elección del usuario
let partidas; //define variable de cantidad de partidas que se deben ganar para finalizar
let userName = "";

//Párrafos de mensajes
const userNameSelector = document.getElementById("userNameSelection");
const mensajeElement = document.getElementById("mensaje"); // Al elegir (o no) una opción al iniciar partida.
const mensajeUsuario = document.getElementById("mensaje1"); //jugada del usuario.
const mensajeComputadora = document.getElementById("mensaje2");//jugada de computadora.
const mensajeResultado = document.getElementById("mensaje3"); //resultado y score.
const mensajeFin = document.getElementById("mensaje4"); //anuncio de ganador.

//Botones y displays del juego
const opciones = document.getElementsByName("partidas"); //botones de cantidad de partidas
const codigoElement = document.getElementById("codigo"); //div del juego (para mostrarlo u ocultarlo)
const btnGen = document.getElementById("codigo2"); // toma los elementos del div codigo, que es el de los botones PPT.
const buttons = document.getElementsByName("eleccion");// botones de opciones
let originalOnClicks = {}; // Para almacenar los eventos onclick originales

function elegirUsername() {
  const inputField = document.querySelector("#userName");
  if (inputField.checkValidity()) {
    userName = inputField.value;
    userNameSelector.textContent = "¿Elegiste el nombre... " + userName + "?... ¡Como quieras! No soy quien para juzgar."
    document.getElementById('comenzar').style.display = "block";
  }
}

function mostrarPuntaje() {
  document.getElementById('one').style.display = "block";
  document.getElementById('two').style.display = "block";
}

function desactivarOnClick() {   // Desactivar los eventos onclick
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let originalOnClick = button.getAttribute('onclick');
    originalOnClicks[button.id] = originalOnClick; // Almacenar el evento onclick original
    button.removeAttribute('onclick');
  }
}

function restaurarOnClick() { // Restaurar los eventos onclick originales
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let originalOnClick = originalOnClicks[button.id];
    if (originalOnClick) {
      button.setAttribute('onclick', originalOnClick);
    }
  }
}

function generarBotones() {
  while (btnGen.firstChild) {
    btnGen.removeChild(btnGen.firstChild);
  }    // Eliminar botones previos

  const casillero1 = document.createElement("div");
  casillero1.textContent = "Vos";
  const button0 = document.createElement("div");
  button0.textContent = "Elije una opción";
  const casillero2 = document.createElement("div");
  casillero2.textContent = "PC";
  btnGen.appendChild(casillero1);
  btnGen.appendChild(button0);
  btnGen.appendChild(casillero2);

  for (let i = 0; i < jugadas.length; i++) {

    const casillero1 = document.createElement("div");
    casillero1.id = "playerDiv" + i;
    casillero1.innerHTML = "<span class='icon solid fa-arrow-right'>";
    casillero1.classList.add("casillero");

    const button = document.createElement("button");
    button.className = "button fit";
    button.name = "eleccion";
    button.id = jugadas[i];
    button.setAttribute("onclick", "determinarGanador(" + i + ")");
    button.textContent = jugadas[i].toUpperCase();
    button.classList.add("eleccion");


    const casillero2 = document.createElement("div");
    casillero2.id = "compDiv" + i;
    casillero2.innerHTML = "<span class='icon solid fa-arrow-left'>";
    casillero2.classList.add("casillero");

    btnGen.appendChild(casillero1);
    btnGen.appendChild(button);
    btnGen.appendChild(casillero2);

  }
}

function comenzarJuego() { //Confirma cantidad de puntos. Habilita botones con restaurarOnClick()
  let seleccionado = false;
  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      seleccionado = true;
      partidas = Number(opciones[i].value);
      break;
    }
  }
  if (seleccionado) {
    document.getElementById("btn-comenzar").removeAttribute('onclick');
    for (let i = 0; i < opciones.length; i++) {
      opciones[i].disabled = true;
    }
    mensajeElement.textContent = "Comienza la partida. Gana quien llegue primero a " + partidas + " puntos.";
    generarBotones();
    restaurarOnClick();
    codigoElement.style.display = "block";
  } else {
    mensajeElement.textContent = "Seleccione una alternativa para poder iniciar.";
  }
}

function obtenerJugadaUsuario(valor) { //Devuelve elección de usuario según botón que presione.
  usuario = Number(valor);
  mensajeUsuario.textContent = "Elegiste " + jugadas[usuario].toUpperCase();
  for (let i = 0; i < buttons.length; i++) {
    document.getElementById("playerDiv" + i).style.backgroundColor = "";
    document.getElementById("playerDiv" + i).style.color = "rgba(0, 0, 0, 0)";
  }
  document.getElementById("playerDiv" + usuario).style.backgroundColor = "green";
  document.getElementById("playerDiv" + usuario).style.color = "white";
  return usuario;
}

function obtenerJugadaComputadora() {
  let computadora = Math.floor(Math.random() * jugadas.length);
  mensajeComputadora.textContent = " La computadora elige " + jugadas[computadora].toUpperCase();
  for (let i = 0; i < buttons.length; i++) {
    document.getElementById("compDiv" + i).style.backgroundColor = "";
    document.getElementById("compDiv" + i).style.color = "rgba(0, 0, 0, 0)";

  }
  document.getElementById("compDiv" + computadora).style.backgroundColor = "red";
  document.getElementById("compDiv" + computadora).style.color = "white";

  return computadora;
}

function checkEnd() { //Verifica si scoreMax llega a las puntos elegidos. Da mensaje de finalización y deshabilita botones con desactivarOnClick()
  scoreMax = Math.max(scorePlayer, scoreComputer);
  if (scoreMax >= partidas) {
    desactivarOnClick()
    if (scorePlayer < scoreComputer) {
      mensajeFin.textContent =
        "La computadora ha llegado a " + partidas + " victorias y gana la partida. No te desanimes! Hay cosas peores en la vida.";
    } else if (scorePlayer > scoreComputer) {
      mensajeFin.textContent =
        "Llegaste a " + partidas + " victorias y ganaste la partida. Siempre confiamos en ti. ¡FELICITACIONES!";
    } else {
      mensajeFin.textContent =
        "Algo ha salido mal. Por favor informar el bug para ayudara este programador novato.";
    }
  }
}

function determinarGanador(a) { // Usa obtenerJugadaUsuario y obtenerJugadaComputadora para determinar ganador. Suma puntos y da mensaje
  let user = obtenerJugadaUsuario(a);
  let comp = Number(obtenerJugadaComputadora());
  if (user === comp) {
    mensajeResultado.textContent = ("  Empate. Muy poco original copiar a tu rival. \nLa partida continua " + scorePlayer + " - " + scoreComputer + ".");
  } else {
    for (let r = 1; r < jugadas.length; r += 2) {
      if ((user + r) % jugadas.length === comp) {
        scoreComputer++;
        mensajeResultado.textContent = ((jugadas[comp] + " " + mensajes[user][comp] + " " + jugadas[user]).toUpperCase() + ". Ha ganado la computadora. Era esperable. \nLa partida se encuentra " + scorePlayer + " - " + scoreComputer + ".");
      } else if ((user + 1 + r) % jugadas.length === comp) {
        scorePlayer++;
        mensajeResultado.textContent = ((jugadas[user] + " " + mensajes[user][comp] + " " + jugadas[comp]).toUpperCase() + ".  ¡Ganaste! Seguramente fue con suerte. \nLa partida se encuentra " + scorePlayer + " - " + scoreComputer + ".");
      }
    }
  }
  checkEnd();
}

function resetear() { //Restaura todo a la pantalla de selección de partidas
  for (let i = 0; i < opciones.length; i++) {
    opciones[i].disabled = false;
    opciones[i].checked = false;
  }
  mensajeElement.textContent = "";
  mensajeUsuario.textContent = "";
  mensajeComputadora.textContent = "";
  mensajeResultado.textContent = "";
  mensajeFin.textContent = "";
  scorePlayer = 0;
  scoreComputer = 0;
  codigoElement.style.display = "none";
  document.getElementById("btn-comenzar").setAttribute('onclick', 'comenzarJuego()');
}