// create window height variable
const windowWidth = document.body.clientWidth;
const windowHeight = window.innerHeight * .85;
const needleLength = 70;
const numberOfLines = 7;
//create Application Window
let app = new PIXI.Application({
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

let lineInArray = new PIXI.Graphics(); //created a new line variable to test out working code
let lineArray = [];//an array of the lineInArray pixi graphics object

let lineSpace = windowHeight / 7;
//console.log(lineSpace);
let yValue = lineSpace;


//creates the grid lines of the webpage
for (let i = 0; i < 7; i++) {
  line.beginFill(0x0096FF);
  line.drawRect(0, yValue, windowWidth, 2);
  line.endFill();
  app.stage.addChild(line);
  lines[i] = yValue;
  yValue = yValue + lineSpace;
}

//converts angle in degrees to radians
function toRadians(angle) {
  return angle * (Math.PI / 180);
}


function needleXY() {
  let xCenter, yCenter;
  let topX, topY, botX, botY;
  let x, y;
  let myneedle;

  //drops needles j times
  for (let j = 0; j < 5; j++) {
    //randomzied x and y centers
    xCenter = Math.floor(Math.random() * windowWidth);
    yCenter = Math.floor(Math.random() * windowHeight);

    //calculate the angle
    let angle = Math.floor(Math.random() * 360);
    angle = toRadians(angle);


    //creating angle/line
    y = (needleLength / 2) * (Math.sin(angle));
    x = (needleLength / 2) * (Math.cos(angle));

    //some math we figured out in person
    if (angle > (Math.PI / 2)) {
      topX = xCenter - x;
      topY = yCenter + y;
      botX = xCenter + x;
      botY = yCenter - y;
    }
    else { //other part of math we did
      topX = xCenter + x;
      topY = yCenter + y;
      botX = xCenter - x;
      botY = yCenter - y;

    }

    myneedle = new Needle(topX, topY, botX, botY);//creates the needle object
    needles[nextEmpty] = myneedle; //to remove needles from game, we need the line pixi graphic, not a needle class
    nextEmpty += 1;


    //this for loop section chooses the color of the line to be dropped
    for (let k = 0; k < lines.length; k++) {
      //checks to see if the needle dropped not crosses the grid lines and changes color red
      if ((topY < lines[k] && botY < lines[k]) || (topY > lines[k] && botY > lines[k])) {
        //line.lineStyle(4, 0xFF0000, 1);
        lineInArray.lineStyle(4, 0xFF0000, 1);
      }
      //checks to see if the needle does dropped crosses the grid line and changes color green
      else {
       // line.lineStyle(4, 0xAAFF00, 1);
        lineInArray.lineStyle(4, 0xAAFF00, 1);
        k = lines.length;//sets as lines length to stop for loop
      }
    }

    //copied previous line code, just rewrote the variable name
    lineInArray.moveTo(xCenter, yCenter);
    lineInArray.lineTo(topX, topY);
    //lineInArray.closePath(); -- commented out since we can just move lint to botX, botY 
    
    //app.stage.addChild(lineInArray); check this

    //lineInArray.moveTo(xCenter, yCenter); --this is not needed
    lineInArray.lineTo(botX, botY);
    lineInArray.closePath();

    app.stage.addChild(lineInArray);
    //pushing the new line into the array
    lineArray.push(lineInArray);
  }
}

//clears needles from page and removes them from the array
function clearNeedles() {
  console.log("Next Empty size: " + nextEmpty);

  //this code removes them from the stage
  lineArray.forEach(lineInArray => {
    app.stage.removeChild(lineInArray);
  });

  // lineInArray.destroy();
  //this is the only way to get rid of the lines, we need to find new way for code

  for(let k = 0; k < lineArray.length; k++){
    console.log(lineArray[k]);
  }
 
  //splice will remove all objects of the array
  lineArray.splice(0, lineArray.length);
  console.log("After Splice");

  for(let k = 0; k < lineArray.length; k++){
    console.log(lineArray[k]);
  }
}

class Needle {
  constructor(topX, topY, botX, botY) {
    this.topX = topX;
    this.topY = topY;
    this.botX = botX;
    this.botY = botY;
  }
}
