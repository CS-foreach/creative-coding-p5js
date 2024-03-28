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
  rect(0,height-70,100,30);
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
  check_collision("Y");
  playerY += playerVelocityY;
  
  /*
  if (playerY > height - 20) {
    playerY = height - 20;
    playerVelocityY = 0;
  }
  */
  
  playerVelocityX = constrain(playerVelocityX, -playerTopSpeed, playerTopSpeed);
  check_collision("X");
  playerX += playerVelocityX;
}

function check_collision(direction){
  if(direction == "X"){
    if(playerVelocityX < 0){                                     //When velocity is less than 0, the player is moving left.
      if(isTouching("left")){          //Check if there is an object on the player's left
        if(-playerVelocityX < 2){
          playerVelocityX = 0;
        }
        playerVelocityX = -playerVelocityX * 0.5;
      }
    }
    else if(playerVelocityX > 0){                                //When velocity is more than 0, the player is moving right.
      if(isTouching("right")){         //Check if there is an object on the player's right
        if(playerVelocityX < 2){
          playerVelocityX = 0;
        }
        playerVelocityX = -playerVelocityX * 0.5;
      }                           
    }
  }
  else{
    if(playerVelocityY < 0){                                     //When velocity is less than 0, the player is moving left.
      if(isTouching("top")){          //Check if there is an object touching the player's head
        playerVelocityY = -playerVelocityY;
      }
    }
    if(playerVelocityY > 0){
      if(isTouching("bottom")){        //Check if there is an object directly under the player
        playerVelocityY = 0; 
      }
    }
  }
}

function isTouching(direction){
  if (direction == "top"){
    return !get(playerX, playerY).every((val,index) => val === bg_color_array[index]) |
           !get(playerX + playerWidth/2, playerY).every((val,index) => val === bg_color_array[index]) |
           !get(playerX + playerWidth, playerY).every((val,index) => val === bg_color_array[index]);
  }
  if (direction == "bottom"){
    return !get(playerX, playerY + playerHeight).every((val,index) => val === bg_color_array[index]) |
           !get(playerX + playerWidth/2, playerY + playerHeight).every((val,index) => val === bg_color_array[index]) | 
           !get(playerX + playerWidth, playerY + playerHeight).every((val,index) => val === bg_color_array[index]);
  }
  if (direction == "left"){
    return !get(playerX, playerY + playerHeight/2).every((val,index) => val === bg_color_array[index]);
  }
  if (direction == "right"){
    return !get(playerX + playerWidth, playerY + playerHeight/2).every((val,index) => val === bg_color_array[index]);;
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
