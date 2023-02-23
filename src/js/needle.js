// create window height variable
const windowWidth = document.body.clientWidth * .75;
const windowHeight = window.innerHeight * .65;
const numberOfLines = 7;
const canvas = document.getElementById('my-canvas');

//create Application Window
let app = new PIXI.Application({
  //view: canvas,
  backgroundColor: 0x323031,
  width: windowWidth,
  height: windowHeight
});

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
const needleLength = lineSpace * 0.9;
let yValue = lineSpace; //yValue is space between lines

lines[0] = 0;
//*/creates the grid lines of the webpage
for (let i = 1; i < 8; i++) {
  line.lineStyle(1, 0x0096FF, 1);
  line.moveTo(0, yValue);
  line.lineTo(windowWidth, yValue);
  line.closePath();
  app.stage.addChild(line);
  lines[i] = yValue;
  yValue = yValue + lineSpace;
}
//*/

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

  //drops needles j times
  for (let j = 0; j < dropNeedles; j++) {
    //randomzied x and y centers
    xCenter = Math.random() * windowWidth;
    yCenter = Math.random() * (lines[6] - lines[1] + 1) + lines[1];
    needleDrop++;

    //calculate the angle
    let angle = Math.floor(Math.random() * 180);
    console.log("Degrees: " + angle);
    angle = toRadians(angle);
    console.log("Radian: " + angle);

    //creating angle/line
    //sin must go to the y value and x to cos
    y = (needleLength / 2.0) * (Math.sin(angle));
    x = (needleLength / 2.0) * (Math.cos(angle));

    //some math we figured out in person this time using degree angles
    if (angle < (Math.PI / 2)) {
      console.log("fuck");
      topX = xCenter + x;
      topY = yCenter + y;
      botX = xCenter - x;
      botY = yCenter - y;
      console.log("Top: " + topX + ", " + topY + " bottom:" + botX + ", " + botY);
    }
    else{ //other part of math we did
      console.log("you");
      topX = xCenter - x;
      topY = yCenter + y;
      botX = xCenter + x;
      botY = yCenter - y;
      console.log("Top: " + topX + ", " + topY + " bottom:" + botX + ", " + botY);
    }

    //this for loop section chooses the color of the line to be dropped
    for (let k = 0; k < lines.length; k++) {
      //checks to see if the needle dropped not crosses the grid lines and changes color red
      if ((topY <= lines[k] && botY <= lines[k]) || (topY >= lines[k] && botY >= lines[k])) {
        lineInArray.lineStyle(1, 0xFF0000, 1);
      }
      //checks to see if the needle does dropped crosses the grid line and changes color green
      else {
        lineInArray.lineStyle(1, 0xAAFF00, 1);
        needleCross++;
        k = lines.length;//sets as lines length to stop for loop
      }
    }

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

  let pi = (2.0 * needleLength) / (lineSpace * ((needleCross) / needleDrop));
  document.getElementById("estimation").innerHTML = "PI Estimation: " + pi;
  document.getElementById("needLength").innerHTML = "Needle Length: " + needleLength;
  document.getElementById("gridSpace").innerHTML = "Space between lines: " + lineSpace;
  document.getElementById("needCross").innerHTML = "Needles that cross a line: " + needleCross;
  document.getElementById("total").innerHTML = "Total Needles Dropped: " + needleDrop;
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