let num = 30; // Number of points for the Superformula
let strokeColor = 255;
let x, y, z;

// Radial distance
let r = 10;

// Controls how finely the points around the shape are sampled
let step = 0.1;

// This is the angle variable that determines the points around the circle (polar coordinates).
let th = 0;

// Controls the "sharpness" or symmetry of the shape
// larger the value = more complex shapes with more symmetry points (e.g. stars)
let m = 1;

// Exponents that affect the shape’s complexity and curvature
let n1 = -1; //controls the sharpness of the overall shape (lower values give sharper edges).
let n2 = 0; // n2 and n3 affect the curvature of the shape, giving it a more lopsided or curvy look depending on their values.
let n3 = 0;

// Overall scaling factors
let epi = 200; // Controls overall size of the shape. 
let a = 1; // x direction
let b = 1;  // y direction

let currentMouseX, currentMouseY;

// Opacity values for fading
let fadeAlpha = 5; // Initial opacity of the background
let fadeSpeed = 0.05; // Speed of the fading effect

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  noFill();
  currentMouseX = mouseX;
  currentMouseY = mouseY;
}

function draw() {
  // Only draw the shape if the mouse is pressed
  if (mouseIsPressed) {
    // Draw a semi-transparent background, but with more opacity (less fading)
    fill(0, fadeAlpha); // Set the background's opacity to fade
    noStroke();
    rect(0, 0, width, height); // Creates a semi-transparent background effect
    
    // Draw the shape at the mouse position, which evolves over time
    translate(currentMouseX, currentMouseY);
    stroke(strokeColor, 35); // (color, alpha value)

    beginShape();
    for (let i = 1; i < num; i++) {
      r = epi * pow(((pow(abs(cos(m * th / 4) / a), n2)) + (pow(abs(sin(m * th / 4) / b), n3))), (-1 / n1)); // Superformula formula
      th = th + step;
      x = r * cos(th);
      y = r * sin(th);
      curveVertex(x, y);
    }
    endShape();
  } else {
    // If the mouse is not pressed, make the background fade out gradually
    if (fadeAlpha > 0) {
      fadeAlpha -= fadeSpeed; // Decrease opacity gradually
      fadeAlpha = max(fadeAlpha, 0); // Prevent negative opacity
    }
    // Keep fading the background even after the mouse is released
    fill(0, fadeAlpha);
    noStroke();
    rect(0, 0, width, height);
  }
}

function mousePressed() {
  // Randomize the parameters to generate a new shape
  m = int(random(30, 40)); // Increasing = more complex star-like shapes. Lowering = simpler, circular or polygonal shapes
  n1 = random(20); // Lowering = sharper edges
  n2 = random(6); // adjust n2 and n3 to adjust form, (e.g. one side longer or curvier than the other)
  n3 = random(6);
  epi = random(100, 200); // Range of randomized uniform sizes
  step = random(8, 10); // Different levels of smoothness of shapes
  
  // Store the new mouse position where the shape should start from
  currentMouseX = mouseX;
  currentMouseY = mouseY;
}

function mouseReleased() {
  // Optionally, reset the fade to make it start from full opacity when the mouse is pressed again
  fadeAlpha = 5; // Reset the alpha when mouse is released
}
