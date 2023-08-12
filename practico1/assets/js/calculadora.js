let val1 = "";
let val2 = "";
let operacion = "";
let resultado;
let display = "";

//buscarErrores: primer busca si los numeros son grandes y muestra mensaje. Calcula si no hay errores.
function buscarErrores() {
    try {
        resultado = Number(eval(val1 + operacion + val2));
        let nc= document.getElementById("nc").checked;
        if (!nc && (Math.abs(resultado)>=(10**21) || Math.abs(resultado)<=(10**(-7)) )) {
            throw new Error("Numero feo");
        }
        display = document.querySelector('.mostrarResultado');
        display.textContent = "El resultado es: " + resultado;
    } catch (error) {
        display = document.querySelector('.mostrarResultado');
        display.textContent = "El resultado es muy fiero como para mostrar en pantalla";
    }
}

// Primero valida si falta completar algo o si intenta dividir por 0. Si pasa eso. Ejecuta buscarErrores. Ver arriba.
function calcular() {
    val1 = document.getElementById('numero1').value;
    val2 = document.getElementById('numero2').value;
    operacion = document.getElementById('operacion').value;
    if (val1 === "" || val2 === "" || operacion === "") {
        display = document.querySelector('.mostrarResultado');
        display.textContent = "Usted no ha completado alguno de los campos";
    } else if (val2 == "0" && operacion === "/") {
        display = document.querySelector('.mostrarResultado');
        display.textContent = "No se puede dividir por 0";
    } else {
        
        buscarErrores();
    }
}

//Para el botón de borrar. Limpia los datos ingresados.
function clearCalc() {
    val1 = "";
    val2 = "";
    operacion = "";
    resultado="";
    document.getElementById("operacion").value = "";
    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";
    display.textContent = "";
}