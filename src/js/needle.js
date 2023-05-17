// create window height variable
let windowWidth = document.body.clientWidth * .8; //.8
let windowHeight = window.innerHeight * .53;
let pi = 0;
let amountLines = 7;//number is visible lines is amountLines + 1
let lineSpace = windowHeight / amountLines;
//let canvas = document.getElementById('app');
const halfPi = Math.PI / 2;

//create Application Window
let app = new PIXI.Application({
  view: document.getElementById('app').appendChild(document.createElement('canvas')), //canvas,
  backgroundColor: 0x323031,
  width: windowWidth,
  height: windowHeight
});
const bgContainer = new PIXI.Container();
app.stage.addChild(bgContainer);

// Create the a background colors as separate graphics objects for the } and d
let bg1 = new PIXI.Graphics();
bg1.beginFill(0xffd789);
bg1.drawRect(windowWidth * .9, 0, app.view.width, app.view.height); // Top half of the canvas
bg1.endFill();
bgContainer.addChild(bg1);


let labelColor = '#000000';

let style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: lineSpace,
  fill: labelColor, 
});

/*let styled = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fill: labelColor, 
});*/
let basicText = new PIXI.Text();
let basicTextArray = [];

// resize canvas when window is resized
window.addEventListener('resize', function () {
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
//let labels = [];
let needles = [];
let nextEmpty = 0;
let needleCross = 0;
let needleDrop = 0;
let needleColor = 0xffffff;
let dropTypeValue = "Singular";
var needleDropSound = new Audio('../sounds/needleDrop.mp3');


let lineInArray = new PIXI.Graphics(); //created a new line variable to test out working code
let lineArray = [];//an array of the lineInArray pixi graphics object
let needleLengthPercent = 0.9;
let needleLength = lineSpace * needleLengthPercent;
let yValue = 0; //yValue is space between lines
needleDropSound.volume = 0.5;

window.onload = function () {
  let volume = document.getElementById("volume-control");
  changeLightTheme(); //also calls light theme
  volume.addEventListener("input", function (e) {
    needleDropSound.volume = e.currentTarget.value / 100;
  });

  document.getElementsByClassName("estimation")[0].innerHTML = "PI Estimation: ";
  document.getElementsByClassName("estimation")[1].innerHTML = " ";
  document.getElementById("realPi").innerHTML = "Rounded value of PI : " + Math.round(Math.PI * 10000) / 10000;
  document.getElementsByClassName("needLength")[0].innerHTML = Math.round(needleLength * 10) / 10 + " Units"; //the  units is pixels
  document.getElementsByClassName("needLength")[1].innerHTML = Math.round(needleLength * 10) / 10; //the  units is pixels
  document.getElementsByClassName("gridSpace")[0].innerHTML = Math.round(lineSpace * 10) / 10 + " Units";
  document.getElementsByClassName("gridSpace")[1].innerHTML = Math.round(lineSpace * 10) / 10;
  document.getElementsByClassName("needCross")[0].innerHTML = "# of Needles that Cross a Line(Green): 0";
  document.getElementsByClassName("needCross")[1].innerHTML = 0;
  document.getElementsByClassName("needCross")[2].innerHTML = 0;
  document.getElementById("needleDontCross").innerHTML = "# of Needles that Don't Cross a Line(Purple): 0";
  document.getElementsByClassName("total")[0].innerHTML = "Total # of Needles Dropped: 0";
  document.getElementsByClassName("total")[1].innerHTML = 0;
  document.getElementsByClassName("total")[2].innerHTML = 0;
  document.getElementById("percentError").innerHTML = "Percent Error for PI estimaton: ";
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
  line.lineTo(windowWidth * .9, yValue); //*.75
  line.closePath();
  app.stage.addChild(line);
  lines[i] = yValue;
  yValue = yValue + lineSpace;
}
<<<<<<< HEAD
/*labelD = new PIXI.Text('  d', styled);
labelD.x = windowWidth * .91;
labelD.y = lines[0] - (lineSpace * .15);
app.stage.addChild(labelD);*/
//creates the labels
//for (let j = 0; j < amountLines + 1; j++) {
basicText = new PIXI.Text('}d', style);
=======
labelD = new PIXI.Text('  d', styled);
labelD.x = windowWidth * .91;
labelD.y = lines[0] - (lineSpace * .1);
app.stage.addChild(labelD);
//creates the labels
//for (let j = 0; j < amountLines + 1; j++) {
basicText = new PIXI.Text('}', style);
>>>>>>> 309ac9138288acdbc37f4ed7e889e0c8120eb442
basicText.x = windowWidth * .91;
basicText.y = lines[0] - 10;
app.stage.addChild(basicText);
basicTextArray.push(basicText);
//}



function changeTheme() {
  if (document.getElementById("themeTypeSwitch").checked) {
    changeDarkTheme();
  } else {
    changeLightTheme();
  }
}

function changeDarkTheme() {
  //changes top section to dark and text to white
  bg1.destroy();
  bg1 = new PIXI.Graphics();
  bg1.beginFill(0x262626);
  bg1.drawRect(windowWidth * .9, 0, app.view.width, app.view.height); // Top half of the canvas
  bg1.endFill();
  bgContainer.addChild(bg1);
  let div = document.querySelectorAll("#topPageSection");
  div.forEach(d => {
    d.style.backgroundColor = "#313b4b";
    d.style.color = "white";
  });
  document.getElementById("canvasArea").style.backgroundColor = "#262626";
  document.body.style.backgroundColor = "#313b4b";
  labelColor = '0xffffff';

  style.fill = 0xffffff;
  styled.fill = 0xffffff;
  

  /*labelD.destroy();
  labelD = new PIXI.Text('  d', styled);
  labelD.x = windowWidth * .91;
  labelD.y = lines[0]- (lineSpace * .5);
  app.stage.addChild(labelD);*/

  //creates the labels
  style.fontSize = lineSpace;
  basicText = new PIXI.Text('}d', style);
  basicText.x = windowWidth * .91;
  basicText.y = lines[0] - (lineSpace * .15);
  app.stage.addChild(basicText);
  basicTextArray.push(basicText);

}

function changeLightTheme() {

  bg1.destroy();
  bg1 = new PIXI.Graphics();
  bg1.beginFill(0xffd789);
  bg1.drawRect(windowWidth * .9, 0, app.view.width, app.view.height); // Top half of the canvas
  bg1.endFill();
  bgContainer.addChild(bg1);
  let div = document.querySelectorAll("#topPageSection");
  div.forEach(d => {
    d.style.backgroundColor = "#FFEDC9";
    d.style.color = "black";
  });
  document.getElementById("canvasArea").style.backgroundColor = "#ffd789";

  bg1.fill.color = 0xffd789;

  document.body.style.backgroundColor = "#FFEDC9";
  labelColor = '0x000000';

  style.fill = 0x00000;
  styled.fill = 0x00000; 
 /* labelD.destroy();

  labelD = new PIXI.Text('  d', styled);
  labelD.x = windowWidth * .91;
  labelD.y = lines[0];
  app.stage.addChild(labelD);*/

  //creates the labels
  style.fontSize = lineSpace;
  basicText = new PIXI.Text('}d', style);
  basicText.x = windowWidth * .91;
  basicText.y = lines[0] - (lineSpace * .15);
  app.stage.addChild(basicText);
  basicTextArray.push(basicText);
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

    // destroy each text object in the array
    for (let i = 0; i < basicTextArray.length; i++) {
      basicTextArray[i].destroy();
    }
    //labelD.destroy();
    //basicText.destroy();

    lines = [];
    line = new PIXI.Graphics();
    basicTextArray = [];

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
      line.lineTo(windowWidth * .9, yValue);//*.75
      line.closePath();
      app.stage.addChild(line);
      lines[i] = yValue;
      yValue = yValue + lineSpace;

    }
<<<<<<< HEAD
    //creates the labels
    if(amountLines >= 3){
      style.fontSize = lineSpace;
      basicText = new PIXI.Text('}d', style);
      basicText.x = windowWidth * .91;
      basicText.y = lines[0] - (lineSpace * .15);
      app.stage.addChild(basicText);
      basicTextArray.push(basicText);
    }
    
    
=======
    labelD = new PIXI.Text('  d', styled);
    labelD.x = windowWidth * .91;
    labelD.y = lines[0];
    app.stage.addChild(labelD);

    //creates the labels
    //for (let j = 0; j < amountLines + 1; j++) {
    style.fontSize = lineSpace;
    basicText = new PIXI.Text('}', style);
    basicText.x = windowWidth * .91;
    basicText.y = lines[0] - (lineSpace * .15);
    app.stage.addChild(basicText);
    basicTextArray.push(basicText);
    //}
>>>>>>> 309ac9138288acdbc37f4ed7e889e0c8120eb442

  }
}


