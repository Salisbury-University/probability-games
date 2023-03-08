// create window height variable
const windowWidth = document.body.clientWidth * .75;
const windowHeight = window.innerHeight * .65;
const numberOfLines = 7;
const canvas = document.getElementById('my-canvas');
const halfPi = Math.PI / 2

//create Application Window
let app = new PIXI.Application({
  //view: canvas,
  backgroundColor: 0x323031,
  width: windowWidth,
  height: windowHeight
});

// append the application window to the page
document.body.appendChild(app.view);

var numN = document.getElementById("amountOfNeedles");
numN.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    needleXY();
  }
});


const line = new PIXI.Graphics();
const lines = [];
let needles = [];
let nextEmpty = 0;
let needleCross = 0;
let pos = 0;
let neg = 0;
let needleDrop = 0;
let dropTypeValue = "Singular";
var needleDropSound = new Audio('../sounds/needleDrop.mp3');


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

function dropType(type) {
  var radioButtons = document.getElementsByName('dropType');
  var selectedValue;
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      var selectedValue = radioButtons[i].value;
      break;
    }
  }
  dropTypeValue = selectedValue;
  clearNeedles();
  console.log(dropTypeValue);
}

function customLength() {
  let percent = document.getElementById("percentageOfNeedle").value;
  percent /= 100;
  console.log(percent);
  needleLength = lineSpace * percent;
  clearNeedles();
}

function changeNeedleLength(size) {
  needleLength = lineSpace * (size);
  clearNeedles();
}


function showDropType() {
  document.getElementById("dropTypeData").removeAttribute("hidden");
  document.getElementById("gridData").setAttribute("hidden", "hidden");
  console.log("Show drop type info");
}

function showGridInfo() {
  document.getElementById("gridData").removeAttribute("hidden");
  document.getElementById("dropTypeData").setAttribute("hidden", "hidden");
  console.log("Show grid info");
}

function playAudio() {
  needleDropSound.pause();
  needleDropSound.currentTime = 1.6;
  needleDropSound.play();
}


function showDropType() {
  document.getElementById("dropTypeData").removeAttribute("hidden");
  document.getElementById("gridData").setAttribute("hidden", "hidden");
  console.log("Show drop type info");
}

function showGridInfo() {
  document.getElementById("gridData").removeAttribute("hidden");
  document.getElementById("dropTypeData").setAttribute("hidden", "hidden");
  console.log("Show grid info");
}

function playAudio() {
  needleDropSound.pause();
  needleDropSound.currentTime = 1.6;
  needleDropSound.play();
}

