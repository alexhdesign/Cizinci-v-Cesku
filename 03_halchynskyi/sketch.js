let circles = [];
let leftColumnWidth = 200;
let margin = 50;
let spacingFromEdges = 50;
let isMousePressed = false;
let regionColors = [];
let boxOpacities = [];
let regions = [
  "Hlavní město Praha",
  "Středočeský kraj",
  "Jihočeský kraj",
  "Plzeňský kraj",
  "Karlovarský kraj",
  "Ústecký kraj",
  "Liberecký kraj",
  "Královéhradecký kraj",
  "Pardubický kraj",
  "Kraj Vysočina",
  "Jihomoravský kraj",
  "Zlínský kraj",
  "Olomoucký kraj",
  "Moravskoslezský kraj",
];

let numbers2023 = [
  "342 175",
  "148 910",
  "44 609",
  "78 199",
  "36 176",
  "55 539",
  "40 227",
  "35 787",
  "39 357",
  "30 031",
  "106 338",
  "26 983",
  "25 233",
  "52 105",
];

let numbers2014 = [
  "166 332",
  "59 860",
  "15 366",
  "25 958",
  "18 873",
  "31 878",
  "17 048",
  "13 266",
  "11 559",
  "7 806",
  "38 588",
  "10 110",
  "8 106",
  "23 924",
];

let numbers2004 = [
  "77 922",
  "31 127",
  "9 954",
  "12 530",
  "14 729",
  "19 731",
  "10 672",
  "9 852",
  "5 863",
  "5 883",
  "23 913",
  "7 103",
  "6 374",
  "18 329",
];

let currentNumbers = numbers2023;
let hoveredRegionIndex = -1;
let button1;
let button2;
let button3;
let buttonParticles1 = [];
let buttonParticles2 = [];
let buttonParticles3 = [];

let customDensities2023 = {
  0: 0.25,
  1: 0.1,
  2: 0.07,
  3: 0.13,
  4: 0.12,
  5: 0.07,
  6: 0.09,
  7: 0.06,
  8: 0.07,
  9: 0.06,
  10: 0.09,
  11: 0.04,
  12: 0.04,
  13: 0.04,
};

let customDensities2014 = {
  0: 0.13,
  1: 0.05,
  2: 0.02,
  3: 0.05,
  4: 0.06,
  5: 0.04,
  6: 0.04,
  7: 0.02,
  8: 0.02,
  9: 0.02,
  10: 0.03,
  11: 0.02,
  12: 0.01,
  13: 0.02,
};

let customDensities2004 = {
  0: 0.07,
  1: 0.03,
  2: 0.02,
  3: 0.02,
  4: 0.05,
  5: 0.02,
  6: 0.02,
  7: 0.02,
  8: 0.01,
  9: 0.01,
  10: 0.02,
  11: 0.01,
  12: 0.01,
  13: 0.01,
};

let currentDensities = customDensities2023;

// function preload() {
//  font = loadFont('Monotype  - Helvetica Now Display Medium.otf');
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);
  regionColors = regions.map(() => color(90));
  // Инициализируем массив прозрачности для каждого бокса
  boxOpacities = circles.map(() => 0);
  updateLayout();
}

function updateLayout() {
  circles = [];
  let availableWidth = width - leftColumnWidth - margin * 2 - spacingFromEdges;
  let availableHeight = height - margin * 1;
  let circleRadius = min(availableWidth / 6, availableHeight / 4) / 2;
  let gapX = availableWidth / 5;
  let gapY = availableHeight / 3;
  let startX = leftColumnWidth + margin + spacingFromEdges + circleRadius;
  let startY = margin + circleRadius;
  let index = 0;

  boxOpacities = circles.map(() => 0);

  // Get the position of the last circle in the third row (where the buttons will be)
  let lastCircleX = startX + 4 * gapX; // X position of the nearest circle
  let lastCircleY = startY + 2 * gapY; // Y position of the nearest circle

  // Position buttons relative to the last circle
  let buttonWidth = 60;
  let buttonHeight = 30;
  let buttonSpacing = 12;
  let buttonsGroupWidth = buttonWidth;
  let buttonsGroupHeight = buttonHeight * 3 + buttonSpacing * 2;

  // Center the button group relative to the last circle
  let buttonStartX = lastCircleX - buttonWidth / 2;
  let buttonStartY = lastCircleY - buttonsGroupHeight / 2;

  if (!button1) {
    button1 = { text: "2004", cornerRadius: 100, isHovered: false, isActive: false, color: color(90) };
}
if (!button2) {
    button2 = { text: "2014", cornerRadius: 100, isHovered: false, isActive: false, color: color(90) };
}
if (!button3) {
    button3 = { text: "2023", cornerRadius: 100, isHovered: false, isActive: true, color: color(255) };
}

// Только обновляем координаты и размеры кнопок, не пересоздавая их
button1.x = buttonStartX;
button1.y = buttonStartY;
button1.width = buttonWidth;
button1.height = buttonHeight;

button2.x = buttonStartX;
button2.y = buttonStartY + buttonHeight + buttonSpacing;
button2.width = buttonWidth;
button2.height = buttonHeight;

button3.x = buttonStartX;
button3.y = buttonStartY + (buttonHeight + buttonSpacing) * 2;
button3.width = buttonWidth;
button3.height = buttonHeight;

//  buttonParticles1 = [];
//  buttonParticles2 = [];
//  buttonParticles3 = [];
//  createButtonParticles(button1, buttonParticles1);
//  createButtonParticles(button2, buttonParticles2);
//  createButtonParticles(button3, buttonParticles3);

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 4) continue; // Skip the last position where buttons will be
      let x = startX + col * gapX;
      let y = startY + row * gapY;
      let density = currentDensities[index] || 0.15;
      circles.push(
        new Circle(
          x,
          y,
          circleRadius,
          density,
          color(90),
          index + 1,
          currentNumbers[index]
        )
      );
      index++;
    }
  }
}

