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

var WALL_THICKNESS = 30;

function setup() {
  // put setup code here
  let canvasDiv = document.getElementById('canvasDiv')
  let width = canvasDiv.offsetWidth
  let height = windowHeight - (windowHeight / 5)
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

  wallTop = createSprite(0, -height/2-WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallTop.immovable = true;

  wallBottom = createSprite(0, height/2+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallBottom.immovable = true;

  wallLeft = createSprite(-width/2-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width/2+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallRight.immovable = true;

  for (let i = 0; i < (diff * 8); i++) {
    // set random direction
    let ang = random(360);
    let px = width/2  * cos(radians(ang));
    let py = height/2 * sin(radians(ang));
    //create sprite
    createProjectile(px,py)
    console.log(i)
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
  translate(coreX, coreY);
  ellipseMode(CENTER)
  fill(0, 255, 0)
  drawShield(deg)
  drawShield(deg2)
  drawShield(deg3)
  drawShield(deg4)
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
  // a.type = type;

  // if(type == 2)
  a.scale = 0.2;
  // if(type == 1)
  //   a.scale = 0.3;

  // a.mass = 2+a.scale;
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
