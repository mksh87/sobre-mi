let display = [];
let calculation=[];
let resultado = "";
let displayDiv;
let displayDiv2;

//Genera automáticamente los botones principales
function generarBotones() {
    const numContainer = ["7", "8", "9", "÷", "4", "5", "6", "x", "1", "2", "3", "-", "0", ".", "π", "+"];
    const numContainerFunction = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "Math.PI", "+"];
    const containerDiv = document.querySelector('.numContainer');

    for (let i = 0; i < numContainer.length; i++) {
        const button = document.createElement('button');
        button.textContent = numContainer[i];
        button.onclick = function() {
            addDisplay(numContainer[i]);
            addCalculation(numContainerFunction[i]);
        };
        containerDiv.appendChild(button);
    }
}



// Función que se ejecuta al presionar un botón
function addDisplay(valor) {
    display.push(valor);
    actualizarDisplay();
}

function addCalculation(valor) {
    calculation.push(valor);
}

// Función para actualizar el contenido del div display
function actualizarDisplay() {
    displayDiv = document.querySelector('.display');
    displayDiv.textContent = display.join('');
}

function calcularResultado() {

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



