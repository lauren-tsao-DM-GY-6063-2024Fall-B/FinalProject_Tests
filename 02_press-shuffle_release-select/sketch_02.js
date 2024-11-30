let num = 60;
let colorL = 255;
let x, y, z;
let r, th = 0, step = 0.1, epi = 200;
let m = 1, n1 = -1, n2 = 0, n3 = 0;
let b = 1, a = 1; 
let randomX, randomY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  noFill();
}

function draw() {
  fill(20, 5);
  rect(0, 0, width, height); // Fits within canvas

  // Only draw if randomX and randomY have been set
  if (randomX !== undefined && randomY !== undefined) {
    translate(randomX, randomY);  // Move origin to random position

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

  // If the mouse is pressed, update the parameters and start drawing the shape
  if (mouseIsPressed) {
    randomX = random(width);  // Random x position within canvas width
    randomY = random(height); // Random y position within canvas height
    
    // Reset random shape parameters
    m = int(random(3, 40));     // Random multiplier for the formula
    n1 = random(0.5);           // Random value for n1
    n2 = random(6);             // Random value for n2
    epi = random(100, 200);     // Random eccentricity
    step = random(0.05, 10);    // Random step for the angle increment
  }
}
