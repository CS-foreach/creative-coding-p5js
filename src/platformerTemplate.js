function setup() {
    createCanvas(400, 300);
    this.focus();
  }
  

function draw() {
  drawLevel();
  drawPlayers();
}

function drawLevel() {}
function drawPlayers() {}
function jump(playerNumber) {}
function move(playerNumber, direction) {}

function keyPressed() {
  if (key == " ") {
    jump(1);
  }
  
  if (key == "a") {
    move(1, 'left');
  }
      
  if (key == "d") {
    move(1, 'right');
  }
}
