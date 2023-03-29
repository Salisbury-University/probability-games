// create window height variable
let windowWidth = document.body.clientWidth * .75;
let windowHeight = window.innerHeight * .65;
let canvas = document.getElementById('my-canvas');
const halfPi = Math.PI / 2

//create Application Window
let app = new PIXI.Application({
  view: canvas,
  backgroundColor: 0x323031,
  width: windowWidth,
  height: windowHeight
});

// append the application window to the page
document.body.appendChild(app.view);

//var numN = document.getElementById("amountOfNeedles");
document.getElementById("amountOfNeedles").addEventListener("keydown", function (e) {
  if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    needleXY();
  }
});


function resizeCanvas() {
  canvas.width = document.body.clientWidth * .75;; // Set the canvas width to 75% of the window width
  canvas.height = window.innerHeight * .65; // Set the canvas height to 65% of the window height
  windowWidth = document.body.clientWidth * .75;
  windowHeight = window.innerHeight * .65;
}

// Add an event listener to resize the canvas when the window size changes
window.addEventListener('resize', resizeCanvas);




let line = new PIXI.Graphics();
let lines = [];
let needles = [];
let nextEmpty = 0;
let needleCross = 0;
let needleDrop = 0;
let needleColor = 0xffffff;
let dropTypeValue = "Cumulative";
var needleDropSound = new Audio('../sounds/needleDrop.mp3');


let lineInArray = new PIXI.Graphics(); //created a new line variable to test out working code
let lineArray = [];//an array of the lineInArray pixi graphics object
let amountLines = 7;
let lineSpace = windowHeight / amountLines;
let needleLength = lineSpace * 0.9;
let yValue = lineSpace; //yValue is space between lines
console.log(lineSpace);
//lines[0] = 0;
//creates the grid lines of the webpage
for (let i = 0; i < amountLines - 1; i++) {
  line.lineStyle(1, 0x0096FF, 1);
  line.moveTo(0, yValue);
  line.lineTo(windowWidth, yValue);
  line.closePath();
  app.stage.addChild(line);
  lines[i] = yValue;
  yValue = yValue + lineSpace;
}

function changeLines(num) {
  if (amountLines == 10 && num == 1) {
    alert("Can not go over ten lines");
  } else if (amountLines == 3 && num == -1) {
    alert("Cannot go lower then two lines");
  } else {
    amountLines += num;
    console.log(amountLines);
    document.getElementById("gridAmount").innerHTML = amountLines - 1;
    clearNeedles();
    line.destroy(); //destroy lines to build again
    lines = [];
    //lines[0] = 0;
    line = new PIXI.Graphics();

    lineSpace = windowHeight / amountLines;
    needleLength = lineSpace * 0.9;
    yValue = lineSpace; //yValue is space between lines

    //creates the grid lines of the webpage
    for (let i = 0; i < amountLines - 1; i++) {
      line.lineStyle(1, 0x0096FF, 1);
      line.moveTo(0, yValue);
      line.lineTo(windowWidth, yValue);
      line.closePath();
      app.stage.addChild(line);
      lines[i] = yValue;
      yValue = yValue + lineSpace;
    }
  }
}

function continueGame() {
  document.getElementById("resultArea").setAttribute("hidden", "hidden");
  document.getElementById("statsLocated1").removeAttribute("hidden");
  document.getElementById("statsLocated2").removeAttribute("hidden");
  document.getElementById("statsLocated3").removeAttribute("hidden");
  document.getElementById("guessPIButton").removeAttribute("hidden");
  document.getElementById("continueButton").setAttribute("hidden", "hidden");

  document.getElementById("guessPIButton").setAttribute("disabled", "disabled");
  document.getElementById("dropNeedleButton").removeAttribute("disabled");
  clearNeedles();
}

