let x, y;
let paths;
let playing;

/**
 * holds a closure created by `elapsedFrameCounter` that returns if n this.frames 
 *  have elapsed since the last call
 */
let framesHaveElapsed;


/**
 * S k e t c h
 */
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	framesHaveElapsed = elapsedFrameCounter();

	reset();
	this.focus();
}

function reset() {
	playing = false;
	clear();
    paths = new PathTracker();
    nullXY();
	
	fill("red");
}

function draw() {
	if (playing) { 
		let points = paths.next();
		if (points == null) { togglePlay(); }
		else { for (p of points) { placeActor(p); } }
	}
}

function placeActor(where) { circle(where.x, where.y, 30); }

function togglePlay() {
	if (playing) { playing = false; }
	else { clear(); paths.jump(0); playing = true; }
}

/**
 * E v e n t s
 */
function touchStarted() { clickHandler(); return false; }
function touchMoved()   { clickHandler(); return false; }
function clickHandler() {
    x = mouseX;
	y = mouseY;

    if (framesHaveElapsed(1)) { placeActor({x, y}); paths.push({x, y}); }
}

function keyPressed() {
    // ctrl+c
	if (key == "c" && keyIsDown(CONTROL)) { exportPath();} else
    if (key == "c") { clear(); }
	if (key == "r") { reset(); }
	if (key == " ") { togglePlay(); }
	if (key == "n") { paths.new(); }
	if (key == "q") { paths.jump(0); }

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

/**
 * C l a s s e s
 * 	PathTracker, an interface for frame-by-frame coordinate sequences
 * 		.push 	 add given object to activePath at currentFrame
 * 		.new  	 change activePath to an empty slot and return the id
 * 		.jump 	 change currentFrame to given frame
 * 		.edit 	 change activePath to the given id
 * 		.next 	 if next frame exists, return that data and increment current, else null
 * 		.delete  delete the given path for all frames, or a range if given
 * 		.load	 pull frames from localStorage
 * 		.save	 send frames to localStorage
 * 		.import	 set frames to the given data
 * 		.export	 send frames to clipbard if truthy arg, otherwise return them
 */
class PathTracker {
	constructor() {
		this.frames = [];
		this.currentFrame = 0;
		this.activePath = 0;
	}

	push(data) { 
		if (!this.frames[this.currentFrame]) { this.frames[this.currentFrame] = []; }
		this.frames[this.currentFrame++][this.activePath] = data; 
	}

	new		() { return this.activePath++; }
	jump  (to) { this.currentFrame = to; }
	edit(path) { this.activePath = path; }

	next(paths) {
		if (this.currentFrame >= this.frames.length) { return null; }

		let frame = [];

		if (paths == null) { frame = this.frames[this.currentFrame]; } 
		else { for (path of paths) { frame.push(this.frames[this.currentFrame][path]); } }
		
		this.currentFrame++;
		return frame.flat();
	}

	delete({path=null, from=0, to=null} = {}) {
		if (path==null) { path = this.activePath; }
		
		let stop  = (to) ? to : this.frames.length - 1;
		for (i = from; i <= stop; i++) { delete this.frames[i][path]; }
	}

	load() { this.frames = JSON.parse(localStorage.getItem("PathTracker frames")); }
	save() { localStorage.setItem("PathTracker frames", this.export(false)); }
	
	import(_frames) { this.frames = _frames; }
	export(toClipboard) {
		let output = JSON.stringify(this.frames);

		if (toClipboard) { navigator.clipboard.writeText(output); }
		else 			 { return output; }
	}
}