function needleXY() {

  if (dropTypeValue == "Singular") {
    clearNeedles();
  }
  //gets user input for needles
  let dropNeedles = document.getElementById("amountOfNeedles").value;
  let xCenter, yCenter;
  let topX, topY, botX, botY;
  let x, y;
  playAudio();


  //drops needles j times
  for (let j = 0; j < dropNeedles; j++) {
    //randomzied x and y centers
    xCenter = Math.random() * windowWidth;
    yCenter = Math.random() * (lines[6] - lines[1] + 1) + lines[1];
    needleDrop++;

    //calculate the angle
    let angle = Math.floor(Math.random() * 360);
    angle = toRadians(angle);
    console.log("Radian: " + angle);

    //creating angle/line
    //sin must go to the y value and x to cos
    y = Math.abs((needleLength / 2.0) * (Math.sin(angle)));
    x = Math.abs((needleLength / 2.0) * (Math.cos(angle)));
    //some math we figured out in person this time using degree angles
    //is this math correct? we still get interestng angles
    //ask Matt for the code he did on 3/1
    /*topX = xCenter + x;
    topY = yCenter + y;
    botX = xCenter + x;
    botY = yCenter + y;
    */
    if ((angle < halfPi) || (Math.PI < angle) && (angle < (3 * halfPi))) {
      topX = xCenter + x;
      topY = yCenter + y;
      botX = xCenter - x;
      botY = yCenter - y;

    }
    else if(halfPi < angle < Math.PI || 3(halfPi) < angle < 2(Math.PI)) { //other part of math we did
      topX = xCenter - x;
      topY = yCenter + y;
      botX = xCenter + x;
      botY = yCenter - y;

    }
    //want to drop needles of one color and tint?/change color after a sleep function
    // .tint = color
    // yellow? 0xfcba03
    // white? 0xffffff

    //this for loop section chooses the color of the line to be dropped

    //lineInArray.lineStyle(1, 0xfcba03, 1);
    for (let k = 0; k < lines.length; k++) {
      //checks to see if the needle dropped not crosses the grid lines and changes color red
      if ((topY <= lines[k] && botY <= lines[k]) || (topY >= lines[k] && botY >= lines[k])) {
        //lineInArray.tint = 0xFF0000;
        lineInArray.lineStyle(1, 0xFF0000, 1);
      }
      //checks to see if the needle does dropped crosses the grid line and changes color green
      else {
        lineInArray.tint = 0xAAFF00;
        lineInArray.lineStyle(1, 0xAAFF00, 1);
        needleCross++;
        //we stop so the colors don't overwrite the colors 
        k = lines.length;//sets as lines length to stop for loop
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

    //setTimeout(clearNeedles(botY, topY), 1500)

    //copied previous line code, just rewrote the variable name
    /*lineInArray.moveTo(xCenter, yCenter);
    lineInArray.lineTo(topX, topY);
 
    //we can just move line to bottom locations
    lineInArray.lineTo(botX, botY);
    lineInArray.closePath();
 
    app.stage.addChild(lineInArray);
    //pushing the new line into the array
    lineArray.push(lineInArray);*/
  }


  // this is all the stats to put on the screen 
  let pi = (2.0 * needleLength) / (lineSpace * ((needleCross) / needleDrop)); // pi estimation 
  let error = Math.abs((pi - Math.PI) / Math.PI) * 100; //percent error
  document.getElementById("estimation").innerHTML = "PI Estimation: " + Math.round(pi * 10000) / 10000;
  document.getElementById("realPi").innerHTML = "Real value of PI : " + Math.round(Math.PI * 10000) / 10000;
  document.getElementById("needLength").innerHTML = "Needle Length: " + Math.round(needleLength * 10000) / 10000;
  document.getElementById("gridSpace").innerHTML = "Space Between Lines: " + Math.round(lineSpace * 10000) / 10000;
  document.getElementById("needCross").innerHTML = "Needles that Cross a Line: " + needleCross;
  document.getElementById("needleDontCross").innerHTML = "Needles that Don't Cross a Line: " + (needleDrop - needleCross);
  document.getElementById("total").innerHTML = "Total Needles Dropped: " + needleDrop;
  document.getElementById("percentError").innerHTML = "Percent Error for PI: " + Math.round(error * 10000) / 10000 + "%";
}


/*function colorNeedles(botY, topY) {
  for (let k = 0; k < lines.length; k++) {
    //checks to see if the needle dropped not crosses the grid lines and changes color red
    if ((topY <= lines[k] && botY <= lines[k]) || (topY >= lines[k] && botY >= lines[k])) {
      lineInArray.tint = 0xFF0000;
    }
    //checks to see if the needle does dropped crosses the grid line and changes color green
    else {
      lineInArray.tint = 0xAAFF00;
      needleCross++;
      //we stop so the colors don't overwrite the colors 
      k = lines.length;//sets as lines length to stop for loop
    }
  }
}*/
//clears needles from page and removes them from the array
function clearNeedles() {

  //this code removes them from the stage
  lineArray.forEach(lineInArray => {
    app.stage.removeChild(lineInArray); //these remove the lines from Field of view but they are still present in memory
  });

  lineInArray.destroy();//gets rid of all lines on game
  lineInArray = new PIXI.Graphics();//need to redelcare the variable to get game working again

  //splice will remove all objects of the array
  lineArray.splice(0, lineArray.length);
  needleCross = 0;
  needleDrop = 0;
}