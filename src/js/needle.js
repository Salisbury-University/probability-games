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

const lineInArray = new PIXI.Graphics(); //new temp one
const lineArray = [];//temp

let lineSpace = windowHeight / 7;
//console.log(lineSpace);
let yValue = lineSpace;

for (let i = 0; i < 7; i++) {
  line.beginFill(0x0096FF);
  line.drawRect(0, yValue, windowWidth, 2);
  line.endFill();
  app.stage.addChild(line);
  lines[i] = yValue;
  yValue = yValue + lineSpace;
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}


function needleXY() {

  let xCenter, yCenter;
  let topX, topY, botX, botY;
  let x, y;
  let myneedle;

  for (let j = 0; j < 100; j++) {
    xCenter = Math.floor(Math.random() * windowWidth);
    yCenter = Math.floor(Math.random() * windowHeight);

    //calculate the angle
    let angle = Math.floor(Math.random() * 360);
    angle = toRadians(angle);


    //creating angle/line
    y = (needleLength / 2) * (Math.sin(angle));
    x = (needleLength / 2) * (Math.cos(angle));
    if (angle > (Math.PI / 2)) {
      topX = xCenter - x;
      topY = yCenter + y;
      botX = xCenter + x;
      botY = yCenter - y;
    }
    else {
      topX = xCenter + x;
      topY = yCenter + y;
      botX = xCenter - x;
      botY = yCenter - y;

    }
    myneedle = new Needle(topX, topY, botX, botY);
    needles[nextEmpty] = myneedle;
    nextEmpty += 1;


    //this for loop section chooses the color of the line to be dropped
    for (let k = 0; k < lines.length; k++) {
      //checks to see if the needle dropped not crosses the grid lines and changes color red
      if ((topY < lines[k] && botY < lines[k]) || (topY > lines[k] && botY > lines[k])) {
        line.lineStyle(4, 0xFF0000, 1);
        lineInArray.lineStyle(4, 0xFF0000, 1);
      }
      //checks to see if the needle does dropped crosses the grid line and changes color green
      else {
        line.lineStyle(4, 0xAAFF00, 1);
        lineInArray.lineStyle(4, 0xAAFF00, 1);
        k = 8;
      }
    }
    //temp one
    lineInArray.moveTo(xCenter, yCenter);
    lineInArray.lineTo(topX, topY);
    lineInArray.closePath();
    //line.endFill();
    app.stage.addChild(lineInArray);
    //line.beginFill(0x454B1B);
    lineInArray.moveTo(xCenter, yCenter);
    lineInArray.lineTo(botX, botY);
    lineInArray.closePath();
    //line.endFill();
    app.stage.addChild(lineInArray);
    lineArray.push(lineInArray);

    /*
    //only create line once, so we moved out of inner for loop
    line.moveTo(xCenter, yCenter);
    line.lineTo(topX, topY);
    line.closePath();
    //line.endFill();
    app.stage.addChild(line);
    //line.beginFill(0x454B1B);
    line.moveTo(xCenter, yCenter);
    line.lineTo(botX, botY);
    line.closePath();
    //line.endFill();
    app.stage.addChild(line);
    */
  }
}

function clearNeedles() {
  console.log("Next Empty size: " + nextEmpty);

  lineArray.forEach(lineInArray =>{
    app.stage.removeChild(lineInArray);
  });
  /*
  for (let k = 0; k < nextEmpty; k++) {
    app.stage.removeChild(needles[k]);
    console.log("K stored data: " + needles[k]);
  }
  */
}

class Needle {
  constructor(topX, topY, botX, botY) {
    this.topX = topX;
    this.topY = topY;
    this.botX = botX;
    this.botY = botY;
  }
}
