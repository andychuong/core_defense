// Running score
let score = 0
/* Program state: 0, 1, 2
    0 - Intro Screen
    1 - Actual Gameplay
    2 - Between Levels
    3 - Game Over / Performance Overview
*/
let gameStage = 0
// Current health: starts at 100
let health = 100
// Blocked and Missed
let blocked, missed
// Coordinates for core / player
let coreX, coreY
// Speed Controls
const rotateSpd = .05
const playerSpd = 2.5
// Set up core and shields
let armLength = 80
const shieldSize = 15
let myCore, shield0, shield1, shield2, shield3
// Initial Shield Rotations
let deg0 = Math.PI
let deg1 = 2 * Math.PI
let deg2 = Math.PI / 2
let deg3 = -Math.PI / 2
// Difficulty
let diff = 10
// Collision Groups
let shields, projectiles, walls
// Border wall thickness
let wallThickness = 30;
// DOM Stuff
let domLoaded = false
let healthDiv, scoreDiv

function setup() {
  // Create canvas and add to dom ---------------------
  let canvasDiv = document.getElementById('canvasDiv')
  var width = windowWidth - (windowWidth/5)
  var height = windowHeight - (windowHeight / 5)
  background(10)
  var myCanvas = createCanvas(width, height);
  myCanvas.parent("canvasDiv")

  // Set Global Initial Values ------------------------
  // Core Coordinates
  coreX = width / 2
  coreY = height / 2
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
  drawSprites(walls)
  switch (gameStage) {
    case 0: // Title Screen
      // Resets
      score = 0
      blocked = 0
      missed = 0
      // Objectives

      // Controls

      // Start
      ellipseMode(CENTER)
      ellipse(coreX, coreY, 200, 200)
      textSize(20)
      textAlign(CENTER)
      text('START', coreX, coreY)
      text(`(or press space)`, coreX, coreY + 20)
      textAlign(LEFT)
      fill('white')
      text(`W: ↑ Move core up`, coreX -130, 50)
      text(`S: ↓ Move player down`, coreX -130, 80)
      text(`A: ← Move player left`, coreX -130, 110)
      text(`D: → Move player right`, coreX -130, 140)
      text(`Left Arrow: ↺ Rotate shields left`, coreX -130, 170)
      text(`Right Arrow: ↻ Rotate shields right`, coreX -130, 200)

      if (keyDown('space')) {
        changegameStage()
      }
      break
    case 1: // Game Play
      textSize(20)
      textAlign(CENTER)
      fill(255,255,255)
      text(`Level ${diff}`, width/2, 30)
      moveCore() // Update Core's x, y
      rotateShields() // Update Shields' rotations
      projectiles.bounce(walls) // Bounds check
      // Collision
      projectiles.overlap(shields, hitShield)
      projectiles.overlap(myCore, hitCore)
      checkProjectiles()
      drawSprites() // Draw all Sprites
      break
    case 2: // Between Levels
      // Level Complete Notification
      fill('white')
      textSize(40)
      textAlign(CENTER)
      text(`Level ${diff -1} Complete!`, width / 2, height / 2 + 10)
      text(`Press space to continue`, width / 2, height / 2 + 60)
      // Score

      // Continue
      myCore.remove()

      for (let i = 0; i < shields.length; i++) {
        shields[i].remove()
      }
      if (keyDown('space')) {
        gameStage--
        setup()
      }

      break
    case 3: // Game Over: Summary
      // Game Over Notification
      fill('white')
      text(`Game Over`, width / 2, height / 2 + 30)

      // Score

      // Blocked

      // Missed

      // Main Menu
      myCore.remove()
      health = 100
      diff = 1
      for (let i = 0; i < shields.length; i++) {
        shields[i].remove()
      }
      // NEED TO FIX WEIRD THING WHERE SPACE IS HELD DOWN !!@#!@#
      if (keyDown('space')) {
        gameStage = 0
        setup()
      }
      break
  }
}
// NEEDS WORK
function mousePressed() {
  // Check if mouse is inside the circle
  var d = dist(mouseX, mouseY, coreX, coreY);
  if (d < 100 && gameStage === 0) {
    changegameStage()
  }
}
// REFACTOR THIS LATER/DELETE?
function changegameStage() {

  if (gameStage !== 3) {
    gameStage++
  } else {
    gameStage = 0
    setup()
  }
  init()
}

