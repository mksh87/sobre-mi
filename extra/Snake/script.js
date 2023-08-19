var total_row = 25; //total row number
var total_col = total_row; //total column number

if(window.innerHeight > window.innerWidth){	
var blockSize = Math.floor(window.innerWidth / (total_row*1.2));
} else {
	var blockSize = Math.floor(window.innerHeight / (total_row*1.3));
}
var board;
var context;
var carLength=2;
var level=1;

var carX = blockSize;
var carY = blockSize;

var plusX = blockSize*8;
var plusY = blockSize*8;

// Set the total number of rows and columns
var speedX = 0; //speed of car in x coordinate.
var speedY = 0; //speed of car in Y coordinate.

var car = [];
var plus= [];

var gameOver = false;

const puntajeTexto = document.getElementById("puntaje");

//Esta parte es para que también funcione con botones en pantalla tactil
const arrowButtons = document.querySelectorAll('.arrow');
        arrowButtons.forEach(button => {
            button.addEventListener('click', function() {
                const keycode = this.getAttribute('data-keycode');
                if (keycode) {
                    simulateKeyEvent('keyup', parseInt(keycode));
                }
            });
        });
        function simulateKeyEvent(eventType, keycode) {
            const event = new KeyboardEvent(eventType, { 'keyCode': keycode });
            document.dispatchEvent(event);
        }

window.onload = function () {
	// Set board height and width
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	document.addEventListener("keyup", changeDirection); //for movements
	// Set car speed
	setInterval(update, 10000 / (50+level*10));
}

function update() {
	if (gameOver) {
		return;
	}

	// Fondo del juego
	context.fillStyle = "aquamarine";
	context.fillRect(0, 0, board.width, board.height);
	
	//Posición actual de la cabeza (no se si es necesario)
	car[0] = [carX, carY];

	//Actualizar posición de cada parte de la cola para que siga a la de adelante
	for(i=carLength-1;i>0;i--){
		car[i]=car[i-1];
	}

	//Actualizar posición de la cabeza
	carX += speedX * blockSize; //updating car position in X coordinate.
	carY += speedY * blockSize; //updating car position in Y coordinate.
	
	//Pinta toda la víbora de rojo
	context.fillStyle = "green";
	context.fillRect(carX, carY, blockSize, blockSize);
	context.fillStyle = "darkslategray";
	for(i=carLength-1;i>0;i--){
		context.fillRect(car[i][0], car[i][1], blockSize, blockSize);
	}
	isOUT(); 
	isCrash();
	isPlus(); //Suma puntos, alarga la víbora y genera nueva casilla Plus.

	//Pinta casilla Plus de amarillo
	plus[0] = [plusX, plusY];
	context.fillStyle = "yellow";
	context.fillRect(plusX, plusY, blockSize, blockSize);
}

// Movement of the car - We are using addEventListener
function changeDirection(e) {
	if ((e.keyCode ==38 || e.code == "ArrowUp" ) && speedY != 1) {
		// If up arrow key pressed with this condition...
		// car will not move in the opposite direction
		speedX = 0;
		speedY = -1;
	}
	else if ((e.keyCode ==40 || e.code == "ArrowDown") && speedY != -1) {
		//If down arrow key pressed
		speedX = 0;
		speedY = 1;
	}
	else if ((e.keyCode ==37 || e.code == "ArrowLeft") && speedX != 1) {
		//If left arrow key pressed
		speedX = -1;
		speedY = 0;
	}
	else if ((e.keyCode ==39 || e.code == "ArrowRight") && speedX != -1) {
		//If Right arrow key pressed
		speedX = 1;
		speedY = 0;
	}
}

function isOUT() {
	if (carX < 0
		|| carX > (total_col-1) * blockSize
		|| carY < 0
		|| carY > (total_row-1) * blockSize) {
		
		// Out of bound condition
		gameOver = true;
		alert("Game Over");
	}
}
function isCrash() {
	
}

function isPlus(){
	if (carX===plusX && carY===plusY){
		carLength+=1;
		plusX = Math.floor(Math.random() * total_row) * blockSize;
		plusY = Math.floor(Math.random() * total_col) * blockSize;
	}
	puntajeTexto.textContent="Tu puntaje es: "+(carLength-2);

	if(carLength%7===0){
		level +=1;
	}

}