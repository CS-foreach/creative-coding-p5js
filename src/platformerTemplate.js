function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    // focusing the sketch means keypresses
    // will work without you needing to "activate"
    // it by clicking on it
    this.focus();
  }
  
  let r = 50;
  let x = r;
  let y = r;
  
  let r2 = 50;
  let x2 = r2;
  let y2 = r2;
  
  function draw() {
    background("black");
    
    fill("red");
    circle(x, y, 2*r);
    
    fill("blue");
    circle(x2, y2, 2*r);
  }
  
  function keyPressed() {
    if (key == "w") {
      y = y - r;
    }
    
    if (key == "a") {
      x = x - r;
    }
    
    if (key == "s") {
      y = y + r;
    }
    
    if (key == "d") {
      x = x + r;
    }
    
    if (keyCode === UP_ARROW) {
      y2 = y2 - r2;
    }
    
    if (keyCode === LEFT_ARROW) {
      x2 = x2 - r2;
    }
    
    if (keyCode === DOWN_ARROW) {
      y2 = y2 + r2;
    }
    
    if (keyCode === RIGHT_ARROW) {
      x2 = x2 + r2;
    }
  }