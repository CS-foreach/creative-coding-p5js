let x;
let y;
let path = [];
let getNextXY;
let nextPosition;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  applyDefaults();
  this.focus();
}

function applyDefaults() {
  clear();
  x = window.innerWidth / 2;
  y = window.innerHeight / 2;
  getNextXY = getXY;
  fill("red");
}

function draw() {
  nextPosition = getNextXY();
  if (nextPosition == null) { getNextXY = getXY; return; } 
  if (nextPosition == false) { return; } 

  x = nextPosition.x;
  y = nextPosition.y;

  circle(x, y, 50);
}

function touchMoved() {
  x = mouseX;
  y = mouseY;
  path.push({x, y});
  
  return false;
}

function keyPressed() {
  if (key == "c" && keyIsDown("Control")) { exportPath(); }

  if (key == "r") { applyDefaults(); }
  
  if (key == " ") { clear(); getNextXY = generator(path); }
}

function generator(array) {
  let currentIndex = 0;
  return function() {
    return (currentIndex < array.length) ? array[currentIndex++] : null;
  };
}

function getXY() { 
  return {x:x, y:y}; 
}
  
function elapsedFrames() {
  let current = frameCount;
  let previous = current;
  return function (n) {
    previous = current;
    current = frameCount;
    return (current - previous) >= n;
  }
}  
  
function exportPath() {
  navigator.clipboard.writeText(JSON.stringify(path));
}