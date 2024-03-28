// Where the player is now
let playerX;
let playerY;

// How fast a player speeds up left or right
let playerAcceleration = 0.5;

// How fast a player can move
let playerTopSpeed = 10;

// How high the player can jump
let jumpForce = -13;

// How fast the player is moving now
let playerVelocityY = 0;
let playerVelocityX = 0;

// How fast the player falls
let gravity = 1.2;

// How slippery moving is
let groundFriction = 0.8;
let airFriction = 0.99;

function setup() {
  createCanvas(400, 300);
  this.focus();
  newGame();
}

function draw() {
  checkInputs();
  drawLevel();
  drawPlayer();
}

function checkInputs() {
  if (keyIsDown(65)) {
    move("left");
  } else if (keyIsDown(68)) {
    move("right");
  } else {
    applyFriction();
  }
}

function drawLevel() {
  background(0);
}

function drawPlayer() {
  applyPhysics();
  checkBoundaries();

  fill("red");
  rect(playerX, playerY, 20, 20);
}

function checkBoundaries() {
  playerX = constrain(playerX, 0, width - 20);
  playerY = constrain(playerY, 0, height - 20);
}

function newGame() {
  playerY = height - 15;
  playerX = width / 2;
}

function keyPressed() {
  if (key == " ") {
    move("up");
  }
}

function applyFriction() {
  if (playerVelocityY) {
    playerVelocityX *= airFriction;
  } else {
    playerVelocityX *= groundFriction;
  }
}

function applyPhysics() {
  playerVelocityY += gravity;
  playerY += playerVelocityY;
  
  if (playerY > height - 20) {
    playerY = height - 20;
    playerVelocityY = 0;
  }
  
  playerVelocityX = constrain(playerVelocityX, -playerTopSpeed, playerTopSpeed);
  playerX += playerVelocityX;
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
