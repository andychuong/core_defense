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
// Border wall thickness
let wallThickness = 30;

function setup() {
  // put setup code here
  let canvasDiv = document.getElementById('canvasDiv')
  var width = canvasDiv.offsetWidth
  var height = windowHeight - (windowHeight / 5)
  background(10)
  var myCanvas = createCanvas(width, height);
  myCanvas.parent("canvasDiv")
  // Init globals --- >>
  // Core Coordinates
  coreX = width / 2
  coreY = height / 2
  // Difficulty and spawns (spawns = 5 * diff)
  diff = 1
  // Collision groups
  shields = new Group()
  projectiles = new Group()
  // Border walls
  createWalls()
  // Create projectiles
  for (let i = 0; i < (diff * 8); i++) {
    // set random direction
    let px = width * random()
    let py = height * random()
    //create sprite
    createProjectile(px, py)
  }
}

function draw() {

  // put drawing code Here
  // Play Window
  background(10);
  // update 'core'
  updateCore()
  // Draw 'core'
  drawCore()
  // Key Down - Rotate shields
  updateShields()
  // Draw shields
  drawShields()

  projectiles.bounce(wallTop);
  projectiles.bounce(wallBottom);
  projectiles.bounce(wallLeft);
  projectiles.bounce(wallRight);

  drawSprites();
}

function createWalls() {
  wallTop = createSprite(width / 2, -wallThickness / 2, width + wallThickness * 2, wallThickness);
  wallTop.immovable = true;

  wallBottom = createSprite(width / 2, height + wallThickness / 2, width + wallThickness * 2, wallThickness);
  wallBottom.immovable = true;

  wallLeft = createSprite(-wallThickness / 2, height / 2, wallThickness, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width + wallThickness / 2, height / 2, wallThickness, height);
  wallRight.immovable = true;
}

function drawCore() {
  fill(255, 0, 0)
  ellipseMode(CENTER)
  ellipse(coreX, coreY, 25, 25)
}

function updateCore() {
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
}

function drawShield(deg) {
  ellipse(50 * cos(deg), 50 * sin(deg), 20, 20)
}

function drawShields() {
  // Adjust origin
  push()
  translate(coreX, coreY);
  ellipseMode(CENTER)
  fill(0, 255, 0)
  drawShield(deg)
  drawShield(deg2)
  drawShield(deg3)
  drawShield(deg4)
  pop()

}

function updateShields() {
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
}

function createProjectile(x, y) {
  let a = createSprite(x, y);
  // var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
  // a.addImage(img);
  a.setSpeed(4, random(360));
  a.rotationSpeed = 0.5;
  //a.debug = true;
  a.scale = 0.2;
  a.setCollider('circle', 0, 0, 50);
  projectiles.add(a);
  return a;
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
  let canvasDiv = document.getElementById('canvasDiv')
  let width = canvasDiv.offsetWidth
  let height = windowHeight - (windowHeight / 5)
  resizeCanvas(width, height);

}
// Non p5.js code ~ domcontentloaded
function init() {
  // DOM
  document.getElementById("mainHeader").innerText = 'Core Defense'
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
