let bottomStars = [];
let lastMin = -1;
let lastSec = -1;

function setup() {
  createCanvas(800, 800);
  noStroke();
}

class Star {
  constructor(x, size) {
    this.size = size;
    this.x = x;
    this.y = height - size - 10; // make sure whole star is visible
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 215, 100);
    noStroke();
    beginShape();
    for (let i = 0; i < 10; i++) {
      let angle = i * TWO_PI / 10 - HALF_PI;
      let r = (i % 2 === 0 ? this.size : this.size / 2);
      vertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
    pop();
  }
}

function draw() {

  let hr = hour();
  let blueVal = map(hr, 0, 23, 20, 70); // 50 = dark, 255 = bright
  background(0, 0, blueVal);

  let min = minute();
  let sec = second();

  if (min !== lastMin) {
    lastMin = min;
    bottomStars = [];

    for (let i = 0; i < min; i++) {
      let x = random(20, width - 20);
      bottomStars.push(new Star(x, 15));
    }
  }

  if (sec !== lastSec) {
    lastSec = sec;
    if (sec === 0) {
      let x = width / 2 + random(-50, 50);
      bottomStars.push(new Star(x, 15));
    }
  }

  for (let s of bottomStars) s.display();

  //original clock
  let radius = width / 2;
  let secondsRadius = radius * 0.71;
  let darkness = map(sec, 0, 59, 255, 50);

  textProvided(hr, min, sec);

  //sec-clock
  push();
  translate(width / 2, height / 2);
  rotate(-sec);
  fill(darkness);
  sec_star(0, 0, 5, 100, 12);
  pop();

  drawTicks(secondsRadius);
}



function textProvided(hr, min, sec) {
  textSize(32);
  fill(180); text(hr, 10, 30);
  fill(100); text(min, 10, 60);
  fill(0); text(sec, 10, 90);
}

function drawTicks(secondsRadius) {
  push();
  translate(width / 2, height / 2);
  stroke(255, 215, 100);
  strokeWeight(2);
  for (let i = 0; i < 60; i++) {
    let angle = i * 6;
    let rad = radians(angle);
    line(cos(rad) * secondsRadius, sin(rad) * secondsRadius,
      cos(rad) * (secondsRadius - 15), sin(rad) * (secondsRadius - 15));
  }
  let s = second();
  let secAngle = radians(s * 6);
  strokeWeight(8);
  line(cos(secAngle) * secondsRadius, sin(secAngle) * secondsRadius,
    cos(secAngle) * (secondsRadius - 15), sin(secAngle) * (secondsRadius - 15));
  pop();
}

function sec_star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

