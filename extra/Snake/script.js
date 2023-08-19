var blockSize = 25;
var total_row = 17; //total row number
var total_col = 17; //total column number
var board;
var context;
var carLength=3;

var carX = 25;
var carY = 25;

var plusX = 200;
var plusY = 200;

// Set the total number of rows and columns
var speedX = 0; //speed of car in x coordinate.
var speedY = 0; //speed of car in Y coordinate.

var car = [];
var plus= [];

var gameOver = false;

window.onload = function () {
	// Set board height and width
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

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
	
	//Update Position Car
	car[0] = [carX, carY];

	for(i=carLength-1;i>0;i--){
		car[i]=car[i-1];
	}

	carX += speedX * blockSize; //updating car position in X coordinate.
	carY += speedY * blockSize; //updating car position in Y coordinate.
	context.fillStyle = "red";
	context.fillRect(carX, carY, blockSize, blockSize);
	for(i=carLength-1;i>0;i--){
		context.fillRect(car[i][0], car[i][1], blockSize, blockSize);
	}
	isOUT(); 
	isCrash();
	isPlus();

	//Update Position Plus
	plus[0] = [plusX, plusY];
	context.fillStyle = "yellow";
	context.fillRect(plusX, plusY, blockSize, blockSize);
}

// Movement of the car - We are using addEventListener
function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) {
		// If up arrow key pressed with this condition...
		// car will not move in the opposite direction
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		//If down arrow key pressed
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		//If left arrow key pressed
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) {
		//If Right arrow key pressed
		speedX = 1;
		speedY = 0;
	}
	else if (e.code == "KeyP") {
		//If Right arrow key pressed
		speedX = 0;
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


		plusX = Math.floor(Math.random() * total_row )* blockSize;
		plusY = Math.floor(Math.random() * total_col) * blockSize;



	}
}