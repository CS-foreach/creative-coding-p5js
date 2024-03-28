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

bg_color = 'rgba(0,0,0,255)';
bg_color_array = [0,0,0,255];
function drawLevel() {
  background(bg_color);
  rect(0,0,2,height);
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

function newGame() {
  playerY = height - playerHeight;
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
  playerY += playerVelocityY;           //
  
  if (playerY > height - 20) {
    playerY = height - 20;
    playerVelocityY = 0;
  }
  
  playerVelocityX = constrain(playerVelocityX, -playerTopSpeed, playerTopSpeed);
  check_collision();
  playerX += playerVelocityX;
}

function check_collision(){
  if(playerVelocityX < 0){                                     //When velocity is less than 0, the player is moving left.
    if(!get(player("left"), player("center-y")).every((val,index) => val === bg_color_array[index])){          //Check if there is an object on the player's left
      if(-playerVelocityX < 2){
        playerVelocityX = 0;
      }
      playerVelocityX = -playerVelocityX * 0.5;
    }
  }
  else if(playerVelocityX > 0){                                //When velocity is more than 0, the player is moving right.
    if(!get(player("right"), player("center-y")).every((val,index) => val === bg_color_array[index])){         //Check if there is an object on the player's right
      if(playerVelocityX < 2){
        playerVelocityX = 0;
      }
      playerVelocityX = -playerVelocityX * 0.5;
    }                           
  }
}

function player(direction){
  if (direction == "top"){
    return playerY;
  }
  if (direction == "bottom"){
    return playerY + playerHeight;
  }
  if (direction == "left"){
    return playerX;
  }
  if (direction == "right"){
    return playerX + playerWidth;
  }
  if (direction == "center-x"){
    return playerX + playerWidth/2;
  }
  if (direction == "center-y"){
    return playerY + playerHeight/2;
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
