let num = 10; // Number of points for the Superformula
let strokeColor = 255;
let k = 0, j = 100, i = 200;
let x, y, z;

//radial distance
let r;

// controls how finely the points around the shape are sampled
// smaller step = smoother curves, larger step = more angular or stepped shapes
let step = 0.1;

// This is the angle variable that determines the points around the circle (polar coordinates).
let th = 0;

// controls the "sharpness" or symmetry of the shape
let m = 1

// exponents that affect the shape’s complexity and curvature
let n1 = -1
let n2 = 0
let n3 = 0;

// overall scaling factors
let epi = 200; // controls overall size of the shape. 
let a = 1; // x direction
let b = 1;  // y direction

let counter1 = 0;
let currentMouseX, currentMouseY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  noFill();
  currentMouseX = mouseX;
  currentMouseY = mouseY;
}

function draw() {
  // Draw a semi-transparent background, but with more opacity (less fading)
  fill(0, 5); // Increased alpha for longer persistence (original was 5)
  noStroke();
  rect(0, 0, width, height); // Creates a semi-transparent background effect
  
  // draw the shape at the mouse position, which evolves over time
  translate(currentMouseX, currentMouseY);
  stroke(strokeColor, 35); // (color, alpha value)

  beginShape();
  for (let i = 1; i < num; i++) {
    r = epi * pow(((pow(abs(cos(m * th / 4) / a), n2)) + (pow(abs(sin(m * th / 4) / b), n3))), (-1 / n1)); // superformula formula
    th = th + step;
    x = r * cos(th);
    y = r * sin(th);
    curveVertex(x, y);
  }
  endShape();
}

function mousePressed() {
  // Randomize the parameters to generate a new shape
  m = int(random(3, 40)); // increasing = more complex star-like shapes. lowering = simpler, circular or polygonal shapes
  n1 = random(0.5); // lowering = sharper edges
  n2 = random(6); // n2 and n3 modifies the form, like making one side longer or curvier than the other
  n3 = random (6);
  epi = random(100, 200); // range of randomized uniform sizes
  step = random(0.05, 10); // different levels of smoothness of shapes
  
  // stores the new mouse position where the shape should start from
  currentMouseX = mouseX;
  currentMouseY = mouseY;
}
