		let jugadas = ["piedra", "papel", "tijeras"];
		let mensajes = [
			["", "envuelve", "rompe"],
			["envuelve", "", "corta"],
			["rompe", "corta", ""]
		]


const btnGen = document.getElementById("codigo2");


function generarBotones() {
  while (btnGen.firstChild) {
    btnGen.removeChild(btnGen.firstChild);
  }    // Eliminar botones previos
  for (let i = 0; i < jugadas.length; i++) {
    let button = document.createElement("button");
    button.className = "button fit";
    button.name = "eleccion";
    button.id = jugadas[i];
    button.setAttribute("onclick", "determinarGanador(" + i + ");cambiarFondo(this)");
    button.textContent = jugadas[i].toUpperCase();
    btnGen.appendChild(button);
  }
}


function generarGrilla() {
    const grillaContainer = document.getElementById("grilla-container");
    
    for (let i = 0; i < jugadas.length; i++) {
          
      const casillero1 = document.createElement("div");
      casillero1.id = "playerDiv"+i;
      casillero1.classList.add("casillero");
      
      const button = document.createElement("button");
      button.className = "button fit";
      button.name = "eleccion";
      button.id = jugadas[i];
      button.setAttribute("onclick", "determinarGanador(" + i + ");cambiarFondo(this)");
      button.textContent = jugadas[i].toUpperCase();
      button.classList.add("eleccion");

      
      const casillero2 = document.createElement("div");
      casillero2.id = "playerDiv"+i;
      casillero2.classList.add("casillero");
      
      grillaContainer.appendChild(casillero1);
      grillaContainer.appendChild(button);
      grillaContainer.appendChild(casillero2);
      
    }
  }
  
  generarGrilla();