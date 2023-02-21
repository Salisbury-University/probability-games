// create window height variable
const windowWidth = document.body.clientWidth * .8;
const windowHeight = window.innerHeight * .65;
const numberOfLines = 7;


//create Application Window
let app = new PIXI.Application({
  backgroundColor: 0x323031,
  width: windowWidth,
  height: windowHeight
});

//getting these to center the page
const stageWidth = app.renderer.width;
const stageHeight = app.renderer.height;

///*
app.stage.position.set(
  (windowWidth - stageWidth) / 2 + app.renderer.view.offsetLeft,
  (windowHeight - stageHeight) / 2 + app.renderer.view.offsetTop
);
//*/

// append the application window to the page
document.body.appendChild(app.view);

const line = new PIXI.Graphics();
const lines = [];
let needles = [];
let nextEmpty = 0;
let needleCross = 0;
let needleDrop = 0;

let lineInArray = new PIXI.Graphics(); //created a new line variable to test out working code
let lineArray = [];//an array of the lineInArray pixi graphics object

let lineSpace = windowHeight / 7.0;
//let needleExtent = 0.9;
const needleLength = lineSpace * 0.9;
//console.log(lineSpace);
let yValue = lineSpace; //yValue is space between lines

lines[0] = 0;
//creates the grid lines of the webpage
for (let i = 1; i < 8; i++) {
  line.beginFill(0x0096FF);
  line.drawRect(0, yValue, windowWidth, 1);
  line.endFill();
  app.stage.addChild(line);
  lines[i] = yValue;
  yValue = yValue + lineSpace;
}

//converts angle in degrees to radians
function toRadians(angle) {
  return angle * (Math.PI / 180.0);
}

function needleXY() {
  //gets user input for needles
  let dropNeedles = document.getElementById("amountOfNeedles").value;
  let xCenter, yCenter;
  let topX, topY, botX, botY;
  let x, y;
  //let myneedle;

  //drops needles j times
  for (let j = 0; j < dropNeedles; j++) {
    //randomzied x and y centers
    xCenter = Math.random() * windowWidth;
    //(max) + min
    yCenter = Math.random() * (lines[6] - lines[1] + 1) + lines[1];//-lines[1]/2; 
    needleDrop++;

    //calculate the angle
    let angle = Math.random() * 180;
    angle = toRadians(angle);


    //creating angle/line
    //sin must go to the y value and x to cos
    y = (needleLength / 2.0) * (Math.sin(angle));
    x = (needleLength / 2.0) * (Math.cos(angle));

    //some math we figured out in person this time using degree angles
    if (angle < (Math.PI / 2)) {
      topX = xCenter + x;
      topY = yCenter + y;
      botX = xCenter - x;
      botY = yCenter - y;
    }
    else { //other part of math we did
      topX = xCenter - x;
      topY = yCenter + y;
      botX = xCenter + x;
      botY = yCenter - y;
    }

    //this for loop section chooses the color of the line to be dropped
    for (let k = 0; k < lines.length; k++) {
      //checks to see if the needle dropped not crosses the grid lines and changes color red
      if ((topY <= lines[k] && botY <= lines[k]) || (topY >= lines[k] && botY >= lines[k])) {
        lineInArray.lineStyle(4, 0xFF0000, 1);
      }
      //checks to see if the needle does dropped crosses the grid line and changes color green
      else {
        lineInArray.lineStyle(4, 0xAAFF00, 1);
        needleCross++;
        k = lines.length;//sets as lines length to stop for loop
      }
    }
    //botY <= gridY <= topY

    //copied previous line code, just rewrote the variable name
    lineInArray.moveTo(xCenter, yCenter);
    lineInArray.lineTo(topX, topY);

    //we can just move line to bottom locations
    lineInArray.lineTo(botX, botY);
    lineInArray.closePath();

    app.stage.addChild(lineInArray);
    //pushing the new line into the array
    lineArray.push(lineInArray);
  }

  let i = (2.0 * needleLength) / (lineSpace * ((needleCross) / needleDrop));
  document.getElementById("estimation").innerHTML = "PI Estimation: " + i;
}

//clears needles from page and removes them from the array
function clearNeedles() {
  console.log("Next Empty size: " + nextEmpty);

  //this code removes them from the stage
  lineArray.forEach(lineInArray => {
    app.stage.removeChild(lineInArray); //these remove the lines from Field of view but they are still present in memory
  });

  lineInArray.destroy();//gets rid of all lines on game
  lineInArray = new PIXI.Graphics();//need to redelcare the variable to get game working again

  //splice will remove all objects of the array
  lineArray.splice(0, lineArray.length);
  console.log("After Splice");
  needleCross = 0;
  needleDrop = 0;
}