function createWalls() {
  wallTop = createSprite(width / 2, -wallThickness / 2 + 3, width + wallThickness * 2, wallThickness);
  wallTop.immovable = true;
  walls.add(wallTop)
  wallTop.shapeColor = "#dddddd"

  wallBottom = createSprite(width / 2, height + wallThickness / 2 - 3, width + wallThickness * 2, wallThickness);
  wallBottom.immovable = true;
  walls.add(wallBottom)
  wallBottom.shapeColor = "#dddddd"

  wallLeft = createSprite(-wallThickness / 2 + 3, height / 2, wallThickness, height);
  wallLeft.immovable = true;
  walls.add(wallLeft)
  wallLeft.shapeColor = "#dddddd"

  wallRight = createSprite(width + wallThickness / 2 - 3, height / 2, wallThickness, height);
  wallRight.immovable = true;
  walls.add(wallRight)
  wallRight.shapeColor = "#dddddd"
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
  if(keyDown(UP_ARROW)) {
    if(armLength < 120){
      armLength += 5
    }
  }
  if(keyDown(DOWN_ARROW)) {
    if(armLength > 60){
      armLength -= 5
    }
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
  // console.log(width+','+height)
  for (let i = 0; i < 8 + (diff * 5); i++) {
    // set random direction
    let px = random(wallThickness, width - wallThickness)
    let py = random(wallThickness, height - wallThickness)
    while(dist(coreX, coreY, px, py) < armLength * 2.5){
      px = random(wallThickness, width - wallThickness)
      py = random(wallThickness, height - wallThickness)
    }
    // console.log(px + ',' + py)
    //create sprite
    createProjectile(px, py)
  }
}

function createProjectile(px, py) {
  let a = createSprite(px, py, 10, 10);
  // var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
  // a.addImage(img);
  a.setSpeed(4.5, random(360))
  a.rotationSpeed = 0.5
  a.shapeColor = "#ff2222"
  a.setCollider('circle', 0, 0, 10)
  projectiles.add(a)
  return a;
}

function checkProjectiles(){
  for (var i = 0; i < projectiles.length; i++) {
    let proj = projectiles[i]
    if(proj.position.x < 0 || proj.position.x > width) {
      projectiles.splice(i,1)
    }
    // check this more
    if(proj.position.y < 0 || proj.position.y > height){
      projectiles.splice(i,1)
    }
  }
}

function levelOver() {
  if (projectiles.length === 0) {
    gameStage++
    diff++
    health = 100
  }
  if (domLoaded && gameStage !== 0) {
    healthDiv.innerText = `hp: ${health} `
  }
}

function hitShield(projectile, shield) {
  projectile.remove();
  score += diff
  blocked++
  console.log(`score: ${score}`)
  if (domLoaded && gameStage !== 0) {
    scoreDiv.innerText = `score: ${score}`
  }
  levelOver()
}

function hitCore(projectile, myCore) {
  // console.log('corehit')
  projectile.remove()
  health -= 10
  missed++
  console.log(`hp: ${health} `)
  if (health === 0) {
    // alert('game over?!?!?!')
    health === 100
    gameStage = 3
  }
  levelOver()
}

function getHp() {
  // health += 10
}

function windowResized() {
  let canvasDiv = document.getElementById('canvasDiv')
  width = windowWidth - (windowWidth/5)
  height = windowHeight - (windowHeight / 5)
  resizeCanvas(width, height);
  if(gameStage !== 1){
    walls[i].remove()
    walls.splice(0,4)
    createWalls()
  }
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
  if (gameStage !== 0) {
    scoreDiv.innerText = `score: ${score}`
    healthDiv.innerText = `hp: ${health} `
  }
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

//
// let button = createButton('submit');
// button.position(coreX + coreY, 65);
// button.mousePressed(changegameStage);