function guessingPIfunc() {
  document.getElementById("resultArea").removeAttribute("hidden");
  document.getElementById("userGuessSection").innerHTML = "You guessed: " + document.getElementById("guessingPiNum").value;
  document.getElementById("percentErrorSection").innerHTML = "Percent Error: " + Math.abs((document.getElementById("guessingPiNum").value - Math.PI) / Math.PI) * 100 + "%";
  document.getElementById("guessingPI").setAttribute("hidden", "hidden");

  document.getElementById("guessPIButton").setAttribute("hidden", "hidden");
  document.getElementById("continueButton").removeAttribute("hidden");
  document.getElementById("needLength").innerHTML = "Needle Length: " + Math.round(needleLength * 10) / 10 + " Units"; // units is pixels
  document.getElementById("gridSpace").innerHTML = "Space Between Lines: " + Math.round(lineSpace * 10) / 10 + " Units";
}

function guessPI() {

  document.getElementById("guessingPiNum").addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
      guessingPIfunc();
    }
  });

  console.log("Function called");
  document.getElementById("statsLocated1").setAttribute("hidden", "hidden");
  document.getElementById("statsLocated2").setAttribute("hidden", "hidden");
  document.getElementById("formulaValue").setAttribute("hidden", "hidden");
  document.getElementById("dropNeedleButton").setAttribute("disabled", "disabled");


  document.getElementById("guessingPI").removeAttribute("hidden");
}

function needleXY() {

  let dropNeedles = document.getElementById("amountOfNeedles").value;
  console.log("Value of lines.length: " + lines.length);
  for (let i = 0; i < lines.length; i++) {
    console.log("Value: " + i + " " + lines[i]);
  }
  if (dropNeedles > 50000) {
    alert("Please enter 50,000 Needles or less");
  } else if (dropNeedles <= 0) {
    alert("Please enter 1 or more Needles");
  } else {
    document.getElementById("guessPIButton").removeAttribute("disabled");

    if (dropTypeValue == "Singular") {
      clearNeedles();
    }
    //gets user input for needles

    let xCenter, yCenter;
    let x, y;
    let xEnd, yEnd;


    //drops needles j times
    for (let j = 0; j < dropNeedles; j++) {
      //randomzied x and y centers

      //do-while loop that drops xCenter a clear distance away from the edge
      do {
        xCenter = Math.random() * windowWidth;
      } while (xCenter < needleLength || xCenter > windowWidth - needleLength);

      //testing dropping needles not on edge (or we randomly drop again)
      /*if (xCenter < needleLength) {
        xCenter += needleLength
      } else if (xCenter > windowWidth - needleLength) {
        xCenter -= needleLength;
      }*/
      let max = lines[lines.length - 1];
      let min = lines[0]
      yCenter = Math.floor(Math.random() * (max - min)) + min;
      if (yCenter > lines[lines.length - 1]) {
        console.log("Y center for needle: " + j + ": " + yCenter);
      }
      needleDrop++;

      //calculate the angle
      let angle = Math.floor(Math.random() * 360);
      //console.log(angle);
      angle = toRadians(angle);


      //creating angle/line
      //sin must go to the y value and x to cos
      y = (needleLength) * (Math.sin(angle));
      x = (needleLength) * (Math.cos(angle));
      //console.log("run: " + x);
      //console.log("Rise: " + y);
      //want to drop needles of one color and tint?/change color after a sleep function
      // .tint = color
      // yellow? 0xfcba03
      // different yellow #FFEA00
      // white? 0xffffff
      // bright purple #BF40BF
      //different green #50C878
      //now using xCenter and yCenter as end points
      xEnd = xCenter + x;
      yEnd = yCenter + y;
      //console.log("xEnd =" + xEnd);
      //console.log("yEnd =" + yEnd);
      //this for loop section chooses the color of the line to be dropped

      //lineInArray.lineStyle(1, 0xfcba03, 1);
      for (let k = 0; k < lines.length; k++) {
        //checks to see if the needle dropped not crosses the grid lines and changes color red
        if ((yEnd <= lines[k] && yCenter <= lines[k]) || (yEnd >= lines[k] && yCenter >= lines[k])) {
          //lineInArray.tint = 0xFF0000;
          lineInArray.lineStyle(1, 0xbf40bf, 1);
        }
        //checks to see if the needle does dropped crosses the grid line and changes color green
        else {
          //lineInArray.tint = 0xAAFF00;
          lineInArray.lineStyle(1, 0xf50c878, 1);
          needleCross++;
          //we stop so the colors don't overwrite the colors 
          k = lines.length;//sets as lines length to stop for loop
        }
        //copied previous line code, just rewrote the variable name
        lineInArray.moveTo(xCenter, yCenter);
        lineInArray.lineTo(xEnd, yEnd);
        lineInArray.closePath();
        app.stage.addChild(lineInArray);
        //pushing the new line into the array
        lineArray.push(lineInArray);
      }
    }

    // playAudio();
    // this is all the stats to put on the screen 
    let pi = (2.0 * needleLength) / (lineSpace * ((needleCross) / needleDrop)); // pi estimation 
    let error = Math.abs((pi - Math.PI) / Math.PI) * 100; //percent error
    document.getElementById("estimation").innerHTML = "PI Estimation: " + Math.round(pi * 10000) / 10000;
    document.getElementById("realPi").innerHTML = "Real value of PI : " + Math.round(Math.PI * 10000) / 10000;
    document.getElementById("needLength").innerHTML = "Needle Length: " + Math.round(needleLength * 10) / 10 + " Units"; // units is pixels
    document.getElementById("gridSpace").innerHTML = "Space Between Lines: " + Math.round(lineSpace * 10) / 10 + " Units";
    document.getElementById("needCross").innerHTML = "Needles that Cross a Line: " + needleCross;
    document.getElementById("needleDontCross").innerHTML = "Needles that Don't Cross a Line: " + (needleDrop - needleCross);
    document.getElementById("total").innerHTML = "Total Needles Dropped: " + needleDrop;
    document.getElementById("percentError").innerHTML = "Percent Error for PI: " + Math.round(error * 10000) / 10000 + "%";
  }
}

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
  closeModal();
  console.log(dropTypeValue);
}

