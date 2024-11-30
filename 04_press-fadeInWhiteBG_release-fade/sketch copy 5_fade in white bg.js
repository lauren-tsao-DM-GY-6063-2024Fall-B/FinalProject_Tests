 // number of points for the Superformula
 // smaller value =  more angular or polygonal shape with fewer points, larger value = smoother and more continuous the shape will look
 // kinda like 3D polygons (more polygons, finer details)
let numPoints = 5;

let strokeColor = 255;
let x, y, z;

// radius = determines the local distance of each point on the shape from the center
// uScale affects the r (increasing uScale will lead to a larger shape)
let r = 10;

// spacing between the points around the shape (i.e angular distance between each point)
// smaller value = points are closer together, larger value = points are further apart
let angleStep = 0.1;

// determines the points around the circle (polar coordinates).
// (i.e. angle used to generate the points around the shape)
let currentAngle = 0;

// controls the pointiness, symmetry and overall structure of the shape (i.e how many lobes the shape will have)
// useful for creating stars and flowers
// smaller value = more gentle, higher value = more spiky
let spikeFactor = 1;

// exponents (powers) that affect the shape’s complexity and curvature
let sharpControl = -1; // controls the sharpness of the overall shape (lower values = sharper edges, higher values = rounder edges)
let xControl = 0; // xControl and yControl controls x/y values that distort the the curvature of the shape, giving it a more lopsided or curvy look depending on their values
let yControl = 0;

// overall scaling factors
let uScale = 200; // controls the uniform scaling of the shape 
let xScale = 1; // x direction
let yScale = 1;  // y direction

let currentMouseX, currentMouseY;

// opacity values for fading
let fadeAlpha = 5; // initial opacity of the background (make sure this value is the same as the mousePressed restart)
let fadeSpeed = 0.05; // speed of the fading effect

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
  currentMouseX = mouseX;
  currentMouseY = mouseY;
}

function draw() {
  // Only draw the shape if the mouse is pressed
  if (mouseIsPressed) {
    // Draw a semi-transparent background, but with more opacity (less fading)
    fill(200, fadeAlpha); // Set the background's opacity to fade
    noStroke();
    rect(0, 0, width, height); // Creates a semi-transparent background effect
    
    // Draw the shape at the mouse position, which evolves over time
    translate(currentMouseX, currentMouseY);
    stroke(0, random(0, 200), random(255), 35); // (color, alpha value)
    strokeWeight(2)

    beginShape();
    // LEGEND:
    // abs = the absolute value. Ensures that the result inside the parentheses is always positive, preventing negative distances that would distort the shape
    // cos(m * th / 4) and sin(m * th / 4) = create the shape in polar coordinates, with the factor of m affecting the symmetry
    // pow() = a function that raises a number to a specific power (helps define the sharpness, symmetry, and distortion of the shape in this case)
    // (e.g. pow(abs(cos(spikeFactor * angleStep / 4) / xScale), xControl) = pow() is used to raise the value of the cosine function (scaled by spikeFactor and xScale) to the power of xControl)
    for (let i = 1; i < numPoints; i++) {
      r = uScale * pow(((pow(abs(cos(spikeFactor * currentAngle / 4) / xScale), xControl)) + (pow(abs(sin(spikeFactor * currentAngle / 4) / yScale), yControl))), (-1 / sharpControl)); // Superformula formula
      currentAngle = currentAngle + angleStep;
      x = r * cos(currentAngle);
      y = r * sin(currentAngle);
      curveVertex(x, y);
    }
    endShape();
  } else {
    // if the mouse is not pressed, make the background fade out gradually
    if (fadeAlpha > 0) {
      fadeAlpha -= fadeSpeed; // decrease opacity gradually
      fadeAlpha = max(fadeAlpha, 0); // prevent negative opacity
    }
    // keep fading the background even after the mouse is released
    fill(0, fadeAlpha);
    noStroke();
    rect(0, 0, width, height);
  }
}

function mousePressed() {
  // randomizing parameters to generate a new shape everytime the ouse is pressed
  spikeFactor = int(random(30, 40)); // increasing = more complex star-like shapes. Lowering = simpler, circular or polygonal shapes
  sharpControl = random(20); // Lowering = sharper edges
  xControl = random(6); // adjust n2 and n3 to adjust form, (e.g. one side longer or curvier than the other)
  yControl = random(6);
  uScale = random(100, 200); // range of randomized uniform sizes
  angleStep = random(8, 10); // different levels of smoothness of shapes
  
  // store the new mouse position where the shape should start from
  currentMouseX = mouseX;
  currentMouseY = mouseY;
}

function mouseReleased() {
   // reset to initial fadeAlpha value mentioned earlier when mouse is released, so that when it is pressed again it is at this value
  fadeAlpha = 5;
}
