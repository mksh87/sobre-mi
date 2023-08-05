let val1;
let val2;
let operacion;
let resultado;
let display="";

function calcular(){
    const valorIngresado = document.getElementById('numero1').value;
    // Puedes validar aquí si el valor ingresado es un número válido antes de almacenarlo
    val1 = Number(valorIngresado);
    console.log("Valor almacenado en val1:", val1);
    
    const valorIngresado2 = document.getElementById('numero2').value;
    // Puedes validar aquí si el valor ingresado es un número válido antes de almacenarlo
    val2 = Number(valorIngresado2);
    console.log("Valor almacenado en val2:", val2);

    const operacionElegida = document.getElementById('operacion');
    operacion = operacionElegida.value;
    console.log("Operacion elegida:", operacion);

    let resultado =eval(val1+operacion+val2);
    console.log("Resultado:", resultado);

    display = document.querySelector('.mostrarResultado');
    display.textContent = "El resultado es: "+resultado;
}