function draw() {
  background(0);

  // Draw left column - removed white fill
  noFill();
  noStroke();
  rect(margin, margin, leftColumnWidth, height - margin * 2);

  // Draw title text
  fill(255);
  textSize(12);
  textAlign(LEFT, TOP);
  text("migrace do\nČeské Republiky", margin, margin);

  //fill(90);
  // textSize(12);
  // textAlign(LEFT, TOP);
  // text("2014—2023", margin, margin + 100);

  // fill(255);
  // textSize(12);
  // textAlign(LEFT, TOP);
  // text("Válka na Ukrajině vedla k masivnímu\npřílivu uprchlíků, kdy do Česka přišly\nstatisíce Ukrajinců, čímž se počet\ncizinců zvýšil na více než 1 milion.", margin, margin + 120);

  // Calculate the total height needed for region names
  let totalRegionsHeight = regions.length * 20; // 20 pixels per line
  let startY = height - margin - totalRegionsHeight; // Position from bottom

  // Draw region names with white text
  textAlign(LEFT, CENTER);
  textSize(12);
  for (let i = 0; i < regions.length; i++) {
      let targetColor = i === hoveredRegionIndex ? color(255) : color(90);
      // Плавно переходим к целевому цвету
      regionColors[i] = lerpColor(regionColors[i], targetColor, 0.15);
      fill(regionColors[i]);
      text(regions[i], margin, startY + i * 20);
  }

  hoveredRegionIndex = -1; 

  // Draw circles and their particles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.display();
    
    for (let particle of circle.particles) {
      particle.applyBehaviors(mouseX, mouseY);
      particle.update();
      particle.display();
      
      if (dist(mouseX, mouseY, circle.x, circle.y) < circle.radius) {
        particle.targetColor = color(255);
        hoveredRegionIndex = i;
        drawHoverBox(mouseX, mouseY, circle.hoverNumber, i);
      } else {
        particle.targetColor = color(90);
        // Плавно уменьшаем прозрачность когда курсор не на круге
        boxOpacities[i] = lerp(boxOpacities[i], 0, 0.15);
      }
    }
  }

  // Draw buttons with rounded corners
  noFill();
  noStroke();
  drawRoundedButton(button1);
  drawRoundedButton(button2);
  drawRoundedButton(button3);

  // Update and display button particles
  //updateButtonParticles(buttonParticles1);
  // updateButtonParticles(buttonParticles2);
  // updateButtonParticles(buttonParticles3);

  // Draw button text
  // Draw button text (update this part in the draw function)
  textSize(12);
  textAlign(CENTER, CENTER);

  // Button 1 text
  fill(button1.isActive ? 0 : 255);  // Black if active, white if not
  text(button1.text, button1.x + button1.width / 2, button1.y + button1.height / 2);

  // Button 2 text
  fill(button2.isActive ? 0 : 255);
  text(button2.text, button2.x + button2.width / 2, button2.y + button2.height / 2);

  // Button 3 text
  fill(button3.isActive ? 0 : 255);
  text(button3.text, button3.x + button3.width / 2, button3.y + button3.height / 2);

  // text(
  //   button1.text,
  //   button1.x + button1.width / 2,
  //   button1.y + button1.height / 2
  // );
  // text(
  //   button2.text,
  //   button2.x + button2.width / 2,
  //   button2.y + button2.height / 2
  // );
  // text(
  //   button3.text,
  //   button3.x + button3.width / 2,
  //   button3.y + button3.height / 2
  // );

  if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    noStroke();
    let cursorColor = isMousePressed
      ? color(0, 0, 255, 20)
      : color(120, 20, 20, 20);
    fill(cursorColor);

    // this ellipse is our cursor
    ellipse(mouseX, mouseY, 50 * 2);
  }
}

