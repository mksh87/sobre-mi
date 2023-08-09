let val1="";
let val2="";
let operacion;
let resultado;
let display = "";

function calcular() {
    val1 = document.getElementById('numero1').value;
    val2 = document.getElementById('numero2').value;
    operacion = document.getElementById('operacion').value;
    if(val1==="" || val2===""){
        display = document.querySelector('.mostrarResultado');
        display.textContent = "Usted no ha completado alguno de los campos";
    } else if (val1==="0" && val2=="0" && operacion==="/") {
        display = document.querySelector('.mostrarResultado');
        display.textContent = "No se puede calcular 0 dividido 0";
    } else {

    let resultado = eval(val1 + operacion + val2);

    display = document.querySelector('.mostrarResultado');
    display.textContent = "El resultado es: " + resultado;
    }
}