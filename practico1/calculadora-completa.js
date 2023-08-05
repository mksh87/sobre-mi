let numContainer = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "x", "0", ".", "π", "÷"];
numContainerFunction = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "Math.PI", "/"];
let display = [];
let resultado = "";
let displayDiv;
let displayDiv2;
// Función que se ejecuta al presionar un botón
function addDisplay(valor) {
    display.push(valor);
    actualizarDisplay();
}

// Función para actualizar el contenido del div display
function actualizarDisplay() {
    displayDiv = document.querySelector('.display');
    displayDiv.textContent = display.join('');
}

function calcularResultado() {

    try {
        resultado = eval(display.join(''));

        if (isNaN(resultado)) {
            throw new Error("Error de sintaxis");
            resultado = "Error de sintaxis";
        }
        displayDiv2 = document.querySelector('.displayResult');
        displayDiv2.textContent = resultado;
    } catch (error) {

        displayDiv2 = document.querySelector('.displayResult');
        displayDiv2.textContent = "Error de sintaxis";
    }
}

function clearCalc() {
    display = [];
    resultado = "";
    displayDiv.textContent = "";
    displayDiv2.textContent = "";
}

function delCalc() {
    display.pop();
    resultado = "";
    actualizarDisplay();
    displayDiv2.textContent = "";
}