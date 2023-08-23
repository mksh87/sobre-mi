
const total_row = 30; //total row number
const total_col = total_row; //total column number

if(window.innerHeight > window.innerWidth){	
	var blockSize = Math.floor(window.innerWidth / (total_row*1.2));
	} else {
		var blockSize = Math.floor(window.innerHeight / (total_row*1.4));
	}

var board;
var context;
var road;
var finishline = [[blockSize * (Math.floor(total_row / 2)), blockSize * 1], [blockSize * (Math.floor(total_row / 2)), blockSize * 2]];
var lap = 0;
var total_laps = 3;
var time=0;

const lapTexto = document.getElementById("lap");
const timeTexto = document.getElementById("time");


var carX = blockSize * (Math.floor(total_row / 2) - 1);
var carY = blockSize;

// Set the total number of rows and columns
var speedX = 0; //speed of car in x coordinate.
var speedY = 0; //speed of car in Y coordinate.

var car = [];

var gameOver = false;


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
	road = board.getContext("2d");


	document.addEventListener("keyup", changeDirection); //for movements
	// Set car speed
	setInterval(update, 10000 / 100);
}

function update() {
	if (gameOver) {
		return;
	}

	// Background of a Game
	context.fillStyle = "blue";
	context.fillRect(0, 0, board.width, board.height);


	/* ----------- Camino -----------*/
	road.rect		(blockSize, blockSize, board.width - blockSize * 3, blockSize * 1);
	road.fillStyle = "black";
	road.fillRect	(blockSize, blockSize, board.width - blockSize * 2, blockSize * 2);

	road.rect		(board.width - blockSize * 3, blockSize * 2, blockSize * 1, blockSize * 18);
	road.fillStyle = "black";
	road.fillRect	(board.width - blockSize * 3, blockSize * 2, blockSize * 2, blockSize * 18);

	road.rect		(board.width - blockSize * 1, board.height - blockSize * 10, -blockSize * 11, blockSize * 1);
	road.fillStyle = "black";
	road.fillRect	(board.width - blockSize * 1, board.height - blockSize * 10, -blockSize * 11, blockSize * 2);

	road.rect		(board.width - blockSize * 12, board.height - blockSize * 8, blockSize * 1, blockSize * 6);
	road.fillStyle = "black";
	road.fillRect	(board.width - blockSize * 12, board.height - blockSize * 8, blockSize * 2, blockSize * 7);

	road.rect		(board.width - blockSize * 12, board.height - blockSize * 3, -blockSize * 17, blockSize * 1);
	road.fillStyle = "black";
	road.fillRect	(board.width - blockSize * 12, board.height - blockSize * 3, -blockSize * 17, blockSize * 2);

	road.rect		(blockSize * 1, board.height - blockSize * 2, blockSize * 1, -blockSize * 25);
	road.fillStyle = "black";
	road.fillRect	(blockSize * 1, board.height - blockSize * 2, blockSize * 2, -blockSize * 25);

	/* ----------- Fin del Camino -----------*/


	/* ----------- Linea de llegada -----------*/
	context.fillStyle = "white";
	context.fillRect(blockSize * (Math.floor(total_row / 2)), blockSize * 1, blockSize * 1, blockSize * 2);

	if(speedX !==0 || speedY!==0){
		time+=0.1;
	}
	timeTexto.textContent="Tiempo: "+Math.floor(time*10)/10;


	//Update Position Car
	car[0] = [carX, carY];
	car[1] = car[0];
	context.fillStyle = "red";
	carX += speedX * blockSize; //updating car position in X coordinate.
	carY += speedY * blockSize; //updating car position in Y coordinate.
	context.fillRect(carX, carY, blockSize, blockSize);
	context.fillStyle = "red";
	context.fillRect(car[1][0], car[1][1], blockSize, blockSize);
	isOUT();
	isLap();
	isOver();
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

function isLap() {
	if (
		(carX === finishline[0][0] || carX === finishline[1][0])
		&& (carY === finishline[0][1] || carY === finishline[1][1])) {
		
			if (car[1][0] < finishline[0][0]) {
			lap += 1;
		

		} 	else if (car[1][0] > finishline[0][0]) {
			lap -= 1;
		}
	}
	lapTexto.textContent="Lap: "+lap;
}


function isOUT() {
	if (carX < 0
		|| carX > (total_col - 1) * blockSize
		|| carY < 0
		|| carY > (total_row - 1) * blockSize
		|| !(road.isPointInPath(carX, carY))
	) {

		// Out of bound condition
		gameOver = true;
		alert("Game Over");
	}
}
function isOver() {
	if (lap > total_laps){
		gameOver = true;
		alert("Felicitaciones! Completaste la carrera en "+ Math.floor(time*10)/10 + " segundos.");
	}
}