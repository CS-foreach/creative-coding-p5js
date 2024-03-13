# Week 7 - Key Events
## Learning Goals
- the `keyPressed` function
- condition blocks

## Resources
![snakeDemo](https://github.com/CS-foreach/creative-coding-p5js/assets/40075433/bd4570a0-4738-4c29-a3d8-6ee1a4d6ed8f)  
Sketch links: [fullscreen](https://editor.p5js.org/phentos/full/NNOOBqypR) , [code](https://editor.p5js.org/phentos/sketches/NNOOBqypR)

## Activity
- Personalize [the template](https://editor.p5js.org/phentos/sketches/FrvyS3wAZ) (4-way movement of a circle using keyboard arrow keys)
  - ~~the above sketch uses `e.key`, consider swapping to `keyCode`~~
  - template converted to use `key`, a p5 global for `event.key` (`keyCode` is the numeric representation)
 
### Ideas to start
  - Add a key to change...
    - the size of the circle
    - the color of the circle
    - what gets drawn (e.g. change circle to emoji)
  - Add a second object with its own keys
  - Pac-Man walls (moving outside the canvas loops you to the opposite side, e.g. going outside to the right puts you on the left)
 
### Contingencies
  - Bind a weird key (e.g. chromebook topkeys)
    - press it on [keycode.info](keycode.info) to get the `key` name
    - if it's a function key etc, add `return False` to the end of `function keyPressed` to prevent default behavior

## After action report
- Attendance: ??? students
- *TODO*
