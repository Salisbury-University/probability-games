// create window height variable
let windowWidth = document.body.clientWidth * .8; //.8
let windowHeight = window.innerHeight * .53;
let pi = 0;
//let canvas = document.getElementById('app');
const halfPi = Math.PI / 2;


//create Application Window
let app = new PIXI.Application({
  view:  document.getElementById('app').appendChild(document.createElement('canvas')), //canvas,
  backgroundColor: 0x323031,
  width: windowWidth,
  height: windowHeight
});
const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fontWeight: 'bold',
  fill: ['#ffffff'], // gradient
});
let basicText = new PIXI.Text('d', style);
basicText.x = windowWidth - 100;
basicText.y = 100;
app.stage.addChild(basicText);

// resize canvas when window is resized
window.addEventListener('resize', function() {
  app.renderer.resize(document.body.clientWidth * .8, window.innerHeight * .53);
});

// append the application window to the page
document.getElementById('app').appendChild(app.view);

//var numN = document.getElementById("amountOfNeedles");
document.getElementById("amountOfNeedles").addEventListener("keydown", function (e) {
  if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    needleXY();
  }
});

let line = new PIXI.Graphics();
let lines = [];
let needles = [];
let nextEmpty = 0;
let needleCross = 0;
let needleDrop = 0;
let needleColor = 0xffffff;
let dropTypeValue = "Singular";
var needleDropSound = new Audio('../sounds/needleDrop.mp3');


let lineInArray = new PIXI.Graphics(); //created a new line variable to test out working code
let lineArray = [];//an array of the lineInArray pixi graphics object
let amountLines = 7;//number is visible lines is amountLines + 1
let lineSpace = windowHeight / amountLines;
let needleLengthPercent = 0.9;
let needleLength = lineSpace * needleLengthPercent;
let yValue = 0; //yValue is space between lines

needleDropSound.volume = 0.5;

window.onload = function () {
  let volume = document.getElementById("volume-control");
  volume.addEventListener("input", function (e) {
    needleDropSound.volume = e.currentTarget.value / 100;
  });
};


document.getElementById("disableSound").addEventListener("click", function () {
  if (this.checked) {
    needleDropSound.muted = true;
    // Do something when checkbox is checked
  } else {
    needleDropSound.muted = false;
    // Do something when checkbox is unchecked
  }
});

//creates the grid lines of the webpage
for (let i = 0; i < amountLines + 1; i++) {
  if (i == 0 || i == amountLines) {
    line.lineStyle(3, 0x0096FF);
  }
  else {
    line.lineStyle(1, 0x0096FF, 1);
  }
  line.moveTo(0, yValue);
  line.lineTo(windowWidth *.75, yValue);
  line.closePath();
  app.stage.addChild(line);
  lines[i] = yValue;
  yValue = yValue + lineSpace;
}



function changeTheme() {
  if (document.getElementById("themeTypeSwitch").checked) {
    changeDarkTheme();
  } else {
    changeLightTheme();
  }
}

function changeDarkTheme() {
  //changes top section to dark and text to white
  document.getElementById("topPageSection").style.backgroundColor = "#313b4b";
  document.getElementById("topPageSection").style.color = "white";

  document.getElementById("bottomSection").style.backgroundColor = "#313b4b";
  document.getElementById("bottomSection").style.color = "white";
  document.body.style.backgroundColor = "#262626";

  //document.getElementById("body").style.backgroundColor = "#262626";
}

function changeLightTheme() {
  //changes top section
  document.getElementById("topPageSection").style.backgroundColor = "#FFEDC9";
  document.getElementById("topPageSection").style.color = "black";

  //changes bottom section
  document.getElementById("bottomSection").style.backgroundColor = "#FFEDC9";
  document.getElementById("bottomSection").style.color = "black";

  document.body.style.backgroundColor = "#ffd789";
}

function changeLines(num) {
  if (amountLines == 9 && num == 1) {
    alert("Can not go over ten lines");
  } else if (amountLines == 1 && num == -1) {
    alert("Cannot go lower then two lines");
  } else {
    amountLines += num;
    document.getElementById("displayNumberGridLines").innerHTML = (amountLines + 1);
    clearNeedles();
    line.destroy(); //destroy lines to build again
    lines = [];
    line = new PIXI.Graphics();

    lineSpace = windowHeight / amountLines;
    needleLength = lineSpace * 0.9;
    yValue = 0; //yValue is space between lines - starts at 0

    //creates the grid lines of the webpage
    for (let i = 0; i < amountLines + 1; i++) {
      if (i == 0 || i == amountLines) {
        line.lineStyle(3, 0x0096FF, 1);
      } else {
        line.lineStyle(1, 0x0096FF, 1);
      }
      line.moveTo(0, yValue);
      line.lineTo(windowWidth, yValue);
      line.closePath();
      app.stage.addChild(line);
      lines[i] = yValue;
      yValue = yValue + lineSpace;
      
    }
  }
}