// function updateButtonParticles(particles) {
//   for (let particle of particles) {
//     particle.applyBehaviors(mouseX, mouseY);
//     particle.update();
//     particle.display();
//   }
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateLayout();
}

function mousePressed() {
  isMousePressed = true;

  console.log(button1, button2, button3);
  // Check if any button is clicked and update states
  if (mouseX > button1.x && mouseX < button1.x + button1.width &&
      mouseY > button1.y && mouseY < button1.y + button1.height) {
      button1.isActive = true;
      button2.isActive = false;
      button3.isActive = false;
      currentDensities = customDensities2004;
      currentNumbers = numbers2004;
      updateLayout();
  }
  else if (mouseX > button2.x && mouseX < button2.x + button2.width &&
           mouseY > button2.y && mouseY < button2.y + button2.height) {
      button1.isActive = false;
      button2.isActive = true;
      button3.isActive = false;
      currentDensities = customDensities2014;
      currentNumbers = numbers2014;
      updateLayout();
  }
  else if (mouseX > button3.x && mouseX < button3.x + button3.width &&
           mouseY > button3.y && mouseY < button3.y + button3.height) {
      button1.isActive = false;
      button2.isActive = false;
      button3.isActive = true;
      currentDensities = customDensities2023;
      currentNumbers = numbers2023;
      updateLayout();
  }
}

function mouseReleased() {
  isMousePressed = false;
}

function drawRoundedButton(button) {
  button.isHovered = mouseX > button.x && 
                     mouseX < button.x + button.width && 
                     mouseY > button.y && 
                     mouseY < button.y + button.height;

  let targetColor;
  
  if (button.isActive) {
      targetColor = color(255);  // Белый цвет, если активна
  } else if (button.isHovered) {
      targetColor = color(90);  // Серый при наведении
  } else {
      targetColor = color(30);   // Темно-серый, если не активна
  }

  // Плавно меняем цвет (интерполяция)
  button.color = lerpColor(button.color, targetColor, 0.1); 

  fill(button.color);
  noStroke();
  rect(button.x, button.y, button.width, button.height, button.cornerRadius);
}

// function createButtonParticles(button, particlesArray) {
//   let particleDensity = 0.15;
//   let buttonArea = button.width * button.height;
//   let particleArea = PI * (2.5 / 2) * (2.5 / 2);
//   let numParticles = floor((buttonArea * particleDensity) / particleArea);

//   for (let i = 0; i < numParticles; i++) {
//     let px = random(button.x, button.x + button.width);
//     let py = random(button.y, button.y + button.height);
//     particlesArray.push(
//       new ButtonParticle(
//         px,
//         py,
//         button.x,
//         button.y,
//         button.width,
//         button.height,
//         color(255),
//         button.cornerRadius
//       )
//     );
//   }
// }

function drawHoverBox(mouseX, mouseY, number, index) {
  fill(30, 0, 30);
  rect(mouseX + 5, mouseY - 30, 60, 30, 100);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(number, mouseX + 35, mouseY - 15);

  let targetOpacity = 255;

  boxOpacities[index] = lerp(boxOpacities[index], targetOpacity, 0.15);

  if (boxOpacities[index] > 5) {
    // Фон бокса
    fill(30, 0, 30, boxOpacities[index]);
    rect(mouseX + 5, mouseY - 30, 60, 30, 100);
    
    // Текст
    fill(255, boxOpacities[index]);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(number, mouseX + 35, mouseY - 15);
  }  
}

