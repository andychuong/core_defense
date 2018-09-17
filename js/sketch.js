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
// Speed Controls
let rotateSpd = .05
let playerSpd = 1
// Initial Shield Rotations
let deg = Math.PI
let deg2 = Math.PI / 2
let deg3 = -Math.PI / 2
let deg4 = 2 * Math.PI
// Difficulty
let diff
// Collision Groups
let shields
let projectiles
// DOM STUFF


function setup() {
  // put setup code here
  let canvasDiv = document.getElementById('container')
  let width = canvasDiv.offsetWidth
  let height = canvasDiv.offsetHeight - (canvasDiv.offsetHeight/10)
  background(10)
  var myCanvas = createCanvas(width, windowHeight - (windowHeight/10));
  myCanvas.parent("container")
  // Init globals --- >>
  // Core Coordinates
  coreX = width / 2
  coreY = (windowHeight - (windowHeight/10)) / 2
  // Difficulty and spawns (spawns = 5 * diff)
  diff = 1
  // Collision groups
  shields = new Group()
  projectiles = new Group()
}

function draw() {
  // put drawing code Here
  // Play Window
  background(10);
  // fill(10)
  // rect(100, 100, windowWidth - 200, windowHeight - 200);

  // Move player

  if (keyDown('w')) {
    coreY -= playerSpd
  }
  if (keyDown('s')) {
    coreY += playerSpd
  }
  if (keyDown('a')) {
    coreX -= playerSpd
  }
  if (keyDown('d')) {
    coreX += playerSpd
  }

  // Draw 'core'
  fill(255, 0, 0)
  ellipseMode(CENTER)
  ellipse(coreX, coreY, 25, 25)

  fill(0, 255, 0)
  // Key Down - Rotate shields
  if (keyDown(LEFT_ARROW)) {
    deg -= rotateSpd
    deg2 -= rotateSpd
    deg3 -= rotateSpd
    deg4 -= rotateSpd
  }
  if (keyDown(RIGHT_ARROW)) {
    deg += rotateSpd
    deg2 += rotateSpd
    deg3 += rotateSpd
    deg4 += rotateSpd
  }

  // Adjust origin
  translate(coreX, coreY);
  // Draw shields
  ellipse(50 * cos(deg), 50 * sin(deg), 20, 20)
  ellipse(50 * cos(deg2), 50 * sin(deg2), 20, 20)
  ellipse(50 * cos(deg3), 50 * sin(deg3), 20, 20)
  ellipse(50 * cos(deg4), 50 * sin(deg4), 20, 20)

  for (let i = 0; i < (diff * 5); i++) {
    //create sprite
    // set random direction
  }
}

function hit() {
  health -= 10;
  if (health === 0) {
    gg()
  }
}

function getHp() {
  health += 10
}

function gg() {
  gameStage = 2
}


function windowResized() {
  resizeCanvas(windowWidth - 5, windowHeight - 5);
}

function init(){

}

window.addEventListener('load', init);




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

// move player
// switch(true){
//   case keyDown('w'):
//     coreY -= playerSpd
//     break
//   case keyDown('s'):
//     coreY += playerSpd
//     break
//   case keyDown('a'):
//     coreX -= playerSpd
//     break
//   case keyDown('d'):
//     coreX += playerSpd
//     break
// }
