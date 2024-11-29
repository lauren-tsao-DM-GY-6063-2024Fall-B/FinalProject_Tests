//from https://openprocessing.org/sketch/48808/

let num = 60; // Number of points for the Superformula
let colorL = 255;
let k = 0, j = 100, i = 200;
let x, y, z;
let r, th = 0, step = 0.1, epi = 200;
let m = 1, n1 = -1, n2 = 0, n3 = 0;
let b = 1, a = 1; 
let counter1 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(50);
  noFill();
}

function draw() {
  // Remove the strange line by adjusting or removing the rectangle
  // Option 1: Adjust the rectangle size
  fill(0, 5);
  noStroke()
  rect(0, 0, width, height); // Fits within canvas
  
  // Option 2: Remove the rectangle entirely
  // Just comment out or remove the rectangle line
  
  counter1++;
  if (counter1 == 50) {
    m = int(random(3, 40));
    n1 = random(0.5);
    n2 = random(6);
    epi = random(100, 200);
    step = random(0.05, 10);
    counter1 = 0;
  }
  translate(mouseX, mouseY);
  stroke(colorL, 35);
  
  beginShape();
  for (let i = 1; i < num; i++) {
    r = epi * pow(((pow(abs(cos(m * th / 4) / a), n2)) + (pow(abs(sin(m * th / 4) / b), n3))), (-1 / n1));  
    th = th + step;
    x = r * cos(th);
    y = r * sin(th);
    curveVertex(x, y);
  }
  endShape();
}

function mousePressed() {
  background(0);
}