function customLength() {
  let percent = document.getElementById("percentageOfNeedle").value;
  if (percent > 100) {
    percent = 100;
    alert("Custom Length Has to be less then 100");
  } else if (percent <= 0) {
    percent = 100;
    alert("Custom Length Has to be greater then 0");
  }
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

function closeModal() {
  $('#settingsModal').modal('hide');
}


function showDropType() {
  document.getElementById("dropTypeData").removeAttribute("hidden");
  document.getElementById("gridData").setAttribute("hidden", "hidden");
  console.log("Show drop type info");
}

function showGridInfo() {
  document.getElementById("gridData").removeAttribute("hidden");
  document.getElementById("dropTypeData").setAttribute("hidden", "hidden");
  document.getElementById("gridAmount").innerHTML = amountLines - 1;
  console.log("Show grid info");
}

function playAudio() {
  needleDropSound.pause();
  needleDropSound.currentTime = 1.7;
  needleDropSound.play();
}



function colorNeedles(yEnd, yCenter) { // over writes the colors even though the for loop it's copied from doesn't
  for (let k = 0; k < lines.length; k++) {
    //checks to see if the needle dropped not crosses the grid lines and changes color red
    if ((yEnd <= lines[k] && yCenter <= lines[k]) || (yEnd >= lines[k] && yCenter >= lines[k])) {
      needleColor = 0xbf40bf;
    }
    //checks to see if the needle does dropped crosses the grid line and changes color green
    else {
      needleColor = 0xf50c878;
      needleCross++;
      k = lines.length;
    }
  }
}
//clears needles from page and removes them from the array
function clearNeedles() {
  neg = 0;
  pos = 0;
  console.log("Next Empty size: " + nextEmpty);

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