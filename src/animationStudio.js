let x, y;

// a list like [{x:someX, y:someY}], added to in touchMoved
let path; 

/**
 * getNextXY is asked for the `nextPosition` to draw
 *  can be:
 *      `generator` - when a path is to be played, set in `keyPressed`
 *      `getXY`     - (initial value set in `applyDefaults`) the current position
 *      `null`      - when a path has completed, set in `generator` closure
 */
let getNextXY; 
let nextPosition;

/**
 * holds a closure created by `elapsedFrameCounter` that returns if n frames 
 *  have elapsed since the last call
 */
let framesHaveElapsed;


/**
 * S k e t c h
 */
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	reset();
	this.focus();
	framesHaveElapsed = elapsedFrameCounter();
}

function reset() {
	clear();
    path = [];
    nullXY();
	getNextXY = getXY;
	fill("red");
}

function draw() {
	nextPosition = getNextXY();
	if (nextPosition == null) { getNextXY = getXY; }
    else { x = nextPosition.x; y = nextPosition.y; }

    if (x == null || y == null) { return; }
    else { circle(x, y, 50); }
}

/**
 * E v e n t s
 */
function touchStarted() { clickHandler(); return false; }
function touchMoved()   { clickHandler(); return false; }
function clickHandler() {
    x = mouseX;
	y = mouseY;

    if (framesHaveElapsed(1)) { path.push({x, y}); }
}

function keyPressed() {
    // ctrl+c
	if (key == "c" && keyIsDown(CONTROL)) { exportPath();} else
    if (key == "c") { clear(); nullXY(); }
	if (key == "r") { reset(); }
	if (key == " ") { clear(); getNextXY = generator(path); }

    return false;
}

/**
 * Misc helpers
 */
function getXY() { 
	return {x:x, y:y}; 
}

function nullXY() {
    x = null;
    y = null;
}

function exportPath() {
    console.log("exportPath");
	navigator.clipboard.writeText(JSON.stringify(path));
}


/**
 * C l o s u r e s 
 */
function generator(array) {
	let currentIndex = 0;
	return function() {
		return (currentIndex < array.length) ? array[currentIndex++] : null;
	};
}

function elapsedFrameCounter() {
	let current = frameCount;
	let previous = current;
	return function (n) {
		previous = current;
		current = frameCount;
		return (current - previous) >= n;
	}
}