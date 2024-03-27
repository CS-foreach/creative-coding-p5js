class Player {
    constructor(){
        this.r = 50;
        this.x = this.r;
        this.y = this.r;
        this.jumpPower = 5;
        this.runSpeed = 5;

        this.canJump = true;
        this.y_speed = 0;
    }

    check_on_land(){
        if (get(this.x, this.bottom()+1).every((val,index) => val === bg_color_array[index])){        //If this player is in the air...
            this.canJump = false;                                                                     //this player cannot jump.
            return false;
        }
        else{
            this.canJump = true;
            return true;
        }
    }

    gravity(){
        if (this.y_speed < 10){
            this.y_speed += gravity_strength;
        }

        //if (this.check_on_land() == false){
            this.y += min(this.y_speed,window.innerHeight-this.bottom());
        //}
    }

    draw(){
        circle(this.x, this.y, 2*this.r);
    }

    top(){
        return this.y - this.r;
    }

    bottom(){
        return this.y + this.r;
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    // focusing the sketch means keypresses
    // will work without you needing to "activate"
    // it by clicking on it
    this.focus();
}
  
let Player1 = new Player();
let Player2 = new Player();
  
let background_color = 'rgba(0,0,0,255)';
let bg_color_array = [0,0,0,255];
function draw() {
    Player1.gravity();
    Player2.gravity();
    running();

    background(background_color);

    fill("red");
    Player1.draw();

    fill("blue");
    Player2.draw();

    fill("yellow");
    rect(100, 500, 500, 200);

    textSize(50);
    fill('white');
    text(Player1.canJump, 50, 50);
}

let gravity_strength = 0.1;

function keyPressed() {
    if (key == "w" & Player1.canJump) {     //Replace canjump with check on land
        text(Player1.canJump, 50, 50);
        Player1.y_speed = -Player1.jumpPower;
    }
    if (keyCode === UP_ARROW & Player2.canJump) {
        Player2.y_speed = -Player2.jumpPower;
    }
}

function running(){
    if (keyIsDown(65)){         //The ASCII keycode for "a" is 65.
        Player1.x -= Player1.runSpeed;
    }
    if (keyIsDown(68)){         //The ASCII keycode for "d" is 68.
        Player1.x += Player1.runSpeed;
    }
    if (keyIsDown(LEFT_ARROW)){
        Player2.x -= Player2.runSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)){
        Player2.x += Player2.runSpeed;
    }
}