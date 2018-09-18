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
const rotateSpd = .06
const playerSpd = 2
// Set up core and shields
const coreSize = 40
let myCore
const armLength = 80
const shieldSize = 15
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
let walls
// Border wall thickness
let wallThickness = 30;
// DOM Stuff
let domLoaded = false
let healthDiv
let scoreDiv


function setup() {
  // Create canvas and add to dom ---------------------
  let canvasDiv = document.getElementById('canvasDiv')
  var width = canvasDiv.offsetWidth
  var height = windowHeight - (windowHeight / 5)
  background(10)
  var myCanvas = createCanvas(width, height);
  myCanvas.parent("canvasDiv")
  // Set Global Initial Values ------------------------
  // Core Coordinates
  coreX = width / 2
  coreY = height / 2
  // Difficulty and spawns (spawns = 5 * diff)
  diff = 5
  // Collision groups
  shields = new Group()
  projectiles = new Group()
  walls = new Group()
  // Border walls
  createWalls()
  // Create core
  createCore()
  // Create Shields
  createShields()
  // Create projectiles
  createProjectiles(diff)
}

function draw() {
  // Reset Background before drawing
  background(10);
  // Update Core's x, y
  moveCore()
  // Update Shields' rotations
  rotateShields()
  // Bounds check
  projectiles.bounce(walls)
  // Collision
  projectiles.overlap(shields, hitShield)
  projectiles.overlap(myCore, hitCore)
  // Draw all Sprites
  drawSprites();
}

function createWalls() {
  wallTop = createSprite(width / 2, -wallThickness / 2 + 5, width + wallThickness * 2, wallThickness);
  wallTop.immovable = true;
  walls.add(wallTop)
  wallTop.shapeColor = "#ffffff"

  wallBottom = createSprite(width / 2, height + wallThickness / 2 - 5, width + wallThickness * 2, wallThickness);
  wallBottom.immovable = true;
  walls.add(wallBottom)
  wallBottom.shapeColor = "#ffffff"

  wallLeft = createSprite(-wallThickness / 2 + 5, height / 2, wallThickness, height);
  wallLeft.immovable = true;
  walls.add(wallLeft)
  wallLeft.shapeColor = "#ffffff"

  wallRight = createSprite(width + wallThickness / 2 - 5, height / 2, wallThickness, height);
  wallRight.immovable = true;
  walls.add(wallRight)
  wallRight.shapeColor = "#ffffff"
}

function createCore() {
  let img = loadImage('img/core1.png');
  myCore = createSprite(coreX, coreY)
  myCore.setCollider('circle', 0, 0, 50)
  // myCore.shapeColor = "#00ddff"
  myCore.addImage(img)
}

function moveCore() {
  if (keyDown('w')) {
    if (coreY > armLength + shieldSize / 2) {
      coreY -= playerSpd
    }
  }
  if (keyDown('s')) {
    if (coreY < height - armLength - shieldSize / 2) {
      coreY += playerSpd
    }
  }
  if (keyDown('a')) {
    if (coreX > armLength + shieldSize / 2) {
      coreX -= playerSpd * 1.2
    }
  }
  if (keyDown('d')) {
    if (coreX < width - armLength - shieldSize / 2) {
      coreX += playerSpd * 1.2
    }
  }
  myCore.position.x = constrain(coreX, 0 + armLength, width - armLength)
  myCore.position.y = constrain(coreY, 0 - armLength, height - armLength)
}

function createShields() {
  let img = loadImage('img/shield1.png');

  shield0 = createSprite(coreX + armLength * cos(deg0), coreY + armLength * sin(deg0))
  shields.add(shield0)
  shield0.setCollider('circle', 0, 0, 30)
  // shield0.shapeColor = "#00ff00"
  shield0.addImage(img);
  shield0.scale = 0.4;

  shield1 = createSprite(coreX + armLength * cos(deg1), coreY + armLength * sin(deg1))
  shields.add(shield1)
  shield1.setCollider('circle', 0, 0, 30)
  // shield1.shapeColor = "#00ff00"
  shield1.addImage(img);
  shield1.scale = 0.4;

  shield2 = createSprite(coreX + armLength * cos(deg2), coreY + armLength * sin(deg2))
  shields.add(shield2)
  shield2.setCollider('circle', 0, 0, 30)
  // shield2.shapeColor = "#00ff00"
  shield2.addImage(img);
  shield2.scale = 0.4;

  shield3 = createSprite(coreX + armLength * cos(deg3), coreY + armLength * sin(deg3))
  shields.add(shield3)
  shield3.setCollider('circle', 0, 0, 30)
  // shield3.shapeColor = "#00ff00"
  shield3.addImage(img);
  shield3.scale = 0.4;
}

function rotateShields() {
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

function createProjectiles(diff) {
  for (let i = 0; i < (diff * 8); i++) {
    // set random direction
    let px = width * random()
    let py = height * random()
    //create sprite
    createProjectile(px, py)
  }
}

function createProjectile(x, y) {
  let a = createSprite(x, y, 10, 10);
  // var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
  // a.addImage(img);
  a.setSpeed(4.5, random(360))
  // a.setSpeed(2, random(360))
  a.rotationSpeed = 0.5
  //a.debug = true;
  // a.scale = 0.2
  a.shapeColor = "#ff2222"
  a.setCollider('circle', 0, 0, 10)
  projectiles.add(a)
  return a;
}

function hitShield(projectile, shield) {
  // health -= 10;
  // if (health === 0) {
  //   gg()
  // }
  // console.log('hit')
  projectile.remove();
  score += diff
  console.log(`score: ${score}`)
  if (domLoaded) {
    scoreDiv.innerText = `score: ${score}`
  }
}

function hitCore(projectile, myCore) {
  // console.log('corehit')
  projectile.remove()
  health -= 10
  console.log(`hp: ${health} `)
  if (domLoaded) {
    healthDiv.innerText = `hp: ${health} `
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
  // walls.remove()
  // createWalls()
}
// Non p5.js code ~ domcontentloaded
function init() {
  // DOM
  document.getElementById("mainHeader").innerText = 'Core Defense'
  healthDiv = document.getElementById('health')
  scoreDiv = document.getElementById('score')
  domLoaded = true
  scoreDiv.innerText = `score: ${score}`
  healthDiv.innerText = `hp: ${health} `
}

window.addEventListener('load', init);

// OLD CODE. REF MATERIAL ------------>>>>> >>>> >>> >> >

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


// function wallBounce() {
//   projectiles.bounce(walls);
//   // projectiles.bounce(wallBottom);
//   // projectiles.bounce(wallLeft);
//   // projectiles.bounce(wallRight);
// }

// for (let i = 0; i < 4; i++) {
//   `shield${i}` = createSprite(coreX + armLength * cos(`deg${i}`), coreY + armLength * sin(`deg${i}`))
//   shields.add(`shield${0}`)
//   `shield${i}`.setCollider('circle', 0, 0, 32)
//   `shield${i}`.shapeColor = "#00ff00"
//   `shield${i}`.addImage(img);
//   `shield${i}`.scale = 0.4;
// }
