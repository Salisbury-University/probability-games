// $ http-server -c-1 -a localhost -p 8000 /directory/path/

// write documentation
// create an animate function that is set when the position of a chip needs to be moved
// calculate the new position in btn.onclick,
// set a flag so that the function runs in the ticker function with the calculated values
// continue

// create the button first so it's at the top
let btn = document.createElement("button");
btn.innerHTML = "Move Chips";

// some vars for moving the chips
let pressCount = 0;
let currChip = 9;
let increasing = 1;
let animating = false;
let newPosX = 0;
let newPosY = 0;

document.body.appendChild(btn);

function animate() {
  //while the chip is not in the newly calculated position
  // increment its potition in a posiiton between its old and new pos
  while (chips[currChip].x != newPosX || chips[currChip].y != newPosY) {

    //move the chip from old position to new position iteratively

  }
  // flip the flag when the animation is completed
}

btn.onclick = function() {

  if (increasing == 1) {
    // calculate new x and y values
    chips[currChip].x += 100;
    newPosX = chips[currChip] + 100;

    chips[currChip].y += 100 - (10 * (2 * pressCount));
    newPosY = chips[currChip] + 100 - (10 * (2 * pressCount));


    // increment/decrement counters
    pressCount++;
    currChip--;

    // let animation start
    // animating = true;

    // check if still in range
    if (pressCount == 10) {
      pressCount -= 1;
      currChip = 0;
      increasing = 0;
    }
  }

  else {
    // calculate new x and y values
    chips[currChip].x -= 100;
    newPosX = chips[currChip] + 100;

    chips[currChip].y += -100 + (10 * (2 * pressCount));
    newPosY = chips[currChip] - 100 + (10 * (2 * pressCount));

    // increment/decrement counters
    pressCount--;
    currChip++;

    // let animation start
    // animating = true;

    // check if still in range
    if (pressCount == -1) {
      pressCount += 1;
      currChip = 9;
      increasing = 1;
    }
  }

}

// Create the application helper and add its render target to the page
let app = new PIXI.Application({
  backgroundColor: 0xCD5C5C
});

// resize the windwo to fit the whole screen
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

// chip color vars
let chipColor = 0xe31616;
let chipBorderColor = 0xe7e7e7;
let numChips = 10;

// array to hold stack of chips
let chips = [];

// create a stack of chips
for (i = 0; i < numChips; i++) {

  chips[i] = new Graphics();

  chips[i].beginFill(chipColor);              // ellipse color
  chips[i].lineStyle(1, chipBorderColor, 1);  // ellipse border
  chips[i].drawEllipse(window.innerWidth / 2 - 12, window.innerHeight / 2 - i * 10, 24, 12);  // position + size of the ellipse (topleft x, topleft y, height, width)
  chips[i].endFill();                         // draws the ellipse

  app.stage.addChild(chips[i]);               // stage the ellipse
}

// styling for pixi text element
const style = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 48,
  fill: 'deepskyblue',
  stroke: '#FFFFFF',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: '#000000'
});

// create PIXI text element
const myText = new PIXI.Text('hello world!', style);

// staging one shape after another works like layers, later things are layerd on top of previous things
app.stage.addChild(myText);

// text can be changed even after it is changed
myText.text = 'text changed!';
myText.style.wordWrap = true;
myText.style.wordWrapWidth = 100;
myText.style.align = 'center';

// loop is an arbitrary name for the funciton called by the ticker method which is a continuous loop
app.ticker.add(delta => loop(delta));

// move the text back and forth accross the whole screen
let elapsed = 0.0;

// main loop
function loop(delta) {
  elapsed += delta;

  // animate(elapsed);
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  objHeight = 180;
  objWidth = 180;

  // //factors: ending x or y value, range of movement, size of object, and speed of movement
  myText.x = (winWidth - objWidth) / 2 + Math.cos(elapsed / 40.0) * (winWidth - objWidth) / 2;
  // myText.y = (winHeight - objHeight) / 2 + Math.cos(elapsed / 15.0) * (winHeight - objHeight) / 2;

}

//   // make sure the button says the right thing
//   if (!pause)
//     btn.innerHTML = "Pause";
//   else
//     btn.innerHTML = "Resume";
// }
