let playerX;
let playerY;
let playerSpeed = 2;
let playerVelocityY = 0;

let gravity = 0.6;
let jumpForce = -10;

function setup() {
  createCanvas(400, 300);
  noStroke();
  this.focus();
  newGame();
}

function move(direction) {
  if (direction == "up" && playerVelocityY == 0) {
    playerVelocityY += jumpForce;
  }

  if (direction == "left") {
    playerX = playerX - playerSpeed;
  }
  if (direction == "right") {
    playerX = playerX + playerSpeed;
  }
}

function checkBoundaries() {
  playerX = constrain(playerX, 0, width - 30);
  playerY = constrain(playerY, 0, height - 30);
}

function applyGravity() {
  playerVelocityY += gravity;
  playerY += playerVelocityY;

  if (playerY > height - 30) {
    playerY = height - 30;
    playerVelocityY = 0;
  }
}

function newGame() {
  playerY = height - 15;
  playerX = width / 2;
}

function draw() {
  if (keyIsDown(65)) {
    move("left");
  }

  if (keyIsDown(68)) {
    move("right");
  }

  drawLevel();
  drawPlayer();
}

function drawLevel() {
  background(0);
}

function drawPlayer() {
  applyGravity();
  checkBoundaries();

  fill("red");
  rect(playerX, playerY, 30, 30);
}

function keyPressed() {
  if (key == " ") {
    move("up");
  }
}