//the second function to be called (by user pressing enter)
function guessingPIfunc() {
  //shows result area
  document.getElementById("resultArea").removeAttribute("hidden");
  document.getElementById("guessingPI").setAttribute("hidden", "hidden");

  //shows the guess pi button (which brings us back to first page)
  document.getElementById("guessPIButton").setAttribute("hidden", "hidden");
  //shows continuebutton (which continues to the last section [showing how accurate user is])
  document.getElementById("continueButton").removeAttribute("hidden");
}

//last section displayed (resets back to how website originally looked)
const buttons = document.querySelectorAll(".statsSection");
buttons[0].addEventListener("click", () => {
  buttons[0].hidden = true;
  buttons[1].hidden = false;
  document.getElementById("topPageSection").hidden = true;
  document.getElementById("moreInfo").hidden = false;
  document.getElementById("stats").hidden = true;
});

buttons[1].addEventListener("click", () => {
  buttons[1].hidden = true;
  buttons[0].hidden = false;
  document.getElementById("moreInfo").hidden = true;
  document.getElementById("stats").hidden = false;
  document.getElementById("topPageSection").hidden = false;


});
function needleXY() {
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
        xCenter = Math.random() * windowWidth * .88;
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

          lineInArray.lineStyle(1, 0xFB00FB, 1);
        }
        //checks to see if the needle does dropped crosses the grid line and changes color green
        else {
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
    document.getElementsByClassName("estimation")[1].innerHTML = Math.round(pi * 10000) / 10000;
    document.getElementById("realPi").innerHTML = "Rounded value of PI : " + Math.round(Math.PI * 10000) / 10000;
    document.getElementsByClassName("needLength")[0].innerHTML = Math.round(needleLength * 10) / 10 + " Units"; //the  units is pixels
    document.getElementsByClassName("needLength")[1].innerHTML = Math.round(needleLength * 10) / 10; //the  units is pixels
    document.getElementsByClassName("gridSpace")[0].innerHTML = Math.round(lineSpace * 10) / 10 + " Units";
    document.getElementsByClassName("gridSpace")[1].innerHTML = Math.round(lineSpace * 10) / 10;
    document.getElementsByClassName("needCross")[0].innerHTML = "# of Needles that Cross a Line(Green): " + needleCross;
    document.getElementsByClassName("needCross")[1].innerHTML = needleCross;
    document.getElementsByClassName("needCross")[2].innerHTML = needleCross
    document.getElementById("needleDontCross").innerHTML = "# of Needles that Don't Cross a Line(Purple): " + (needleDrop - needleCross);
    document.getElementsByClassName("total")[0].innerHTML = "Total # of Needles Dropped: " + needleDrop;
    document.getElementsByClassName("total")[1].innerHTML = needleDrop;
    document.getElementsByClassName("total")[2].innerHTML = needleDrop;
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

//clears needles from page and removes them from the array
function clearNeedles() {
  neg = 0;
  pos = 0;

  document.getElementsByClassName("estimation")[0].innerHTML = "PI Estimation: ";
  document.getElementsByClassName("estimation")[1].innerHTML = " ";
  document.getElementById("realPi").innerHTML = "Rounded value of PI : " + Math.round(Math.PI * 10000) / 10000;
  document.getElementsByClassName("needLength")[0].innerHTML = Math.round(needleLength * 10) / 10 + " Units"; //the  units is pixels
  document.getElementsByClassName("needLength")[1].innerHTML = Math.round(needleLength * 10) / 10; //the  units is pixels
  document.getElementsByClassName("gridSpace")[0].innerHTML = Math.round(lineSpace * 10) / 10 + " Units";
  document.getElementsByClassName("gridSpace")[1].innerHTML = Math.round(lineSpace * 10) / 10;
  document.getElementsByClassName("needCross")[0].innerHTML = "# of Needles that Cross a Line(Green): 0";
  document.getElementsByClassName("needCross")[1].innerHTML = 0;
  document.getElementsByClassName("needCross")[2].innerHTML = 0;
  document.getElementById("needleDontCross").innerHTML = "# of Needles that Don't Cross a Line(Purple): 0";
  document.getElementsByClassName("total")[0].innerHTML = "Total # of Needles Dropped: 0";
  document.getElementsByClassName("total")[1].innerHTML = 0;
  document.getElementsByClassName("total")[2].innerHTML = 0;
  document.getElementById("percentError").innerHTML = "Percent Error for PI estimaton: ";


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