let val1;
let val2;
let operacion;
let resultado;
let display = "";

function calcular() {
    val1 = Number(document.getElementById('numero1').value);
    val2 = Number(document.getElementById('numero2').value);
    operacion = document.getElementById('operacion').value;

    let resultado = eval(val1 + operacion + val2);

    display = document.querySelector('.mostrarResultado');
    display.textContent = "El resultado es: " + resultado;
}