class ButtonParticle {
  constructor(x, y, bx, by, bwidth, bheight, color, cornerRadius) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.color = color;
    this.buttonX = bx;
    this.buttonY = by;
    this.buttonWidth = bwidth;
    this.buttonHeight = bheight;
    this.cornerRadius = cornerRadius;
    this.maxSpeed = 2;
    this.minSpeed = 0.2;
  }

  applyBehaviors(cursorX, cursorY) {
    let force;
    if (isMousePressed) {
      force = this.attractToCursor(cursorX, cursorY);
    } else {
      force = this.avoidCursor(cursorX, cursorY);
    }
    let stayForce = this.stayInsideButton();
    this.applyForce(force);
    this.applyForce(stayForce);
  }

  attractToCursor(cursorX, cursorY) {
    let cursor = createVector(cursorX, cursorY);
    let toCursor = p5.Vector.sub(cursor, this.pos);
    let d = toCursor.mag();

    if (d < 50) {
      toCursor.setMag(map(d, 0, 50, this.maxSpeed, 0.2));
      return toCursor;
    }
    return createVector(0, 0);
  }

  avoidCursor(cursorX, cursorY) {
    let cursor = createVector(cursorX, cursorY);
    let d = dist(this.pos.x, this.pos.y, cursor.x, cursor.y);

    if (d < 50) {
      let flee = p5.Vector.sub(this.pos, cursor);
      flee.setMag(map(d, 0, 50, this.maxSpeed, 0));
      return flee;
    }
    return createVector(0, 0);
  }

  stayInsideButton() {
    let force = createVector(0, 0);

    if (this.pos.x < this.buttonX + this.cornerRadius) force.x = 1;
    if (this.pos.x > this.buttonX + this.buttonWidth - this.cornerRadius)
      force.x = -1;
    if (this.pos.y < this.buttonY + this.cornerRadius) force.y = 1;
    if (this.pos.y > this.buttonY + this.buttonHeight - this.cornerRadius)
      force.y = -1;

    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill(this.color);

    // these elipses are for the buttons
    ellipse(this.pos.x, this.pos.y, 2.5);
  }
}

class Circle {
  constructor(x, y, radius, particleDensity, particleColor, label, hoverNumber) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.particleDensity = particleDensity;
    this.particleColor = particleColor;
    this.label = label;
    this.hoverNumber = hoverNumber;
    this.particles = [];
    this.initializeParticles();
    this.currentColor = color(0);  // Start with black
    this.targetColor = color(90);  // Target grey color
    this.particles = [];
    this.initializeParticles();
  }

  initializeParticles() {
    this.particles = [];
    let circleArea = PI * this.radius * this.radius;
    let particleArea = PI * (2.5 / 2) * (2.5 / 2);
    let numParticles = floor((circleArea * this.particleDensity) / particleArea);
  
    this.maxSpeed = 2;
    this.minSpeed = 0.2;
  
    for (let i = 0; i < numParticles; i++) {
      let angle = random(TWO_PI);
      let r = random(this.radius * 0.5, this.radius);
      let px = this.x + r * cos(angle);
      let py = this.y + r * sin(angle);
      this.particles.push(
        new Particle(
          px,
          py,
          this.x,
          this.y,
          color(90),
          this.minSpeed,
          this.maxSpeed,
          this.radius
        )
      );
    }
  }

  display() {
    // Плавное изменение цвета круга
    this.currentColor = lerpColor(this.currentColor, this.targetColor, 0.1);
    noFill();
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  updateParticles(cursorX, cursorY) {
    for (let particle of this.particles) {
      particle.applyBehaviors(cursorX, cursorY);
      particle.update();
      particle.display();
    }
  }
}

// Particle class (dancing dots)
class Particle {
  constructor(x, y, cx, cy, particleColor, minSpeed, maxSpeed, radius) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(minSpeed, maxSpeed));
    this.acc = createVector(0, 0);
    this.color = particleColor;
    this.targetColor = particleColor;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.circleCenter = createVector(cx, cy);
    this.radius = radius;
    this.color = color(0);  // Start with black
    this.targetColor = particleColor;  // Target color (grey by default)
  }

  applyBehaviors(cursorX, cursorY) {
    let force;
    if (isMousePressed) {
      force = this.attractToCursor(cursorX, cursorY);
    } else {
      force = this.avoidCursor(cursorX, cursorY);
    }
    let stayForce = this.stayInsideCircle();
    this.applyForce(force);
    this.applyForce(stayForce);
  }

  attractToCursor(cursorX, cursorY) {
    let cursor = createVector(cursorX, cursorY);
    let toCursor = p5.Vector.sub(cursor, this.pos);
    let d = toCursor.mag();

    if (d < 50) {
      toCursor.setMag(map(d, 0, 50, this.maxSpeed, 0.2));
      return toCursor;
    }
    return createVector(0, 0);
  }

  avoidCursor(cursorX, cursorY) {
    let cursor = createVector(cursorX, cursorY);
    let d = dist(this.pos.x, this.pos.y, cursor.x, cursor.y);

    if (d < 50) {
      let flee = p5.Vector.sub(this.pos, cursor);
      flee.setMag(map(d, 0, 50, this.maxSpeed, 0));
      return flee;
    }
    return createVector(0, 0);
  }

  stayInsideCircle() {
    let d = dist(
      this.pos.x,
      this.pos.y,
      this.circleCenter.x,
      this.circleCenter.y
    );
    if (d > this.radius) {
      let toCenter = p5.Vector.sub(this.circleCenter, this.pos);
      toCenter.setMag(1);
      return toCenter;
    }
    return createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Smooth color transition
    this.color = lerpColor(this.color, this.targetColor, 0.1);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 2.5);
  }
}
