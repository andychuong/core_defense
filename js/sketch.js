// Running score
let score = 0
/* Program state: 0, 1, 2
    0 - Intro Screen
    1 - Actual Gameplay
    2 - Game Over / Performance Overview
*/
let gameStage = 0
// Current health: starts at 100
let health = 100
// Coordinates for core / player
let coreX
let coreY
// Initial Shield Rotations
let deg = Math.PI
let deg2 = Math.PI/2
let deg3 = -Math.PI/2
let deg4 = 2*Math.PI
// Difficulty
let diff
// Collision Groups
let shields
let projectiles

function setup() {
  // put setup code here

  var myCanvas = createCanvas(windowWidth -5, windowHeight-5);
  myCanvas.parent("container")
  // Init globals --- >>
  // Core Coordinates
  coreX = windowWidth/2
  coreY = windowHeight/2
  // Difficulty and spawns (spawns = 5 * diff)
  diff = 1
  // Collision groups
  shields = new Group()
  projectiles = new Group()
}

function draw() {
  // put drawing code here
    background(255);
    fill(10)
    rect(100,100, windowWidth - 200, windowHeight - 200);

    // Move player
    switch(true){
      case keyDown('w'):
        coreY--
        break
      case keyDown('s'):
        coreY++
        break
      case keyDown('a'):
        coreX--
        break
      case keyDown('d'):
        coreX++
        break

    }

    // Draw 'core'
    fill(255,0,0)
    ellipseMode(CENTER)
    ellipse(coreX, coreY, 25, 25)

    fill(0,255,0)
    // Key Down - Rotate shields
    if (keyDown(LEFT_ARROW)) {
      deg -= .05
      deg2 -= .05
      deg3 -= .05
      deg4 -= .05
    }
    if (keyDown(RIGHT_ARROW)) {
      deg += .05
      deg2 += .05
      deg3 += .05
      deg4 += .05
    }

    // Adjust origin
    translate(coreX,coreY);
    // Draw shields
    ellipse(50 * cos(deg), 50 * sin(deg), 20, 20)
    ellipse(50 * cos(deg2), 50 * sin(deg2), 20, 20)
    ellipse(50 * cos(deg3), 50 * sin(deg3), 20, 20)
    ellipse(50 * cos(deg4), 50 * sin(deg4), 20, 20)

    for(let i = 0; i < (diff * 5);i++){
        //create sprite
        // set random direction
    }
}

function hit() {
  health -= 10;
  if (health === 0){
    gg()
  }
}

function getHp() {
  health += 10
}

function gg() {
  gameStage = 3
}


//
// function windowResized(){
// 	resizeCanvas(windowWidth,windowHeight);
// }
//
// function init(){
//
// }
//
// window.addEventListener('load', init);
//



// OLD CODE. REF MATERIAL ------------>>>>>

// function mousePressed() {
//   deg -= .5
// }

// Temp setup for rotating shields

// function keyPressed() {
//     if(key === "a"){
//       deg -= .25
//       deg2 -= .25
//       deg3 -= .25
//       deg4 -= .25
//     }if(key === "d"){
//       deg += .25
//       deg2 += .25
//       deg3 += .25
//       deg4 += .25
//     }
// }
