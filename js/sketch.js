let score = 0
let gameStage = 0
let health = 100
let midX
let midY
let deg = Math.PI
let deg2 = Math.PI/2
let deg3 = -Math.PI/2
let deg4 = 2*Math.PI



function setup() {
  // put setup code here
  createCanvas(windowWidth -5, windowHeight-5);
  midX = windowWidth/2
  midY = windowHeight/2
}

function draw() {
  // put drawing code here
    background(255);
    fill(10)
    rect(100,100, windowWidth - 200, windowHeight - 200);
    fill(255,0,0)
    ellipseMode(CENTER)
    ellipse(midX, midY, 25, 25)
    //45
    fill(0,255,0)
    // 0 degrees
    // ellipse(midX + 50, midY, 20, 20)
    // 45 degrees
    // ellipse(midX + (50*sqrt(2)/2), midY-(50*sqrt(2)/2), 20, 20)
    // 90 degrees
    // ellipse(midX, midY - 50, 20, 20)
    // 135
    // ellipse(midX - (50*sqrt(2)/2), midY-(50*sqrt(2)/2), 20, 20)
    // 180
    // ellipse(midX - 50, midY, 20, 20)
    // 225
    // ellipse(midX - (50*sqrt(2)/2), midY+(50*sqrt(2)/2), 20, 20)
    // 270
    // ellipse(midX, midY + 50, 20, 20)
    // 315
    // ellipse(midX + (50*sqrt(2)/2), midY+(50*sqrt(2)/2), 20, 20)

    // if (deg === true) {
    //   ellipse(midX + (50*sqrt(2)/2), midY-(50*sqrt(2)/2), 20, 20)
    //   ellipse(midX - (50*sqrt(2)/2), midY-(50*sqrt(2)/2), 20, 20)
    //   ellipse(midX - (50*sqrt(2)/2), midY+(50*sqrt(2)/2), 20, 20)
    //   ellipse(midX + (50*sqrt(2)/2), midY+(50*sqrt(2)/2), 20, 20)
    // }
    // if (deg === false) {
    //   ellipse(midX + 50, midY, 20, 20)
    //   ellipse(midX, midY - 50, 20, 20)
    //   ellipse(midX - 50, midY, 20, 20)
    //   ellipse(midX, midY + 50, 20, 20)
    // }

    // ellipse(midX + (50*cos(deg)), midY + (50*sin(deg)), 20, 20)
    translate(width/2,height/2);
    ellipse(50 * cos(deg), 50 * sin(deg), 20, 20)
    ellipse(50 * cos(deg2), 50 * sin(deg2), 20, 20)
    ellipse(50 * cos(deg3), 50 * sin(deg3), 20, 20)
    ellipse(50 * cos(deg4), 50 * sin(deg4), 20, 20)

}
// function mousePressed() {
//   deg -= .5
// }
function keyPressed() {
    if(key === "a"){
      deg -= .25
      deg2 -= .25
      deg3 -= .25
      deg4 -= .25
    }if(key === "d"){
      deg += .25
      deg2 += .25
      deg3 += .25
      deg4 += .25
    }
}
function hit() {
  health -= 10;
  if (health === 0){
    gg()
  }
}

function hp() {
  health += 10
}

function gg() {
  gameStage = 3
}
