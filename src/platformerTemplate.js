// Where the player is now
let playerX;
let playerY;

// How tall and wide the player is
let playerHeight = 20;
let playerWidth = 20;

// How fast a player speeds up left or right
let playerAcceleration = 0.5;

// How fast a player can move
let playerTopSpeed = 10;

// How high the player can jump
let jumpForce = -playerHeight / 2 + 1;

// How fast the player is moving now
let playerVelocityY = 0;
let playerVelocityX = 0;

// How fast the player falls
let gravity = 0.8;

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

let bg_color = "black";
function drawLevel() {
  background(bg_color);

  defaultLevel();

  drawExit(levelExit_X, levelExit_Y, levelExit_Size);
}

function defaultLevel() {
  drawFloor(50, 250, 60, "grey");
  drawFloor(150, 200, 30, "grey");

  drawTrickyFloor(50, 170, 50);
  drawTrickyFloor(137, 141, 50);
  drawBlock(280, 90);
}

function drawFloor(x, y, w, c) {
  fill(c);
  rect(x, y, w, 10);
}

function drawTrickyFloor(x, y, w) {
  fill("lightblue");
  rect(x, y, w, 4);
}

function drawBlock(x, y) {
  fill("darkred");
  rect(x, y, 30, 30);
}

function drawPlayer() {
  applyPhysics();
  checkBoundaries();

  fill("red");
  rect(playerX, playerY, playerWidth, playerHeight);
}

function checkBoundaries() {
  playerX = constrain(playerX, 0, width - playerWidth);
  playerY = constrain(playerY, 0, height - playerHeight);
}

//Where the level exit icon is
let levelExit_X;
let levelExit_Y;
let levelExit_Size;
function newGame() {
  playerY = height - playerHeight;
  playerX = width / 2;
  levelExit_X = 255;
  levelExit_Y = 70;
  levelExit_Size = 75;
  player_won = false;
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
  check_collision("Y");
  playerY += playerVelocityY;

  playerVelocityX = constrain(playerVelocityX, -playerTopSpeed, playerTopSpeed);
  check_collision("X");
  playerX += playerVelocityX;
}

function check_collision(direction) {
  if (direction == "X") {
    if (playerVelocityX < 0) {
      //When velocity is less than 0, the player is moving left.
      if (isTouching("left")) {
        //Check if there is an object on the player's left
        if (-playerVelocityX < 2) {
          playerVelocityX = 0;
        }
        playerVelocityX = -playerVelocityX * 0.5;
      }
    } else if (playerVelocityX > 0) {
      //When velocity is more than 0, the player is moving right.
      if (isTouching("right")) {
        //Check if there is an object on the player's right
        if (playerVelocityX < 2) {
          playerVelocityX = 0;
        }
        playerVelocityX = -playerVelocityX * 0.5;
      }
    }
  } else {
    if (playerVelocityY < 0) {
      //When velocity is less than 0, the player is moving left.
      if (isTouching("top")) {
        //Check if there is an object touching the player's head
        playerVelocityY = -playerVelocityY;
      }
    }
    if (playerVelocityY > 0) {
      if (isTouching("bottom")) {
        //Check if there is an object directly under the player
        playerVelocityY = 0;
      }
    }
  }
}

function isTouching(direction) {
  let bg_color_array = color(bg_color).levels;
  if (direction == "top") {
    return (
      !get(playerX, playerY).every(
        (val, index) => val === bg_color_array[index]
      ) |
      !get(playerX + playerWidth / 2, playerY).every(
        (val, index) => val === bg_color_array[index]
      ) |
      !get(playerX + playerWidth, playerY).every(
        (val, index) => val === bg_color_array[index]
      )
    );
  }
  if (direction == "bottom") {
    return (
      !get(playerX, playerY + playerHeight).every(
        (val, index) => val === bg_color_array[index]
      ) |
      !get(playerX + playerWidth / 2, playerY + playerHeight).every(
        (val, index) => val === bg_color_array[index]
      ) |
      !get(playerX + playerWidth, playerY + playerHeight).every(
        (val, index) => val === bg_color_array[index]
      )
    );
  }
  if (direction == "left") {
    return !get(playerX, playerY + playerHeight / 2).every(
      (val, index) => val === bg_color_array[index]
    );
  }
  if (direction == "right") {
    return !get(playerX + playerWidth, playerY + playerHeight / 2).every(
      (val, index) => val === bg_color_array[index]
    );
  }
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
  console.log(`${mouseX}, ${mouseY}`);
}
