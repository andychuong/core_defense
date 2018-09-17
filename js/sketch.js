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
let playerSpd = 1.5
// Set up core and shields
let coreSize = 40
let myCore
let armLength = 70
let shieldSize = 15
let shield0
let shield1
let shield2
let shield3
// Initial Shield Rotations
let deg0 = Math.PI
let deg1 = 2 * Math.PI
let deg2 = Math.PI / 2
let deg3 = -Math.PI / 2
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
  diff = 5
  // Collision groups
  shields = new Group()
  projectiles = new Group()
  // Border walls
  createWalls()
  // Create core
  myCore = createSprite(coreX,coreY, coreSize, coreSize)
  myCore.setCollider('circle', 0, 0, coreSize + 20)
  // Create Shields
  push()
  myCanvas.translate(coreX, coreY)
  createShields()
  pop()
  // Create projectiles
  for (let i = 0; i < (diff * 10); i++) {
    // set random direction
    let px = width * random()
    let py = height * random()
    //create sprite
    createProjectile(px, py)
  }
}

function draw() {
  // Reset Background before drawing
  background(10);
  // Update Core's x, y
  updateCore()
  // Update Shields' rotations
  updateShields()
  // Bounds check
  wallBounce()
  // Collision
  projectiles.overlap(shields, hitShield);
  projectiles.overlap(myCore, hitCore)
  // Draw all Sprites
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

function wallBounce(){
  projectiles.bounce(wallTop);
  projectiles.bounce(wallBottom);
  projectiles.bounce(wallLeft);
  projectiles.bounce(wallRight);
}

function updateCore() {
  if (keyDown('w')) {
    if(coreY > armLength + shieldSize/2){
      coreY -= playerSpd
    }
  }
  if (keyDown('s')) {
    if(coreY < height - armLength - shieldSize/2){
      coreY += playerSpd
    }
  }
  if (keyDown('a')) {
    if(coreX > armLength + shieldSize/2 ){
      coreX -= playerSpd * 1.2
    }
  }
  if (keyDown('d')) {
    if(coreX < width - armLength - shieldSize/2){
      coreX += playerSpd * 1.2
    }
  }
  myCore.position.x = constrain(coreX,0+armLength, width - armLength)
  myCore.position.y = constrain(coreY,0-armLength, height - armLength)
}

function createShields() {
  shield0 = createSprite(coreX + armLength * cos(deg0), coreY + armLength * sin(deg0), shieldSize, shieldSize)
  shields.add(shield0)
  shield0.setCollider('circle', 0, 0, shieldSize -5)
  shield1 = createSprite(coreX + armLength * cos(deg1), coreY + armLength * sin(deg1), shieldSize, shieldSize)
  shields.add(shield1)
  shield1.setCollider('circle', 0, 0, shieldSize -5)
  shield2 = createSprite(coreX + armLength * cos(deg2), coreY + armLength * sin(deg2), shieldSize, shieldSize)
  shields.add(shield2)
  shield2.setCollider('circle', 0, 0, shieldSize -5)
  shield3 = createSprite(coreX + armLength * cos(deg3), coreY + armLength * sin(deg3), shieldSize, shieldSize)
  shields.add(shield3)
  shield3.setCollider('circle', 0, 0, shieldSize -5)
}

function updateShields() {
  if (keyDown(LEFT_ARROW)) {
    deg0 -= rotateSpd
    deg1 -= rotateSpd
    deg2 -= rotateSpd
    deg3 -= rotateSpd
  }
  if (keyDown(RIGHT_ARROW)) {
    deg0 += rotateSpd
    deg1 += rotateSpd
    deg2 += rotateSpd
    deg3 += rotateSpd
  }
  shield0.position.x = (coreX + armLength * cos(deg0))
  shield0.position.y = (coreY + armLength * sin(deg0))

  shield1.position.x = (coreX + armLength * cos(deg1))
  shield1.position.y = (coreY + armLength * sin(deg1))

  shield2.position.x = (coreX + armLength * cos(deg2))
  shield2.position.y = (coreY + armLength * sin(deg2))

  shield3.position.x = (coreX + armLength * cos(deg3))
  shield3.position.y = (coreY + armLength * sin(deg3))
}

function createProjectile(x, y) {
  let a = createSprite(x, y, 50, 50);
  // var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
  // a.addImage(img);
  a.setSpeed(7, random(360))
  a.rotationSpeed = 0.5
  //a.debug = true;
  a.scale = 0.2
  a.setCollider('circle', 0, 0, 10)
  projectiles.add(a)
  return a;
}

function hitShield(projectile,shield) {
  // health -= 10;
  // if (health === 0) {
  //   gg()
  // }
  console.log('hit')
  projectile.remove();
}

function hitCore(projectile,myCore){
  console.log('corehit')
  projectile.remove()
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

//
// function drawCore() {
//   fill(255, 0, 0)
//   ellipseMode(CENTER)
//   ellipse(coreX, coreY, 25, 25)
// }