//first function to be called while user guessing PI
function guessPI() {
  document.getElementById("topPageSection").hidden = true;

  document.getElementById("guessingPiNum").addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter" (if enter is pressed then calls next function)
      guessingPIfunc();
    }
  });
  //hello

  //this hides the previous page (the stats for the page)
  document.getElementById("stats").hidden = true;
  //document.getElementById("statsLocated3").setAttribute("hidden", "hidden");
  //document.getElementById("formulaValue").setAttribute("hidden", "hidden");
  //disables the button to drop needles
  document.getElementById("dropNeedleButton").setAttribute("disabled", "disabled");

  //shows guessingPI section
  document.getElementById("guessingPI").removeAttribute("hidden");
}
//the second function to be called (by user pressing enter)
function guessingPIfunc() {
  //shows result area
  document.getElementById("resultArea").removeAttribute("hidden");
  //document.getElementById("userGuessSection").innerHTML = "You guessed: " + document.getElementById("guessingPiNum").value;
  //document.getElementById("percentErrorSection").innerHTML = "You were this far off: " + (Math.round((Math.abs((document.getElementById("guessingPiNum").value - pi) / pi) * 100) * 100) / 100) + "%";
  document.getElementById("guessingPI").setAttribute("hidden", "hidden");

  //shows the guess pi button (which brings us back to first page)
  document.getElementById("guessPIButton").setAttribute("hidden", "hidden");
  //shows continuebutton (which continues to the last section [showing how accurate user is])
  document.getElementById("continueButton").removeAttribute("hidden");
}

//last section displayed (resets back to how website originally looked)
const buttons = querySelectorAll(".statsSection");
buttons[0].addEventListener("click", () => {
    buttons[0].hidden = true;
    buttons[1].hidden = false;
    console.log("duxk odf");
});
buttons[1].addEventListener("click", () => {
    buttons[1].hidden = true;
    buttons[0].hidden = false;
    console.log("fcuk you");

});
function needleXY() {
  app.stage.removeChild(basicText);
  let dropNeedles = document.getElementById("amountOfNeedles").value;
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

      let max = lines[lines.length - 1];
      let min = lines[0]
      yCenter = Math.floor(Math.random() * (max - min)) + min;
      needleDrop++;

      //calculate the angle
      let angle = Math.floor(Math.random() * 360);
      angle = toRadians(angle);


      //creating angle/line
      //sin must go to the y value and x to cos
      y = (needleLength) * (Math.sin(angle));
      x = (needleLength) * (Math.cos(angle));
      xEnd = xCenter + x;
      yEnd = yCenter + y;
      //this for loop section chooses the color of the line to be dropped

      //lineInArray.lineStyle(1, 0xfcba03, 1);
      for (let k = 0; k < lines.length; k++) {
        //checks to see if the needle dropped not crosses the grid lines and changes color red
        if ((yEnd <= lines[k] && yCenter <= lines[k]) || (yEnd >= lines[k] && yCenter >= lines[k])) {
          //F248F2
          //F331F3
          //FB00FB
          //F900E8

          lineInArray.lineStyle(1, 0xFB00FB, 1);
        }
        //checks to see if the needle does dropped crosses the grid line and changes color green
        else {
          //lineInArray.tint = 0xAAFF00;
          //08B908
          //f50c878
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

    playAudio();
    // this is all the stats to put on the screen 
    pi = (2.0 * needleLength) / (lineSpace * ((needleCross) / needleDrop)); // pi estimation 
    let error = Math.abs((pi - Math.PI) / Math.PI) * 100; //percent error
    document.getElementsByClassName("estimation")[0].innerHTML = "PI Estimation: " + Math.round(pi * 10000) / 10000;
    document.getElementsByClassName("estimation")[1].innerHTML = "PI Estimation: " + Math.round(pi * 10000) / 10000;
    document.getElementById("realPi").innerHTML = "Real value of PI : " + Math.round(Math.PI * 10000) / 10000;
    document.getElementById("needLength").innerHTML = Math.round(needleLength * 10) / 10 ; //the  units is pixels
    document.getElementById("gridSpace").innerHTML =  Math.round(lineSpace * 10) / 10;
    document.getElementsByClassName("needCross")[0].innerHTML = "# of Needles that Cross a Line(Green): " + needleCross;
    document.getElementsByClassName("needCross")[1].innerHTML = needleCross;
    document.getElementById("needleDontCross").innerHTML = "# of Needles that Don't Cross a Line(Purple): " + (needleDrop - needleCross);
    document.getElementsByClassName("total")[0].innerHTML = "Total # of Needles Dropped: " + needleDrop;
    document.getElementsByClassName("total")[1].innerHTML = needleDrop;
    document.getElementById("percentError").innerHTML = "Percent Error for PI estimaton: " + Math.round(error * 10000) / 10000 + "%";

  }
}

//converts angle in degrees to radians
function toRadians(angle) {
  return angle * (Math.PI / 180.0);
}

function changeNeedleLength(size) {

  needleLengthPercent = size;

  needleLength = lineSpace * (needleLengthPercent);
  clearNeedles();
}

function playAudio() {
  needleDropSound.pause();
  needleDropSound.currentTime = 1.6;
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

document.querySelectorAll(".dropdown-percent").forEach(link => {
  link.addEventListener('click', () => {
    let selected = link.dataset.percent;
    let dropdown = document.getElementById('percentDropdown');
    let tempText = dropdown.textContent.replace('%', '');

    dropdown.textContent = selected + '%';
    document.getElementById(selected).hidden = true;
    document.getElementById(tempText).hidden = false;
    selected = selected / 100;
    changeNeedleLength(selected);
  })
});

document.getElementById("singular").addEventListener('click', () => {
  if (dropTypeValue == "Cumulative") {
    dropTypeValue = "Singular";
    clearNeedles();
  }
});

document.getElementById("cumulative").addEventListener('click', () => {
  if (dropTypeValue == "Singular") {
    dropTypeValue = "Cumulative";
    clearNeedles();
  }
});