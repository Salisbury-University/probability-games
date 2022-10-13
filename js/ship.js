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

// create a function that moves the next chip in the pile to a card
// inputs: card number, card array, chips array
// outputs: none
// functions: takes the card number input, gets the x and y value of that card (top left) and uses those
// to calculate the center of the card, and moves the chip on the top of the stack to that position.
function moveChips(moveToCard, cardNo, cardArr, chipArr) {

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
  backgroundColor: 0x24273a
});

// create window height variable
windowWidth = window.innerWidth - 10;
windowHeight = window.innerHeight - 10;

// resize the windwo to fit the whole screen
app.renderer.resize(windowWidth, windowHeight);

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

//array to hold rectangle objects (cards) that go at the top of the page
let cards = [];

//constant card dimension values
const cardHeight = 200;
const cardWidth = 120;
const cornerRadius = 6;
const cardBorderColor = 0xb8c0e0;
const cardColor = 0x8aadf4;

// create the cards at the top of the application screen
for (i = 0; i < 11; i++) {
  let j = i;
  cards[i] = new Graphics;
  cards[i].beginFill(cardColor);
  cards[i].lineStyle(1, cardBorderColor, 1);
  cards[i].drawRoundedRect(((windowWidth / 11 * i)) + (windowWidth / 11 - cardWidth) / 2, 50, cardWidth, cardHeight, cornerRadius);
  cards[i].interactive = true;
  cards[i].buttonMode = true;
  cards[i].on('pointerdown', (event) => clickCard(j));
  cards[i].endFill();

  app.stage.addChild(cards[i]);
}



// array to hold stack of chips
let chips = [];

// chip color vars
const chipColor = 0xa6da95;
const chipBorderColor = 0xb8c0e0;
const numChips = 10;

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

// // create PIXI text element
// const myText = new PIXI.Text('hello world!', style);

// // staging one shape after another works like layers, later things are layerd on top of previous things
// app.stage.addChild(myText);

// // text can be changed even after it is changed
// myText.text = 'text changed!';
// myText.style.wordWrap = true;
// myText.style.wordWrapWidth = 100;
// myText.style.align = 'center';

// loop is an arbitrary name for the funciton called by the ticker method which is a continuous loop
app.ticker.add(delta => loop(delta));

// move the text back and forth accross the whole screen
let elapsed = 0.0;

// main loop
function loop(delta) {
  elapsed += delta;

  objHeight = 180;
  objWidth = 180;

  // // factors: ending x or y value, range of movement, size of object, and speed of movement
  // myText.x = (windowWidth - objWidth) / 2 + Math.cos(elapsed / 40.0) * (windowWidth - objWidth) / 2;
  // myText.y = (windowHeight - objHeight) / 2 + Math.cos(elapsed / 15.0) * (windowHeight - objHeight) / 2;

}

//   // make sure the button says the right thing
//   if (!pause)
//     btn.innerHTML = "Pause";
//   else
//     btn.innerHTML = "Resume";
// }

function clickCard(num){
  console.log("clicked " + num);
}
