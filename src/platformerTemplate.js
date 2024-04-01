// Where the bottom-left of the player is
let playerX;
let playerY;

// How tall and wide the player is
let playerHeight = 20;
let playerWidth = 20;

// How fast a player speeds up left or right
let playerAcceleration = 1.5;

// How fast a player can move
let playerGroundTopSpeed = 6;
let playerAirbornTopSpeed = 4;

// How high the player can jump
let jumpForce = -6;

// How fast the player is moving now
let playerVelocityY = 0;
let playerVelocityX = 0;

// How fast the player falls
let gravity = 0.4;

// How slippery moving is
let groundFriction = 0.13;
let airFriction = 1;

function setup() {
	createCanvas(400, 300);

	if (debugMode) {
		frameRate(60);
	}

	this.focus();
	noStroke();
	noSmooth();
	rectMode(CORNERS);
	newGame();
}

let debugMode = true;
let debugStep = false;
function draw() {
	checkInputs();
	drawLevel();
	applyPhysics();
	drawPlayer();
	if (debugMode) {
		drawDebugInfo();
	}
}

function checkInputs() {
	if (keyIsDown(65)) {
		move("left");
	}

	if (keyIsDown(68)) {
		move("right");
	}
}

let boundColor = "white";
let bg_color = "black";
function drawLevel() {
	background(bg_color);
	drawBounds();

	defaultLevel();

	drawExit(levelExit_X, levelExit_Y, levelExit_Size);
}

function drawBounds() {
	push();
	noFill();
	strokeWeight(2);
	stroke(boundColor);
	rect(0, 0, width, height);
	pop();
}

function defaultLevel() {
	drawFloor(50, 250, 60, "grey");
	drawFloor(150, 200, 30, "grey");

	drawTrickyFloor(50, 170, 50);
	drawTrickyFloor(137, 141, 50);
}

function drawFloor(x, y, w, c) {
	fill(c);
	rect(x, y, x + w, y + 10);
}

function drawTrickyFloor(x, y, w) {
	fill("lightblue");
	rect(x, y, x + w, y + 4);
}

function drawBlock(x, y) {
	fill("darkred");
	rect(x, y, x + 30, y + 30);
}

function drawPlayer() {
	push();
	fill("red");
	noStroke();
	rect(playerX, playerY, playerX + playerWidth, playerY + playerHeight);
	pop();
}

//Where the level exit icon is
let levelExit_X;
let levelExit_Y;
let levelExit_Size;
function newGame() {
	playerY = height - 2 * playerHeight;
	playerX = width / 2;
	levelExit_X = 255;
	levelExit_Y = 70;
	levelExit_Size = 75;
	player_won = false;
	airborn = false;
}

function drawExit(x, y, size) {
	textSize(size / 3);
	textAlign(CENTER, CENTER);
	text("😀", x + size / 2, y + size / 2);
	if (
		(x <= playerX) &
		(playerX <= x + size) &
		(y <= playerY) &
		(playerY <= y + size)
	) {
		YouWin();
	}
}

let player_won = false;
function YouWin() {
	player_won = true;
	textSize(75);
	fill("yellow");
	text("YOU WIN!!!", width / 2, height / 2);
	textSize(20);
	fill("white");
	text("Press space to restart.", width / 2, height * 0.75);
	text("Change what happens when you win!", width / 2, height * 0.9);
	playerVelocityX = 0;
	playerVelocityY = 0;
}

function keyPressed() {
	if (key == " ") {
		move("up");
		if (player_won) {
			newGame();
		}
	}

	if (debugMode) {
		if (key == "`") {
			debugStep = !debugStep;
			toggleLoop();
		}

		if (key == "s" && debugStep) {
			redraw();
		}
	}
}

function applyFriction() {
	if (airborn) {
		playerVelocityY += gravity;
		if (abs(playerVelocityX) > playerAirbornTopSpeed) {
			let vxSign = playerVelocityX < 0 ? -1 : 1;
			playerVelocityX = lerp(
				playerVelocityX,
				vxSign * playerAirbornTopSpeed,
				airFriction
			);
		} else {
			playerVelocityX = constrain(
				playerVelocityX,
				-playerAirbornTopSpeed,
				playerAirbornTopSpeed
			);
		}
	} else {
		playerVelocityX = lerp(playerVelocityX, 0, groundFriction);
		playerVelocityX = constrain(
			playerVelocityX,
			-playerGroundTopSpeed,
			playerGroundTopSpeed
		);
	}
}

function applyPhysics() {
	applyFriction();
	moveActors();
	enforceCollisions();
}

function moveActors() {
	playerX += playerVelocityX;
	playerY += playerVelocityY;

	[playerX, playerY] = [playerX, playerY].map((v) => round(v));
}

let airborn;
function enforceCollisions() {
	let collisions = getCollisions(playerX, playerY, playerWidth, playerHeight);
	if (collisions.includes("bottom")) {
		if (airborn) {
			playerVelocityY = 0;
			airborn = false;
		}
	} else {
		airborn = true;
	}

	if (collisions.includes("top")) {
		playerVelocityY = 8;
	}
}

function getCollisions(x, y, w, h) {
	const bounds = [
		{ side: "left", arr: [x - 1, y, 1, h] },
		{ side: "top", arr: [x, y - 1, w, 1] },
		{ side: "right", arr: [x + w + 1, y, 1, h] },
		{ side: "bottom", arr: [x, y + h + 1, w, 1] },
	];

	let collisions = [];
	const bg_array = color(bg_color).levels.join(",");
	for ({ side, arr } of bounds) {
		let box = get(...arr);
		box.loadPixels();
		for (let i = 0; i < box.pixels.length; i += 4) {
			let pixel = box.pixels.slice(i, i + 4).join(",");
			if (pixel != bg_array) {
				if (debugStep) {
					console.log(`${side} ${i} : ${pixel}`);
				}
				collisions.push(side);
				break;
			}
		}
	}

	return collisions;
}

function move(direction) {
	if (direction == "up" && playerVelocityY == 0) {
		playerVelocityY += jumpForce;
	}

	if (direction == "left") {
		playerVelocityX -= playerAcceleration;
	}
	if (direction == "right") {
		playerVelocityX += playerAcceleration;
	}
}

function mouseClicked() {
	console.log(`${get(mouseX, mouseY)}`);
}

function toggleLoop(pushPop) {
	if (pushPop) {
		isLooping() ? push() : pop();
	}

	isLooping() ? noLoop() : loop();
}

function drawDebugInfo() {
	fill("white");
	textSize(10);
	noStroke();
	textAlign(LEFT);

	let [opX, opY] = [playerVelocityX, playerVelocityY].map((value) =>
		value < 0 ? " - " : " + "
	);

	let [X, Y, vY, vX] = [playerX, playerY, playerVelocityY, playerVelocityX].map(
		(value) => abs(value).toFixed(2)
	);

	text(`Y: ${Y}${opY}${vY}`, 5, 10);
	text(`X: ${X}${opX}${vX}`, 5, 20);
	text(`airborn: ${airborn}`, 5, 30);
	text(
		`collide: ${getCollisions(playerX, playerY, playerWidth, playerHeight)}`,
		5,
		40
	);
}
