let display = [];
let calculation = [];
let resultado = "";
let displayDiv;
let displayDiv2;

//Genera automáticamente los botones principales(números y operaciones básicas)
function generarBotones() {
    const numContainer = ["7", "8", "9", "÷", "4", "5", "6", "x", "1", "2", "3", "-", "0", ".", "π", "+"];
    const numContainerFunction = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "Math.PI", "+"];
    const containerDiv = document.querySelector('.numContainer');

    for (let i = 0; i < numContainer.length; i++) {
        const button = document.createElement('button');
        button.textContent = numContainer[i];
        button.onclick = function () {
            addDisplay(numContainer[i]);
            addCalculation(numContainerFunction[i]);
        };
        containerDiv.appendChild(button);
    }
}

function generarFunciones() {
    const funcButton = ["sin", "cos", "tan", "log10", "Ln", "^", "√", "mod", "(", ")"];
    const funcContainer = ["SIN(", "COS(", "TAN(", "LOG(", "Ln(", "^", "√(", "%", "(", ")"];
    const funcContainerFunction = ["Math.sin(", "Math.cos(", "Math.tan(", "Math.log10(", "Math.log(", "**", "Math.sqrt(", "%", "(", ")"];
    const containerDiv = document.querySelector('.upContainer');

    for (let i = 0; i < funcContainer.length; i++) {
        const button = document.createElement('button');
        button.textContent = funcButton[i];
        button.onclick = function () {
            addDisplay(funcContainer[i]);
            addCalculation(funcContainerFunction[i]);
        };
        containerDiv.appendChild(button);
    }
}

// Agrega los valores presionados al display de la calcu
function addDisplay(valor) {
    display.push(valor);
    actualizarDisplay();
}

function addCalculation(valor) {
    calculation.push(valor);
}

// Actualizar el contenido en pantalla del div display
function actualizarDisplay() {
    displayDiv = document.querySelector('.display');
    displayDiv.textContent = display.join('');
}

function calcularResultado() {
    //El try es por si da error que muestre el mensaje "Error de sintaxis"
    try {
        resultado = eval(calculation.join(''));

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
    calculation = [];
    resultado = "";
    displayDiv.textContent = "";
    displayDiv2.textContent = "";
}

function delCalc() {
    display.pop();
    calculation.pop;
    resultado = "";
    actualizarDisplay();
    displayDiv2.textContent = "";
}



generarBotones();
generarFunciones();
document.getElementById("clearCalc").addEventListener("click", clearCalc, false);
document.getElementById("delCalc").addEventListener("click", delCalc, false);
document.getElementById("calcularResultado").addEventListener("click", calcularResultado, false);